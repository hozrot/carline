import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useRef, useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PreviewImage from "./PreviewImage";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../auth/UserContext";

export default function CameraScreen({ navigation }) {
  const { SelectedImage, setSelectedImage, setSelectedOrderImage } =
    useContext(UserContext);
  const [facing, setFacing] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);

  const cameraRef = useRef(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isLightOn, setLightOn] = useState(FlashMode.off);
  const flashFunction = () => {
    setIsTorchOn(!isTorchOn);
    setLightOn((flashMode) =>
      flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        // base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const savePhoto = async () => {
    if (photo) {
      try {
        setSelectedImage([...SelectedImage, photo]);
        await MediaLibrary.createAssetAsync(photo.uri);
        //alert("Saved Successfully!");
        setPhoto(null);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      // cameraType: CameraType.back,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
      // mediaTypes:ImagePicker.MediaTypeOptions.Images,
    });
    setSelectedOrderImage(result.assets);
    navigation.navigate("CreateOrder");
  };

  if (photo)
    return (
      <PreviewImage
        photo={photo}
        handleRetakePhoto={() => setPhoto(null)}
        savePhoto={savePhoto}
        imageList={() => [
          setSelectedImage([...SelectedImage, photo]),
          navigation.navigate("ImageList"),
        ]}
      />
    );

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={facing}
        ref={cameraRef}
        flashMode={isLightOn}
        ratio="16:9"
      >
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={flashFunction}>
            <MaterialCommunityIcons
              name={isTorchOn ? "flash-outline" : "flash-off"}
              size={24}
              color={"white"}
            />
          </TouchableOpacity>
          <Text style={styles.HeadText}>Identify the Vehical</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Image
              style={{
                width: 44,
                height: 44,
                borderRadius: 50,
                resizeMode: "contain",
              }}
              source={require("../assets/Fillter.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                resizeMode: "contain",
              }}
              source={require("../assets/Shutter.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Image
              style={{
                width: 44,
                height: 44,
                borderRadius: 50,
                resizeMode: "contain",
              }}
              source={require("../assets/Switch.png")}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  topContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  HeadText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    padding: 5,
    color: "#ffffff",
    paddingBottom: 10,
  },
});

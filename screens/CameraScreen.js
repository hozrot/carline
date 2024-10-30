import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useRef, useState, useContext, useEffect } from "react";
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
  const [permissionResponse, requestPermissionM] = MediaLibrary.usePermissions();

  const [photo, setPhoto] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const gridFunction = () => {
    setShowGrid(!showGrid);


  };
  const cameraRef = useRef(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isLightOn, setLightOn] = useState(FlashMode.off);
  const flashFunction = () => {
    setIsTorchOn(!isTorchOn);
    setLightOn((flashMode) =>
      flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };
  const [zoom, setZoom] = React.useState(0);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0));
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

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);


  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        aspect: [4, 3],
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
        setSelectedImage([photo, ...SelectedImage]);
        if (permissionResponse.status !== 'granted') {
          await requestPermissionM();
        }
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
        zoom={zoom}
        flashMode={isLightOn}
        ratio="4:3"
      >
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={flashFunction}>
            <MaterialCommunityIcons
              name={isTorchOn ? "flash-outline" : "flash-off"}
              size={24}
              color={"white"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={gridFunction}>
            <MaterialCommunityIcons
              name={showGrid ? "grid" : "grid-off"}
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
          <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
            <MaterialCommunityIcons
              name={"plus-circle"}
              size={30}
              color={"white"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
            <MaterialCommunityIcons
              name={"minus-circle"}
              size={30}
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
      {showGrid && (
          <View  pointerEvents="none"  style={styles.gridOverlay}>
            {/* Horizontal lines */}
            <View style={[styles.gridLine, { top: '10%' }]} />
            <View style={[styles.gridLine, { top: '20%' }]} />
            <View style={[styles.gridLine, { top: '30%' }]} />
            <View style={[styles.gridLine, { top: '40%' }]} />
            <View style={[styles.gridLine, { top: '50%' }]} />
            <View style={[styles.gridLine, { top: '60%' }]} />
            <View style={[styles.gridLine, { top: '70%' }]} />
            <View style={[styles.gridLine, { top: '80%' }]} />
            <View style={[styles.gridLine, { top: '90%' }]} />
            <View style={[styles.gridLine, { top: '100%' }]} />
            {/* Vertical lines */}
            <View style={[styles.gridLineVertical, { transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.gridLineVertical, { left: '20%' }]} />
            <View style={[styles.gridLineVertical, { left: '40%' }]} />
            <View style={[styles.gridLineVertical, { left: '60%' }]} />
            <View style={[styles.gridLineVertical, { left: '80%' }]} />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topContainer: {
    flex: 0.2,
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
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed
  },

  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',

  },
});

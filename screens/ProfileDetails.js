import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import * as ImagePicker from "expo-image-picker";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import UserContext from "../auth/UserContext";
import { useGlobalContext } from "../auth/GlobalContext";
import axios from "axios";
import BaseUrl from "../auth/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

export default function ProfileDetails({ navigation }) {
  const { userData, setUserData } = useContext(UserContext);
  const [image, setImage] = useState(userData?.image);
  const [nameUpdate, setNameUpdate] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [Loader, setLoader] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    if (!password || !email) {
      // alert('All filled is required')
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Warning",
        textBody: "All filled is required",
        button: "close",
      });
      return;
    }
    let data = JSON.stringify({
      email: email,
      password: password,
      
      
      
    });
    console.log("Token:",userData.token);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://app.carline.no/api/auths/delete_account/",
      headers: {
        Authorization: `Token ${data?.token}`, // Pass the token here
          "Content-Type": "application/json",
      },
      data: data,
    
    };

    axios
      .request(config)
      .then((result) => {
        // alert(result.data.message);
        // alert("Verification Successfull");
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Verification Successfull",
          button: "close",
        });
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        // alert("Fill Correct Field");
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Warning",
          textBody: "Something wrong with given data",
          button: "close",
        });
      });
  };

  const isButtonActive =
    nameUpdate.trim() !== "" ||
    company_name.trim() !== "" ||
    phone.trim() !== "" ||
    image != userData?.image ||
    (password.trim() !== "" && newpassword.trim() !== "");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
      //uploadImage(result.assets[0].uri);
    }
  };

  useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const UpdateProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${userData?.token}`);
    myHeaders.append(
      "Cookie",
      "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
    );
    const formdata = new FormData();
    const defaultImage = userData?.image;

    formdata.append("name", nameUpdate || userData?.name);
    formdata.append("company_name", company_name || userData?.company_name);
    formdata.append("phone", phone || userData?.phone);
    if (image.uri) {
      const selectedImage = {
        uri: image.uri,
        name: image?.fileName ?? image.uri.split("/").pop(),
        type: image.mimeType,
      };
      formdata.append("image", selectedImage || defaultImage);
    }
    setLoader(true);
    console.log("Form Data", formdata);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://app.carline.no/api/auths/update_info/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then((result) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Profile Updated Successfully",
          button: "close",
        });
        navigation.navigate("Home");

        getData(userData);
      })
      .catch((error) => console.error(error));
  };

  const getData = async (data) => {
    try {
      const response = await axios.get(`${BaseUrl}/auths/`, {
        headers: {
          Authorization: `Token ${data?.token}`, // Pass the token here
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        const userData = response.data;
        const mergedObj = { ...data, ...userData[0] };
        setUserData(mergedObj);
        AsyncStorage.setItem("AccessToken", JSON.stringify(data));
        //alert("Updated");
        setLoader(false);
      }
    } catch (err) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Warning",
        textBody: "Network Error",
        button: "close",
      });
      console.log("getData", err);
    }
  };

  return (
    <View style={styles.containerView}>
      <ScrollView style={styles.containerView}>
        <ImageBackground
          source={require("../assets/background.png")}
          resizeMode="stretch"
        >
          {Loader && (
            <ActivityIndicator
              size="large"
              color={"#fff"}
              style={styles.loader}
            />
          )}
          <AlertNotificationRoot></AlertNotificationRoot>
          <View style={styles.topBack}>
            <ImageBackground
              source={require("../assets/profileback.png")}
              resizeMode="stretch"
            >
              <View
                style={{
                  color: "white",
                  width: "100%",
                  height: 172,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingTop: 40,
                  paddingLeft: 20,
                  borderRadius: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Home")}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "transparent",
                  }}
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color={"#ffffff"}
                  />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontFamily: "DMSans_500Medium",
                      fontSize: 18,
                    }}
                  >
                    {" "}
                    Back
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#ffffff",
                    fontFamily: "DMSans_500Medium",
                    fontSize: 18,
                  }}
                >
                  {" "}
                </Text>
                <Text> </Text>
              </View>
             
            </ImageBackground>
          </View>
          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 50,
                  backgroundColor: "gray",
                }}
                source={{
                  uri:
                    image != null && image !== undefined
                      ? image?.uri
                        ? image.uri
                        : image
                      : "",
                }}
              />
              <View style={styles.profileAdd}>
                <MaterialCommunityIcons
                  name="pencil-minus-outline"
                  size={16}
                  color={"#000000"}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "DMSans_500Medium",
              }}
            >
              {" "}
              {userData?.name}
            </Text>
            <Text
              style={{
                color: "#C0CACB",
                fontSize: 16,
                fontFamily: "DMSans_400Regular",
              }}
            >
              {userData?.email}{" "}
              {/* {userData?.token}{" "} */}
            </Text>
          </View>
          <View style={styles.optionList}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.InputHead}> Name </Text>
              <TextInput
                inputHieght={54}
                inputAlign={"center"}
                placeholder={userData?.name}
                value={nameUpdate}
                onChangeText={setNameUpdate}
                autoCapitalize="none"
                keyboardType="alphabetic"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
              />
              {/* <Text style={styles.InputHead}>
                {" "}
                Email{" "}
              </Text>
              <TextInput
                inputHieght={54}
                inputAlign={'center'}
                // value={userData?.email}
                placeholder={userData?.email}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                editable={false}
              /> */}
 <Text style={styles.InputHead}> Mobile No </Text>
              <TextInput
                inputHieght={54}
                inputAlign={"center"}
                // value={userData?.company_name}
                placeholder={userData?.phone}
                value={phone}
                onChangeText={setPhone}
                autoCapitalize="none"
                keyboardType="phone-pad"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
              />
              <Text style={styles.InputHead}> Company </Text>
              <TextInput
                inputHieght={54}
                inputAlign={"center"}
                // value={userData?.company_name}
                placeholder={userData?.company_name}
                value={company_name}
                onChangeText={setCompanyName}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="alphabetic"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
              />
            </KeyboardAvoidingView>
          </View>
          <View style={styles.Bottom}>
            {isButtonActive && (
              <Button
                label="Save"
                // onPress={() => navigation.navigate("Home")}

                onPress={() => UpdateProfile()}
              />
            )}
            {!isButtonActive && (
              <Button
                label="Change Password"
                onPress={() => navigation.navigate("ChangePassword")}
              />
            )}
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Button
              label="Delete Your Account"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* setModalVisible(!modalVisible) */}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans_500Medium",
                    padding: 5,
                    paddingBottom:10,
                    color: "#ffffff",
                  }}
                >
                  {" "}
                  You will losse all your previous record !{" "}
                </Text>
                <TextInput
                  placeholder="Enter here..."
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  inputHieght={54}
                  paddingTop={12}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  inputHieght={54}
                  inputAlign={"center"}
                  onPress={toggleShowPassword}
                  icon={showPassword ? "eye-off" : "eye"}
                  placeholder="*******"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  keyboardType="password"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={{
                    borderWidth: 0.5,
                    borderColor: "gray",
                    margin: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 54,
                  }}
                  onPress={() => handleDelete()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "DMSans_400Regular",
                    }}
                  >
                    {" "}
                    Delete your Account{" "}
                  </Text>
                </TouchableOpacity>
                <Button
                  label="close"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#020202",
  },
  topBack: {
    flex: 0.1,
  },
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
  profileAdd: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 0,
    height: 25,
    width: 25,
    backgroundColor: "white",
    borderRadius: 25,
  },
  InputHead: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    paddingTop: 10,

    color: "#ffffff",
    paddingBottom: 5,
  },

  profileInfo: {
    flex: 0.2,
    alignContent: "center",
    alignItems: "center",
    margin: -60,
  },
  optionList: {
    flex: 0.6,
    padding: 10,
    marginTop: 60,
    justifyContent: "center",
  },

  CardText: {
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: 14,
  },
  Bottom: {
    flex: 0.2,
    width: "100%",
    padding: 15,
  },
  modalView: {
    flex: 0.4,
    width: "100%",
    backgroundColor: "#181C27",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopColor: "red",
    borderWidth: 1,
    borderTopColor: "#FF4A22",
    borderRightColor: "#FF4A22",
    borderLeftColor: "#FF4A22",
  },
  modalTop: {
    flex: 0.8,
    width: "100%",
    backgroundColor: "#181C27",
    padding: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopColor: "red",
  },
  modalBottom: {},

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

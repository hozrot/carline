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
  import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
  
  
  export default function ChangePassword({ navigation }) {
    const { userData, setUserData } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    // State variable to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [Loader, setLoader] = useState(false);
  
    const isButtonActive =
     
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
    // const UpdatePassword = () => {
    //   const myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Token ${userData?.token}`);
    //   myHeaders.append(
    //     "Cookie",
    //     "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
    //   );
    //   const formdata = new FormData();
     
  
    //   formdata.append("old_password", password );
    //   formdata.append("new_password", newpassword);
    //   setLoader(true);
    //   console.log("Form Data", formdata);
  
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: "follow",
    //   };
  
    //   fetch("https://app.carline.no/api/auths/change_password/", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .then((result) => {
    //       Dialog.show({
    //         type: ALERT_TYPE.SUCCESS,
    //         title: 'Success',
    //         textBody: 'Profile Updated Successfully',
    //         button: 'close',
    //       })
    //       //navigation.navigate("Home")
         
    //       getData(userData);
    //     })
    //     .catch((error) => console.error(error));
    // };
    const UpdatePassword = () => {
       
        let data = JSON.stringify({
          old_password: password,
          new_password: newpassword,
        });
    
        setLoader(true);
    
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${BaseUrl}/auths/change_password/`,
          headers: {
            "Content-Type": "application/json",
            Cookie:
              "csrftoken=CH8HzIULQdGpZESH58Pav5ulF8BT6q4s; sessionid=4v67h0saqwxa3571v4o0stfz8v1bl7o3",
            Authorization: `Token ${userData?.token}` 
          },
          data: data,
        };
    
        axios
          .request(config)
          .then((result) => {
            if (result.status == 200) {
              getData(result.data);
              // setUserData(result.data);
             
              navigation.navigate("Home")

              setLoader(false);
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Sorry',
                textBody: 'Password Updated',
                button: 'close',
              })
            }
          })
          .catch((error) => {
            //alert("Wrong Email And Password");
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Sorry',
              textBody: 'Your Old password is Wrong',
              button: 'close',
            })
            setLoader(false);
          });
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
          title: 'Warning',
          textBody: 'Network Error',
          button: 'close',
        })
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
                source={require("../assets/logo-blue.png")}
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
                {/* <Image
                style={{ width: "100%", height: 160 }}
                source={require("../assets/profileback.png")}
              /> */}
              </ImageBackground>
            </View>
            <View style={{
                    justifyContent:'center',
                    alignContent:'center',
                    alignItems:'center',
                    padding:10
                  }}>
            <Text  style={{
                color: "#ffffff",
                fontFamily: "DMSans_500Medium",
                fontSize: 24,
                    }}> Update you password </Text> 

            </View>
            
            <View style={styles.optionList}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                
                <Text style={styles.InputHead}> Old Password </Text>
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
                <Text style={styles.InputHead}> New Password </Text>
                <TextInput
                  inputHieght={54}
                  inputAlign={"center"}
                  onPress={toggleShowNewPassword}
                  icon={showNewPassword ? "eye-off" : "eye"}
                  placeholder="*******"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  keyboardType="password"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  secureTextEntry={!showNewPassword}
                  value={newpassword}
                  onChangeText={setNewPassword}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.Bottom}>
              {isButtonActive && (
                <Button
                  label="Update Password"
                  // onPress={() => navigation.navigate("Home")}
  
                  onPress={() => UpdatePassword()}
                />
              )}
               
            </View>
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
  });
  
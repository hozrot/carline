import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    ActivityIndicator,
    Modal
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import Button from "../component/Button";
  import TextInput from "../component/TextInput";
  import { user_login } from "../auth/UserApi";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import BaseUrl from "../auth/BaseUrl";
  import UserContext from "../auth/UserContext";
  
  export default function ResetPassword({ navigation }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const [Loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [verification_code, setVerification_code] = useState('');
    const [new_password, setNew_password] = useState('');
  
  
    // State variable to track password visibility
    const [showPassword, setShowPassword] = useState(false);
  
    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handelReset = () => {
      if (!email) {
        alert("Please Enter Email");
        return;
      }
      let data = JSON.stringify({
        email: email,
       
      });
  
      setLoader(true);
  
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/password-reset-request/`,
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "csrftoken=CH8HzIULQdGpZESH58Pav5ulF8BT6q4s; sessionid=4v67h0saqwxa3571v4o0stfz8v1bl7o3",
        },
        data: data,
      };
  
      axios
        .request(config)
        .then((result) => {
          if (result.status == 200) {
            getData(result.data);
            //alert(result.data.message);
            // setUserData(result.data);
            setLoader(false);
            setModalVisible(!modalVisible)
          }
        })
        .catch((error) => {
          alert("User With This Email doesn't Exist");
          setLoader(false);
        });
    };
    const handleVerification = () => {
        if (!verification_code && !new_password && !email) {
          alert('All filled is required')
          return
        }
        let data = JSON.stringify({
          "email": email,
          "code": verification_code,
          "new_password" : new_password,
    
        });
    
        let config2 = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BaseUrl}/password-reset-confirm-code/`,
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'csrftoken=CH8HzIULQdGpZESH58Pav5ulF8BT6q4s; sessionid=4v67h0saqwxa3571v4o0stfz8v1bl7o3'
          },
          data: data
        };
    
        // axios.request(config)
        //   .then((result) => {
        //    // alert(result.data.message);
        //    // alert("Verification Successfull");
        //     navigation.navigate("Login");
        //   })
        axios
        .request(config2)
        .then((result) => {
          if (result.status == 200) {
           // getData(result.data);
            navigation.navigate("Login");
          }
        })
          .catch((error) => {
            console.log(error)
            alert(result.data.message);
          });
    
      }
    
  
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
          navigation.navigate("Home", {
            screen: "Shoot",
            initial: true,
          });
        }
      } catch (err) {
       // alert(err.message); // Catch and display error if any
        console.log("getData", err);
      }
    };
  
    return (
      <ScrollView style={styles.containerView}>
        <ImageBackground
          source={require("../assets/background.png")}
          resizeMode="stretch"
        >
           {Loader && (
          <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
        )}
         
          <View style={styles.HeaderView}>
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                padding: 10,
                color: "#ffffff",
                fontSize: 30,
              }}
            >
              {" "}
              Hello!{" "}
            </Text>
            <Text style={{
                fontFamily: "DMSans_500Medium",
                padding: 10,
                color: "#ffffff",
                fontSize: 16,
              }}>Enter Your email to reset Password </Text>
          </View>
          <View style={styles.FormView}>
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                fontSize: 16,
                paddingBottom: 8,
                color: "#ffffff",
              }}
            >
              {" "}
              Email{" "}
            </Text>
            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder="Enter here...."
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={email}
              onChangeText={setEmail}
              style={{ fontSize: 14 }}
            />
           
          </View>
          <View style={styles.SubmitView}>
            <Button label="Send Reset Link" onPress={() => handelReset()} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                alignContent: "center",
                paddingTop: 20
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.RegularText}>
                  {" "}
                  Have an Account?{" "}
                  <Image
                    style={{ width: 60, height: 20, resizeMode: "contain" }}
                    source={require("../assets/signin.png")}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Bottom}>
           
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
              <Text  style={{
                  fontSize: 16,
                  fontFamily: "DMSans_500Medium",
                  padding: 5,
                  color: "#ffffff",
                 alignItems:'flex-start'
                }}>
            {" "}
            Email{" "}
          </Text>
          <TextInput
            inputHieght={54}
            inputAlign={'center'}
            placeholder="Enter here...."
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            value={email}
            onChangeText={setEmail}
          />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "DMSans_500Medium",
                  padding: 5,
                  color: "#ffffff",
                }}
              >
                {" "}
                Enter The verification code from email
              </Text>
              <TextInput
                placeholder="Enter here..."
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="next"
                inputHieght={54}
                paddingTop={12}
                value={verification_code}
                onChangeText={setVerification_code}

              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "DMSans_500Medium",
                  padding: 5,
                  color: "#ffffff",
                }}
              >
                {" "}
                Enter New Password
              </Text>
              <TextInput
            inputHieght={54}
            inputAlign={'center'}

            onPress={toggleShowPassword}
            icon={showPassword ? 'eye-off' : 'eye'}
            placeholder="*******"
            autoCapitalize="none"
            autoCompleteType="password"
            keyboardType="password"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            secureTextEntry={!showPassword}
            value={new_password}
            onChangeText={setNew_password}
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
                onPress={() => handleVerification()}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "DMSans_400Regular",
                  }}
                >
                  {" "}
                 Reset Password{" "}
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
    );
  }
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: "#020202",
    },
    HeaderView: {
      flex: 0.2,
      padding: 20,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 80,
    },
    loader: {
      position: "absolute",
      zIndex: 2,
      top: "50%",
      left: "50%",
    },
    FormView: {
      flex: 0.4,
      width: "100%",
      justifyContent: "center",
      padding: 10,
    },
    SubmitView: {
      alignContent: "center",
      alignItems: "center",
      padding: 20,
    },
    Bottom: {
      flex: 0.2,
      width: "100%",
      alignItems: "center",
    },
    AllText: {
      color: "#ffffff",
      fontFamily: "DMSans_500Medium",
      fontSize: 24,
    },
    InputBlock: {
      justifyContent: "flex-start",
    },
  
    RegularText: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: "DMSans_400Regular",
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      },
    modalView: {
        flex: 0.6,
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
  });
  
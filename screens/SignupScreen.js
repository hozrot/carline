import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
export default function SignupScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [password, setPassword] = useState('');
  const [verification_code, setVerification_code] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [Loader, setLoader] = useState(false);


  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  const handleSignUp = () => {
    if (!name && !validateEmail(email) && !password && !company_name) {
      // alert('All filled is required')
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Warning',
        textBody: 'All field is required',
        button: 'close',
      })
      return
    }
    let data = JSON.stringify({
      "email": email,
      "name": name,
      "company_name": company_name,
      "password": password
    });
    setLoader(true);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/auths/register/`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'csrftoken=CH8HzIULQdGpZESH58Pav5ulF8BT6q4s; sessionid=4v67h0saqwxa3571v4o0stfz8v1bl7o3'
      },
      data: data
    };

    axios.request(config)
      .then((result) => {
        //alert(result.data.message)
        // alert("Please Confirm the verification code")
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Please Confirm the verification code',
          button: 'close',
        })
        setLoader(false);

        //  navigation.navigate("Login")
      })
      .catch((error) => {
        console.log(error)
        //alert("Fill Correct Field");
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          textBody: 'Something wrong with given data',
          button: 'close',
        })
      });

    setModalVisible(!modalVisible)
  }

  const handleVerification = () => {
    if (!verification_code && !validateEmail(email)) {
      // alert('All filled is required')
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Warning',
        textBody: 'All filled is required',
        button: 'close',
      })
      return
    }
    let data = JSON.stringify({
      "email": email,
      "verification_code": verification_code,

    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/auths/verify_code/`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'csrftoken=CH8HzIULQdGpZESH58Pav5ulF8BT6q4s; sessionid=4v67h0saqwxa3571v4o0stfz8v1bl7o3'
      },
      data: data
    };

    axios.request(config)
      .then((result) => {
        // alert(result.data.message);
        // alert("Verification Successfull");
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Verification Successfull',
          button: 'close',
        })
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error)
        // alert("Fill Correct Field");
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          textBody: 'Something wrong with given data',
          button: 'close',
        })
      });

  }


  return (

    <ScrollView style={styles.containerView}>
      <AlertNotificationRoot></AlertNotificationRoot>
      <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' >

        {Loader && (
          <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
        )}

        <View style={styles.HeaderView}>
          {/* <TouchableOpacity style={{
            color: 'white',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBottom: 10
          }} onPress={() => navigation.navigate("Login")} >

            <MaterialCommunityIcons name="arrow-left" size={24} color={"#ffffff"} />
            <Text style={{
              color: "#ffffff",
              fontFamily: 'DMSans_500Medium', fontSize: 18
            }}>sign up </Text>
            <Text>       </Text>

          </TouchableOpacity> */}
          <View style={styles.welcomeBar}>

            <Text style={styles.AllText}>Sing Up </Text>
            <Text style={styles.AllText}>  Welcome Back! </Text>
          </View>
        </View>
        <View style={styles.FormView}>
          <Text style={styles.InputHead}>
            {" "}
            Name{" "}
          </Text>
          <TextInput
            inputHieght={54}
            inputAlign={'center'}
            placeholder="Enter here..."
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.InputHead}>
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
          <Text style={styles.InputHead}>
            {" "}
            Password{" "}
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
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.InputHead}>
            {" "}
            Company{" "}
          </Text>
          <TextInput

            placeholder="Enter here....."
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            inputHieght={54}
            inputAlign={'center'}
            value={company_name}
            onChangeText={setCompany_name}
          />
        </View>
        <View style={styles.SubmitView}>
          <Button label="sign up" onPress={() => handleSignUp()} />
        </View>
        <TouchableOpacity style={styles.BottomView} onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#ffffff", fontSize: 16, fontFamily: 'DMSans_400Regular' }}>
            {" "}
            Already have an account?{" "}
            <Image
              style={{ width: 60, height: 25, resizeMode: 'contain' }}

              source={require("../assets/signin.png")}
            />
          </Text>


        </TouchableOpacity>
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
                  Varify Code{" "}
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  welcomeBar: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,

  },
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
  InputHead: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    padding: 10,
    color: "#ffffff"
  },

  FormView: {

    width: "100%",
    justifyContent: "center",
    padding: 10,
    paddingTop: 40
  },
  TitleBar: {
    color: 'white',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10

  },
  SubmitView: {

    width: "100%",
    padding: 16
  },
  BottomView: {
    alignItems: 'center'

  },
  Bottom: {
    alignItems: "center",
  },
  AllText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: 'DMSans_500Medium',
  },
  InputBlock: {
    justifyContent: "flex-start",
  },
  CardText: {
    color: "#ffffff",
    fontFamily: 'DMSans_500Medium', fontSize: 18
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
});
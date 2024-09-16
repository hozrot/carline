import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
//npm install react-native-gradient-texts
//import GradientText from "react-native-gradient-texts";

export default function SignupScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [password, setPassword] = useState('');


  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (

    <ScrollView style={styles.containerView}>
      <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' >
        <View style={styles.HeaderView}>
          <TouchableOpacity style={{
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

          </TouchableOpacity>
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
        </View >
        <View style={styles.SubmitView}>
          <Button label="sign up" onPress={() => navigation.navigate("Login")} />
        </View>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <TouchableOpacity style={styles.BottomView} onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#ffffff", fontSize: 16, fontFamily: 'DMSans_400Regular' }}>
              {" "}
              Already have an account?{" "}

            </Text>
            <Image
              style={{ width: 60, height: 25, resizeMode: 'contain' }}

              source={require("../assets/signin.png")}
            />


          </TouchableOpacity>
        </View>

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
  welcomeBar: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,

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
    alignContent: 'center',
    alignItems: "center",
    flexDirection: 'row'
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
  SignupView: {
    alignContent: 'center',
    alignItems: "center",
    padding: 20,
    flexDirection: 'row'

  },
});
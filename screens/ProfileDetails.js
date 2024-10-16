import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts, DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import UserContext from '../auth/UserContext';




export default function ProfileDetails({ navigation }) {


  const { userData } = useContext(UserContext)
  const [image, setImage] = useState(userData?.image);
  const [nameUpdate, setNameUpdate] = useState("");
  const [company_name, setCompanyName] = useState("");


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //uploadImage(result.assets[0].uri);
    }
  };

  useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const [password, setPassword] = useState('');
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const UpdateProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${userData?.token}`);
    myHeaders.append(
      "Cookie",
      "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
    );
    const formdata = new FormData();
    formdata.append("name", nameUpdate);

    //formdata.append("image", uri: image, "[PROXY]");
    //formdata.append("image", image, "[PROXY]");
    formdata.append("company_name", company_name);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("https://app.carline.no/api/auths/update_info/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then((result) => {
        Alert.alert("Login Again To see the changes", result);
        navigation.navigate("Home")


      })
      .catch((error) => console.error(error));


  }
  // const uploadImage = async (imageUri) => {
  //   const requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow"
  //   };
  //   try {
  //     const response = await fetch('https://app.carline.no/api/auths/update_info/', requestOptions)

  //     const data = await response.json();

  //     // Handle the API response
  //     console.log('Image upload successful:', data);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  return (
    <View style={styles.containerView}>
      <ScrollView style={styles.containerView}>

        <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' >

          <View style={styles.topBack}>
            <ImageBackground source={require("../assets/profileback.png")} resizeMode='stretch' >

              <View style={{
                color: 'white',
                width: '100%',
                height: 172,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 40,
                paddingLeft: 20,
                borderRadius: 25
              }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                  <MaterialCommunityIcons name="arrow-left" size={24} color={"#ffffff"} />
                  <Text style={{
                    color: "#ffffff",
                    fontFamily: 'DMSans_500Medium', fontSize: 18
                  }}> Back</Text>
                </TouchableOpacity>
                <Text style={{
                  color: "#ffffff",
                  fontFamily: 'DMSans_500Medium', fontSize: 18
                }}> </Text>
                <Text>       </Text>

              </View>
              {/* <Image
              style={{ width: "100%", height: 160 }}
              source={require("../assets/profileback.png")}
            /> */}
            </ImageBackground>
          </View>
          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 50, backgroundColor: 'gray' }}
                source={{ uri: image }}
              />
              <View style={styles.profileAdd}>
                <MaterialCommunityIcons name="pencil-minus-outline" size={16} color={"#000000"} />
              </View>

            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'DMSans_500Medium' }}> {userData?.name}</Text>
            <Text style={{ color: '#C0CACB', fontSize: 16, fontFamily: 'DMSans_400Regular' }}>{userData?.company_name}  </Text>

          </View>
          <View style={styles.optionList}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

              <Text style={styles.InputHead}>
                {" "}
                Name{" "}
              </Text>
              <TextInput
                inputHieght={54}

                inputAlign={'center'}
                placeholder={userData?.name}
                value={nameUpdate}
                onChangeText={setNameUpdate}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"

              />
              <Text style={styles.InputHead}>
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
              />

              <Text style={styles.InputHead}>
                {" "}
                Company{" "}
              </Text>
              <TextInput
                inputHieght={54}
                inputAlign={'center'}
                // value={userData?.company_name}
                placeholder={userData?.company_name}
                value={company_name}
                onChangeText={setCompanyName}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
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
                editable={false}

              />


            </KeyboardAvoidingView>
          </View>
          <View style={styles.Bottom}>
            <Button label="Save"
              // onPress={() => navigation.navigate("Home")} 
              onPress={() => UpdateProfile()}

            />
          </View>

        </ImageBackground>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#020202'
  },
  topBack: {
    flex: .10,
  },
  profileAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 0,
    height: 25,
    width: 25,
    backgroundColor: 'white',
    borderRadius: 25



  },
  InputHead: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    paddingTop: 10,

    color: "#ffffff",
    paddingBottom: 5
  },

  profileInfo: {
    flex: .20,
    alignContent: 'center',
    alignItems: 'center',
    margin: -60
  },
  optionList: {
    flex: .60,
    padding: 10,
    marginTop: 60,
    justifyContent: 'center'
  },

  CardText: {
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: 14

  },
  Bottom: {
    flex: 0.2,
    width: "100%",
    padding: 15,

  },
})
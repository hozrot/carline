import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Linking, ImageBackground } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts, DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function ProfileScreen({ navigation }) {

  const image = require("../assets/logo-blue.png");
  const image2 = require("../assets/bottomtab.png");
  useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  return (

    <ScrollView style={styles.containerView}>
      <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' >

        <ImageBackground source={image} >

          <View style={styles.profilePic}>
            <TouchableOpacity>
              <Image
                style={{ width: 120, height: 120, borderRadius: 50 }}
                source={require("../assets/profile-img.png")}
              />
            </TouchableOpacity>


          </View>
        </ImageBackground>
        <View style={styles.profileInfo}>
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'DMSans_500Medium' }}> Md Rohim Miya  </Text>
          <Text style={{ color: '#C0CACB', fontSize: 16, fontFamily: 'DMSans_400Regular' }}> Company: Graphic IT BD  </Text>
        </View>
        <View style={styles.optionList}>
          <View style={styles.optionListOne}>
            <TouchableOpacity style={styles.optionsTop} onPress={() => navigation.navigate("Profiledetails")}>
              <Text style={styles.CardText}>Profile </Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={18}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsTop} onPress={() => navigation.navigate("AccountSetting")}>
              <Text style={styles.CardText}>Account Setting</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={18}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.optionListTwo}>
            <TouchableOpacity style={styles.options} onPress={() => navigation.navigate("Shareapp")}>
              <Text style={styles.CardText}>Share app</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={18}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.options} onPress={() => { Linking.openURL('https://carline.no/') }}>
              <Text style={styles.CardText}>Support</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={18}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.options} onPress={() => navigation.navigate("About")} >
              <Text style={styles.CardText}>About</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={18}
                color={"white"}

              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <ImageBackground source={image2}>
     
     <View style={styles.profileInfo}>
     <TouchableOpacity>
    <Text>test </Text>
         </TouchableOpacity>
    
      
     </View>
     </ImageBackground> */}
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#020202'
  },
  topBack: {
    flex: .10,
    backgroundColor: 'gray',
    height: 100,
    marginTops: -20,
    paddingTop: 30

  },
  profilePic: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: -40


  },

  profileInfo: {
    flex: .30,
    alignContent: 'center',
    alignItems: 'center',
    height: 90,
    paddingTop: 40,



  },
  optionList: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: .80,
  },
  optionListOne: {


  },
  optionsTop: {
    margin: 5,
    padding: 12,
    borderRadius: 10,
    color: 'white',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',



  },
  optionListTwo: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    margin: 5,
    padding: 5

  },
  options: {
    margin: 8,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',

    borderBottomColor: 'gray',
    borderBottomWidth: .50,
    width: '100%',
  },

  CardText: {
    color: "#ffffff",
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,

  },
  CardTextTwo: {
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: 14,



  },
})
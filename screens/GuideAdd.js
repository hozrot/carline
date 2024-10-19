import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
  ActivityIndicator,

} from "react-native";
import React, { useState, useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import axios from "axios";
import BaseUrl from "../auth/BaseUrl";
import UserContext from "../auth/UserContext";

export default function GuideAdd({ navigation, route }) {
  const { userData, InstructionName, setInstructionName, backgroundImageURL, floorImageURL,
    value1, value2, value3 } = useContext(UserContext);

  const [Loader, setLoader] = useState(false);
  const bgswitch = route.params;
  const bgimage = route.params;

  const logoimage = route.params;
  const floorimage = route.params;
  const name = route.params;

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [backgroundSwitch, setBackgroundSwitch] = useState(true);
  const togglebackgroundSwitch = () => setBackgroundSwitch((previousState) => !previousState);


  //const [background, setBackground] = useState(null);

  const [floorSwitch, setFloorSwitch] = useState('');
  const togglefloorSwitch = () => setFloorSwitch((previousState) => !previousState);
  //const [floor, setFloor] = useState(null);

  const [logoSwitch, setLogoSwitch] = useState('');
  const togglelogoSwitch = () => setLogoSwitch((previousState) => !previousState);
  //const [logo, setLogo] = useState(null);

  const [npSwitch, setNpSwitch] = useState('');
  const togglenpSwitch = () => setNpSwitch((previousState) => !previousState);

  const PostInstructions = () => {
    try {
      if (!InstructionName) {
        alert("Enter Instruction name");
        setLoader(false);
        return;
      }
      if (!userData?.email) {
        alert("Email Not Found");
        setLoader(false);
        return;
      }
      setLoader(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${userData?.token}`);
      myHeaders.append(
        "Cookie",
        "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
      );

      const formdata = new FormData();
      formdata.append("instruction_name", InstructionName);
      formdata.append("instruction_details", "testDetails");
      formdata.append("share_instruction", userData?.email);
      formdata.append("approval", userData?.email);
      // formdata.append("logo", logoSwitch ? "addlogo" : "Dontaddlogo");
      // formdata.append("logo_placement", logoSwitch ? logoimage.id : "Dontaddlogo");
      formdata.append("logo_placement", logoSwitch ? 12 : "Dontaddlogo");

      //formdata.append("floor", floorSwitch ? floorimage.id : "Dontaddfloor");
      formdata.append("floor", floorSwitch ? 23 : "Dontaddfloor");
      //formdata.append("background", backgroundSwitch ? bgimage.id : "Don't Add Background");
      formdata.append("background", backgroundSwitch ? 19 : "Don't Add Background");
      formdata.append("license_plate", npSwitch ? "addLicensePlate" : "DontaddLicensePlate");



      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      fetch(`${BaseUrl}/instructions/`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.text(); // Parse the response body
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        })
        .then((result) => {

          Alert.alert("Instruction Created Successfull");
          navigation.navigate("InstructionList");
          setLoader(false);
          setInstructionName([]);
          // togglebackgroundSwitch([]);
          // togglefloorSwitch([]);
          // togglelogoSwitch([]);
          // togglenpSwitch([]);



          console.log("Instruction Created Successfull", result);
        })
        .catch((error) => {
          Alert.alert("Instruction Error", error.message);
          console.log("Instruction Error", error.message);
          setLoader(false);
        });
    } catch (error) {
      Alert.alert("Failed Create Instruction", error?.message);
      setLoader(false);
    }
  };

  return (
    <View style={styles.containerView}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="stretch"
        style={styles.containerView}
      >
        <ScrollView>
          {Loader && (
            <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
          )}
          <View style={{
            color: 'white',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 40,
            paddingLeft: 10
          }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home", {
              screen: "Guide",
              initial: true,
            })} style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={"#ffffff"} />
              <Text style={{
                color: "#ffffff",
                fontFamily: 'DMSans_500Medium', fontSize: 18
              }}> </Text>
            </TouchableOpacity>
            <Text style={{
              color: "#ffffff",
              fontFamily: 'DMSans_500Medium', fontSize: 18
            }}> Instruction Create</Text>
            <Text>       </Text>

          </View>
          <View style={styles.optionList}>
            <Text style={styles.InputHead}> Instruction name </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              value={InstructionName}
              placeholder="Enter a name.."
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="done"
              onChangeText={setInstructionName}
            />
          </View>
          <View style={styles.InstructionView}>
            <View style={styles.OptionView}>
              <Text
                style={{ fontWeight: "bold", padding: 10, color: "#ffffff" }}
              >
                {" "}
                Background{" "}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={backgroundSwitch ? "#FF4A22" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglebackgroundSwitch}
                value={backgroundSwitch}
              />
            </View>
            {backgroundSwitch && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={() =>
                    navigation.navigate("BackgroundType")
                  }
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color={"#ffffff"}
                  />

                </TouchableOpacity>
                <Text style={{ color: "#ffffff" }} >

                </Text>

                {bgimage && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BackgroundList")}
                  >
                    <Image
                      source={{ uri: bgimage?.bgimage }}
                      style={styles.logo1}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View style={styles.InstructionView}>
            <View style={styles.OptionView}>
              <Text
                style={{ fontWeight: "bold", padding: 10, color: "#ffffff" }}
              >
                {" "}
                Floor{" "}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={floorSwitch ? "#FF4A22" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglefloorSwitch}
                value={floorSwitch}
              />
            </View>
            {floorSwitch && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={() => navigation.navigate("FloorType")}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color={"#ffffff"}
                  />
                </TouchableOpacity>
                <Text style={{ color: "#ffffff" }} >
                  {/* {floorimage.id} */}
                </Text>
                {floorimage && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FloorList")}
                  >
                    <Image
                      source={{ uri: floorimage?.floorimage }}
                      style={styles.logo1}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View style={styles.InstructionView}>
            <View
              style={styles.OptionView}
              onPress={() => navigation.navigate("#")}
            >
              <Text
                style={{ fontWeight: "bold", padding: 10, color: "#ffffff" }}
              >
                {" "}
                Logo{" "}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={logoSwitch ? "#FF4A22" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglelogoSwitch}
                value={logoSwitch}
              />
            </View>
            {logoSwitch && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={() => navigation.navigate("LogoList")}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color={"#ffffff"}
                  />
                </TouchableOpacity>
                <Text style={{ color: "#ffffff" }} >
                  {/* {logoimage.id} */}
                </Text>
                {logoimage && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LogoList")}
                  >
                    <Image
                      source={{ uri: logoimage?.logoimage }}
                      style={styles.logo1}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View style={styles.InstructionView}>
            <View
              style={styles.OptionView}
              onPress={() => navigation.navigate("#")}
            >
              <Text
                style={{ fontWeight: "bold", padding: 10, color: "#ffffff" }}
              >
                {" "}
                Number Plate{" "}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={npSwitch ? "#FF4A22" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglenpSwitch}
                value={npSwitch}
              />
            </View>
            {/* {npSwitch && 
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.addImage} onPress={() => navigation.navigate("NpList")} >
                <MaterialCommunityIcons name="plus" size={30} color={"#ffffff"} />

              </TouchableOpacity>
              


            </View>} */}
          </View>

          <View style={styles.Bottom}>
            {(backgroundSwitch || npSwitch || logoSwitch || floorSwitch) && (
              <Button
                label="Create Instruction"
                onPress={() => PostInstructions()}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  Head: {
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },

  containerView: {
    flex: 1,
    backgroundColor: "#020202",
    paddingBottom: 10,
  },
  InstructionView: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingBottom: 10,
    margin: 15,

    shadowOpacity: 0.2,
  },
  OptionView: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingTop: 10,
  },
  InputHead: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    paddingTop: 10,
    color: "#ffffff",
    paddingBottom: 5,
    padding: 10,
  },

  optionList: {
    flex: 0.1,
    padding: 20,
  },
  addImage: {
    backgroundColor: "gray",
    height: 50,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: "row",
  },
  logo1: {
    height: 60,
    width: 90,
    marginLeft: 10,
    borderRadius: 10,
  },
  CardText: {
    color: "#ffffff",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  Bottom: {
    flex: 0.2,
    width: "100%",
    padding: 20,
  },
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
});

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
  Modal,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import axios from "axios";
import BaseUrl from "../auth/BaseUrl";
import UserContext from "../auth/UserContext";

export default function GuideAdd({ navigation, route }) {
  const {
    value1,
    value2,
    value3,
    userData,
    InstructionName,
    setInstructionName,
    contextValue: {
      backgroundImageId,
      backgroundImageURL,
      floorImageId,
      floorImageURL,
      logoImageId,
      logoImageURL,

      updateBackgroundImage,
      updateFloorImage,
      updateLogoImage,
    },
  } = useContext(UserContext);

  const [Loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [backgroundSwitch, setBackgroundSwitch] = useState(false);
  const togglebackgroundSwitch = () =>
    setBackgroundSwitch((previousState) => !previousState);

  //const [background, setBackground] = useState(null);

  const [floorSwitch, setFloorSwitch] = useState("");
  const togglefloorSwitch = () =>
    setFloorSwitch((previousState) => !previousState);
  //const [floor, setFloor] = useState(null);

  const [logoSwitch, setLogoSwitch] = useState("");
  const togglelogoSwitch = () =>
    setLogoSwitch((previousState) => !previousState);
  //const [logo, setLogo] = useState(null);

  const [npSwitch, setNpSwitch] = useState("");
  const togglenpSwitch = () => setNpSwitch((previousState) => !previousState);

  const PostInstructions = () => {
    try {
      if (!InstructionName) {
        setModalVisible(!modalVisible);
        setLoader(false);
        return;
      }
      if (!backgroundImageId) {
        // alert("Background Not Found");
        setModalVisible(!modalVisible);
        setLoader(false);
        return;
      }
      if (!floorImageId) {
        setModalVisible(!modalVisible);
        // alert("Select a Floor ");
        setLoader(false);
        return;
      }
      if (!logoImageId) {
        //alert("Select a Logo ");
        setModalVisible(!modalVisible);
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
      // myHeaders.append(
      //   "Cookie",
      //   "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
      // );

      const formdata = new FormData();
      formdata.append("instruction_name", InstructionName);
      formdata.append("instruction_details", "testDetails");
      formdata.append("share_instruction", userData?.email);
      formdata.append("approval", userData?.email);

      // formdata.append("logo", logoSwitch ? "addlogo" : "Dontaddlogo");

      formdata.append(
        "logo_placement",
        logoSwitch ? logoImageId : "Dontaddlogo"
      );
      formdata.append("floor", floorSwitch ? floorImageId : "Dontaddfloor");
      formdata.append(
        "background",
        backgroundSwitch ? backgroundImageId : "Don't Add Background"
      );
      formdata.append(
        "license_plate",
        npSwitch ? "addLicensePlate" : "DontaddLicensePlate"
      );

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
          setLoader(false);
         // navigation.navigate("InstructionList");
          navigation.navigate("Home", {
            screen: "Guide",
            initial: true,
          });
          // Alert.alert("Instruction Created Successfull");
          // Alert.alert(
          //   "Required Fieldsss",
          //   "Please fill in all the required fields......",
          //   [
          //     {
          //       text: "OK",
          //       onPress: () => {
          //         // Handle OK button press here
          //       },
          //     },
          //   ],
          //   {
          //     cancelable: false, // Prevent the alert from being dismissed by tapping outside
          //     style: styles.customAlert, // Apply custom styles
          //   }
          // );
          //setModalVisible(!modalVisible);
          //navigation.navigate("InstructionList");

          setInstructionName([]);
          clearSelectedStates();
          togglebackgroundSwitch([]);
          togglefloorSwitch([]);
          togglelogoSwitch([]);
          togglenpSwitch([]);

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

  /**
   * The following is a cleanup function which will be used
   * to reset the selection of images once the user is done
   * with adding the instructions, it will help user to
   * do a fresh start when trying to create instruction
   */
  const clearSelectedStates = () => {
    updateBackgroundImage("", "");
    updateFloorImage("", "");
    updateLogoImage("", "");

    setBackgroundSwitch(false);
    setFloorSwitch(false);
    setLogoSwitch(false);
    setNpSwitch(false);
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
            <ActivityIndicator
              size="large"
              color={"#fff"}
              style={styles.loader}
            />
          )}
          <View
            style={{
              color: "white",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: 40,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                clearSelectedStates();
                navigation.navigate("Home", {
                  screen: "Guide",
                  initial: true,
                });
              }}
              style={{ flexDirection: "row" }}
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
              Instruction Create
            </Text>
            <Text> </Text>
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
                  onPress={() => navigation.navigate("BackgroundType")}
                >
                  {backgroundImageURL && (
                    <MaterialCommunityIcons
                      name="reload"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                  {!backgroundImageURL && (
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                </TouchableOpacity>

                {backgroundImageURL && backgroundImageURL.length && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BackgroundType")}
                  >
                    <Image
                      source={{ uri: backgroundImageURL }}
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
                  {floorImageURL && (
                    <MaterialCommunityIcons
                      name="reload"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                  {!floorImageURL && (
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                </TouchableOpacity>
                <Text style={{ color: "#ffffff" }}>
                  {/* {floorimage.id} */}
                </Text>
                {floorImageURL && floorImageURL.length && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FloorType")}
                  >
                    <Image
                      source={{ uri: floorImageURL }}
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
                  {logoImageURL && (
                    <MaterialCommunityIcons
                      name="reload"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                  {!logoImageURL && (
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={"#ffffff"}
                    />
                  )}
                </TouchableOpacity>
                <Text style={{ color: "#ffffff" }}>{/* {logoimage.id} */}</Text>
                {logoImageURL && logoImageURL.length && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LogoList")}
                  >
                    <Image
                      source={{ uri: logoImageURL }}
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
            {backgroundSwitch && logoSwitch && floorSwitch && (
              <Button
                label="Create Instruction"
                onPress={() => PostInstructions()}
              />
            )}
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
                <View style={styles.modalTop}>
                  <View
                    style={{
                      width: "25%",
                      height: 1,
                      paddingTop: 5,
                      marginBottom: 20,
                      borderRadius: 10,
                      backgroundColor: "#FF4A22",
                    }}
                  ></View>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "DMSans_400Regular",
                    }}
                  >
                    {" "}
                    Enter All the Required Fields{" "}
                  </Text>
                </View>
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
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "DMSans_400Regular",
                    }}
                  >
                    {" "}
                    Back{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  customAlert: {
    backgroundColor: 'blue', // Customize background color
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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

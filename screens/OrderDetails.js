import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from "../auth/UserContext";

//npx expo install @react-native-picker/picker
import PickerSelect from "react-native-picker-select";
import BaseUrl from "../auth/BaseUrl";
import ModalAlert from "../component/ModalAlert";




export default function OrderDetails({ navigation }) {
  const {
    userData,
    Instruction,
    setInstruction,
    Order, setOrder,
    SelectedOrderImage,
    setSelectedOrderImage,
  } = useContext(UserContext);
  const [selectedTime, setselectedTime] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [regCarId, setRegCarId] = useState("");
  const [message, setMessage] = useState("");
  const [Loader, setLoader] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const items = [
    { label: "12 Hours", value: "12hours" },
    { label: "24 Hours", value: "24hours" },
    { label: "Express Delivery", value: "express_delivary" },

    // ... more options
  ];


  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedTime = currentTime.toISOString();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const now = new Date();
  //     const futureTime = new Date(now);
  //     futureTime.setHours(now.getHours());
  //     setCurrentTime(futureTime);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);


  const pickerSelectStyle = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 15,
      color: "white",
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 15,
      color: "white",
    },
  });

  const sendOrderData = async () => {
    setIsButtonDisabled(true);
    if (!regCarId || !message || !Instruction || !selectedValue) {
      //alert("Fill The required Field");
      setShowAlert(true);
      setModalVisible(false);
      return;
    }

    if (SelectedOrderImage?.length <= 0) {
      alert("Please Select The Image");
      setModalVisible(false);
      return;
    }

    setLoader(true);
    // Define the data object with only the required fields
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${userData?.token}`);
    myHeaders.append(
      "Cookie",
      "csrftoken=ASTAfJ6pYzH8nZpIHUf5SIJWuXrLAPe8; sessionid=lnupp2l3rm3a6se4vwr6uj5xlnp291b7"
    );

    const formdata = new FormData();
    formdata.append("job_name", regCarId);
    formdata.append("instruction_id", Instruction.id);
    formdata.append("massage", message);
    formdata.append("delivery_date", selectedValue);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/orders/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text(); // Parse the response body
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log("orderssss", result);
        setModalVisible(false);

        setRegCarId("");
        setMessage("");
        setInstruction("");


        if (SelectedOrderImage?.length > 0) {
          const convert = JSON.parse(result);
          uploadImages(convert.id);
        } else {
          navigation.navigate("UploadingScreen");
          setLoader(false);
        }
      })
      .catch((error) => Alert.alert("Create Order Failed", error.message));
  };

  const uploadImages = async (Oid) => {
    try {
      for (const image of SelectedOrderImage) {
        const formData = new FormData();
        formData.append("file", {
          uri: image.uri,
          name: image.uri.split("/").pop(),
          type: "image/jpeg",
        });

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Token ${userData?.token}`,
          },
          body: formData,
        };

        fetch(`${BaseUrl}/order-upload/${Oid}/upload/`, requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.text(); // Parse the response body
            } else {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            }
          })
          .then((result) => {
            setLoader(false);
            navigation.navigate("UploadingScreen");
            setSelectedOrderImage([]);
          })
          .catch((error) => {
            Alert.alert("Image Upload Failed", error.message);
            console.log("Image Upload Failed", error);
            setLoader(false);
          });
      }
    } catch (error) {
      Alert.alert("Failed Image Upload", error.message);
    }
  };

  return (
    <ScrollView style={styles.containerView}>
      {Loader && (
        <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
      )}

      <ModalAlert modalAlertText={"tetstt"} />
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="stretch"
      >
        <View style={styles.HeaderView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              color: "white",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: 30,
              paddingBottom: 20,
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
              Order Details{" "}
            </Text>
            <Text> </Text>
          </TouchableOpacity>
          {/* <Text style={styles.AllText}> Details Page will contain All the Infor Related to that Order  </Text> */}
          <Text
            style={{
              padding: 5,
              color: "#b6b6b6",
              fontSize: 14,
              fontFamily: "DMSans_400Regular",
            }}
          >
            {" "}
            Check Your Order Detalis here{" "}
          </Text>
        </View>
        <View style={styles.FormView}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "DMSans_500Medium",
              padding: 5,
              color: "#ffffff",
            }}
          >
            {" "}
            Enter Registration or Car ID *
          </Text>
          <TextInput
            placeholder={Order.id}
            value={regCarId}
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            inputHieght={54}
            paddingTop={12}
            onChangeText={setRegCarId}
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
            Enter Message *
          </Text>

          <TextInput
            placeholder={Order.massage}
            value={message}
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            inputHieght={78}
            linenumber={2}
            onChangeText={setMessage}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: "DMSans_500Medium",
              padding: 10,
              color: "#ffffff",
            }}
          >
            {" "}
            Instructions *
          </Text>
          <TouchableOpacity
            style={styles.InstructionView}
          //onPress={() => navigation.navigate("GuideScreen")}
          >
            <ImageBackground
              source={require("../assets/cardback.png")}
              style={styles.imageBack}
              resizeMode="stretch"
              borderRadius={15}
            >

              <>
                <Text style={styles.InstructionText}>
                  instruction id : {Order.instruction_id}{" "}
                </Text>
                {/* <Text style={styles.InstructionText}>BG : {Instruction.background ? "Yes" : "No"} </Text>
                  <Text style={styles.InstructionText}>
                    Floor :  {Instruction.floor ? "Yes" : "No"}
                  </Text>

                  <Text style={styles.InstructionText}>Logo : {Instruction.logo_placement ? "Yes" : "No"} </Text>
                  <Text style={styles.InstructionText}>
                    Licence Plate :  {Instruction.license_plate === "addLicensePlate" ? "Yes" : "No"}
                  </Text> */}
              </>

            </ImageBackground>
          </TouchableOpacity>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontFamily: "DMSans_500Medium",
              paddingTop: 20,
            }}
          >
            {" "}
            Delivery Time{" "}
          </Text>
          <Text
            style={{
              padding: 5,
              color: "#b6b6b6",
              fontSize: 14,
              fontFamily: "DMSans_500Medium",
            }}
          >
            {" "}
            Mon-Sat 08:00-17:00 GMT{" "}
          </Text>
          <ImageBackground
            source={require("../assets/pickerback.png")}
            style={styles.pickerBack}
            resizeMode="stretch"
            borderRadius={15}
          >

            <Text style={{
              color: "#ffffff",
              fontSize: 16,
              fontFamily: "DMSans_500Medium",
              padding: 10

            }} > {Order.delivery_date}</Text>
            {/* <PickerSelect
              style={{
                ...pickerSelectStyle,
                inputIOS: pickerSelectStyle.inputIOS,
                inputAndroid: pickerSelectStyle.inputAndroid,
              }}
              placeholder={{ label: Order.delivery_date }}
              items={items}
            //onValueChange={(value) => setSelectedValue(value)}
            //value={Order.delivery_date}
            /> */}
          </ImageBackground>
        </View>

        <View style={styles.SubmitView}>
          {/* <Button
              label="Next"
              onPress={() => setModalVisible(!modalVisible)}
            // onPress={handlePresentModalPress}
            // onPress={() => sendOrderData(true)}
            /> */}
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
                <Button label="Send Order" disabled={isButtonDisabled} onPress={() => sendOrderData()} />

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
                  onPress={() => {
                    Linking.openURL("https://carline.no");
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "DMSans_400Regular",
                    }}
                  >
                    {" "}
                    Access Carline.no{" "}
                  </Text>
                </TouchableOpacity>
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
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#020202",
  },
  imageBack: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,

    borderRadius: 15,
  },

  pickerBack: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
  },
  HeaderView: {
    flex: 0.2,
    width: "100%",
    padding: 10,
  },
  InstructionView: {},
  InstructionText: {
    color: "#B6B6B6",
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
  },
  FormView: {
    flex: 0.7,
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  SubmitView: {
    flex: 0.1,
    width: "100%",
    padding: 15,
  },

  AllText: {
    color: "#ffffff",
    fontSize: 24,
    fontFamily: "DMSans_500Medium",
  },
  InputBlock: {
    justifyContent: "flex-start",
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
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
});

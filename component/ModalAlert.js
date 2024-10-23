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
import Button from "../component/Button";

export default function ModalAlert({modalAlertText}) {
  const [showAlert, setshowAlert] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setshowAlert(!showAlert);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* setshowAlert(!showAlert) */}
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
               {modalAlertText}
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
              onPress={() => setshowAlert(!showAlert)}
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
    </View>
  );
}

const styles = StyleSheet.create({
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

    
     
});

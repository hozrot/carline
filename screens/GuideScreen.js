import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import GuideCard from "../component/GuideCard";
import UserContext from "../auth/UserContext";
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
import moment from 'moment';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function GuideScreen({ navigation }) {
  const [instructions, setInstructions] = useState([]);
  const { userData, setInstruction } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [Loader, setLoader] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${BaseUrl}/instructions/`, {
          headers: {
            Authorization: `Token ${userData?.token}`, // Pass the token here
            "Content-Type": "application/json",
          },
        });
        setInstructions(response.data);
        setIsLoading(false);
        setLoader(false);
      } catch (err) {
        alert(err.message); // Catch and display error if any
        console.log(err); // Catch and display error if any
      }
    };

    fetchOrders();
    setLoader(true);

  }, []);


  return (
    <View style={styles.containerView}>
     
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.containerView}
      >
        {Loader && (
          <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
        )}

        <View style={styles.topBar}>
          <View>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "condensedBold",
              }}
            >
              {" "}
              Instruction{" "}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              borderColor: "#ffffff",
              borderWidth: 1,
              borderRadius: 35,
              height: 35,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("GuideAdd")}
          >
            <Text style={{ color: "#ffffff" }}> Create Instruction </Text>
          </TouchableOpacity> */}
        </View>
       { instructions.length > 0 ? (
        <FlatList
          style={styles.bodyContent}
          data={instructions.sort((a, b) => b.created_at.localeCompare(a.created_at))}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setInstruction(item), navigation.navigate("CreateOrder");
              }}
            >
              <GuideCard

                BgId={item.background}
                guideId={item.instruction_name}
                BGCheck={item.background}
                NPCheck={item.license_plate}
                FloorCheck={item.floor}
                LogoCheck={item.logo}
                createdOn={moment(item.created_at).fromNow()}
              //dayCount={moment(item.created_on).fromNow()}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View  style={styles.flatList}>
     <Text style={{
      color: "#ffffff",
      fontSize: 16,
      alignItems:'center'
    }}> Please Create Instruction To Start your First Order </Text>
     </View>
      )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#020202",
  },

  topBar: {
    flex: 0.07,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  bodyContent: {
    flex: 0.8,
  },
  GuideCard: {
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    padding: 2,
    borderRadius: 25,
  },
  imageBack: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 25,
  },

  OrderCardImage: {
    flex: 0.4,
  },
  OrderCardDetails: {
    flex: 0.6,
    paddingRight: 10,

    paddingTop: 8,
  },
  flatList:{
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'

  },
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
  OrderCardDetailsTwo: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
  },
  OrderCardDetailsThree: {
    justifyContent: "center",
    alignContent: "center",
    width: "60%",

    alignItems: "center",
  },
  OrderCardDetailsFour: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 10,
  },

  CardHead: {
    color: "#ffffff",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 18,
  },
  CardText: {
    color: "#ffffff",

    fontWeight: "bold",
    fontSize: 12,
  },
});

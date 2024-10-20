import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,

} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import OrderCard from "../component/OrderCard";
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
import UserContext from "../auth/UserContext";
import moment from 'moment';
//sudo npm install moment --save

const orderDetails = [
  {
    id: 1,
    image: require("../assets/background1.png"),
    orderId: 1009001,
    imageCount: 5,
    dayCount: 3,
    orderStatus: "Pending",
  },
  {
    id: 2,
    image: require("../assets/background2.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "Approved",
  },
  {
    id: 3,
    image: require("../assets/background3.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "Cancel",
  },
  {
    id: 4,
    image: require("../assets/floor1.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "In Progress",
  },
  {
    id: 5,
    image: require("../assets/background2.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "Approved",
  },
  {
    id: 6,
    image: require("../assets/background3.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "Archive",
  },
  {
    id: 7,
    image: require("../assets/background3.png"),
    orderId: 1009002,
    imageCount: 3,
    dayCount: 4,
    orderStatus: "Others",
  },
  // ... more items with image, orderId, imageCount, dayCount, orderStatus, onPress
];

export default function OrderScreen({ navigation }) {
  const [OrderList, setOrderList] = useState([]);

  const [OrderImage, setOrderImage] = useState();
  const [OrderImagebyId, setOrderImagebyId] = useState([]);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // const inProgressText = "in_progress";
  //const capitalizedText = inProgressText.charAt(0).toUpperCase() + inProgressText.slice(1).replace("_", " ");
  const imageCounts = {};
  const [arrayCount, setArrayCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/orders/`, {
          headers: {
            Authorization: `token ${userData?.token}`, // Pass the token here
            "Content-Type": "application/json",
          },
        });
        setOrderList(response.data);
        setIsLoading(false);

        const imageResponse = await axios.get(`${BaseUrl}/order-upload/`, {
          headers: {
            Authorization: `token ${userData?.token}`, // Pass the token here
            "Content-Type": "application/json",
          },
        });
        setOrderImage(imageResponse?.data);
        setIsLoading(false);
        console.log(imageResponse?.data);

        const filteredImages = imageResponse?.data?.filter((image) => image.id === OrderList.id);
        const imageCount = filteredImages?.length || 0;
        console.log(imageCount);



      } catch (err) {
        alert(err.message); // Catch and display error if any
      }
    };




    // Adding event listener for focus
    const unsubscribe = navigation.addListener('focus', fetchOrders);

    // Cleanup function to remove the listener
    return unsubscribe;
  }, [navigation, userData]); // Add userData as a dependency if it can change


  return (
    <View style={styles.containerView}>
      {/* {isLoading ? (
        <ActivityIndicator size="large" />
      ) : ( */}
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.containerView}
      >
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
              Orders{" "}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderColor: "#ffffff",
              borderWidth: 1,
              borderRadius: 35,
              height: 35,
              width: 120,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Shoot")}
          >
            <Text style={{ color: "#ffffff" }}> Create Order </Text>
          </TouchableOpacity>
        </View>

        {OrderList && OrderImage && (
          <FlatList
            style={styles.bodyContent}
            //data={OrderList}
            data={OrderList.sort((a, b) => b.created_on.localeCompare(a.created_on))}
            //  data={orderDetails}
            renderItem={({ item }) => (
              <OrderCard
                image={OrderImage}
                orderId={item.id}
                orderStatus={item.status}
                //.charAt(0).toUpperCase() + inProgressText.slice(1).replace("_", " ")
                imageCount={OrderImage.length}
                dayCount={moment(item.created_on).fromNow()}
              />
            )}
            keyExtractor={(item) => item.id}
          />
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
    paddingBottom: 10,
  },

  topBar: {
    flex: 0.07,
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
    paddingTop: 35,
  },
  bodyContent: {
    flex: 0.8,
  },
  OrderCard: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    padding: 2,
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
    paddingTop: 20,
  },
  IDText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    paddingLeft: 4,
  },
  ImageCount: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    paddingLeft: 4,
  },
  DayCount: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
  },

  CardHead: {
    color: "#ffffff",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 18,
  },
  CardText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  CardText2: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
  },
});

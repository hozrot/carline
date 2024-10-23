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


export default function OrderScreen({ navigation }) {
  const [OrderList, setOrderList] = useState([]);

  const [OrderImage, setOrderImage] = useState();
  const [OrderImagebyId, setOrderImagebyId] = useState([]);
  const { userData, setOrder } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [Loader, setLoader] = useState(false);

   const inProgressText = "in_progress";
  const capitalizedText = inProgressText.charAt(0).toUpperCase() + inProgressText.slice(1).replace("_", " ");
  const imageCounts = {};
  const [arrayCount, setArrayCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      // setLoader(true);
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
        setLoader(false);



      } catch (err) {
        alert(err.message); // Catch and display error if any
      }
      setLoader(false);
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
        {Loader && (
          <ActivityIndicator size="large" color={"#fff"} style={styles.loader} />
        )}

        {OrderList && OrderImage && (
          <FlatList
            style={styles.bodyContent}
            //data={OrderList}
            data={OrderList.sort((a, b) => b.created_on.localeCompare(a.created_on))}
            //  data={orderDetails}
            renderItem={({ item }) => (
              <OrderCard
              onDetails={() => {
                setOrder(item),
                 navigation.navigate("OrderDetails");
              }}
                image={OrderImage}
                orderId={item.id}
               // orderStatus={item.status}
                //.charAt(0).toUpperCase() + item.status.slice(1).replace("_", " ")}
                orderStatus= {
                  item.status === 'draft' ? 'Draft' :
                  item.status === 'uploaded' ? 'Uploaded' :
                  item.status === 'in_progress' ? 'In Progress' :
                  item.status === 'qc_in_progress' ? 'QC in progress' :
                  item.status === 'approval_required' ? 'Approval required' :
                  item.status === 'approved' ? 'Approved' :
                 
                  item.status}
                  // ('draft', 'Draft'),
                  // ('uploaded', 'Uploaded'),
                  // ('in_progress', 'In progress'),
                  // ('qc_in_progress', 'QC in progress'),
                  // ('approval_required', 'Approval required'),
                  // ('approved', 'Approved'),
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
  loader: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
  },
});

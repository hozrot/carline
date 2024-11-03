import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
//import FastImage from 'react-native-fast-image';
import OrderCard from "../component/OrderCard";
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
import UserContext from "../auth/UserContext";
import moment from "moment";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
//sudo npm install moment --save

export default function OrderScreen({ navigation }) {
  const [OrderList, setOrderList] = useState([]);

  const [OrderImage, setOrderImage] = useState();
  const { userData, setOrder } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [Loader, setLoader] = useState(false);

  const inProgressText = "in_progress";

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
        const imageResponse = await axios.get(`${BaseUrl}/order-upload/`, {
          headers: {
            Authorization: `token ${userData?.token}`, // Pass the token here
            "Content-Type": "application/json",
          },
        });
        const ordersWithImages = response.data.map((order) => ({
          ...order,
          images: imageResponse?.data.filter(
            (image) => image.order_id === order.id
          ),
        }));

        setOrderList(ordersWithImages);
        setOrderImage(imageResponse?.data);
        setIsLoading(false);
        console.log(imageResponse?.data);
      } catch (err) {
        alert(err.message); // Catch and display error if any
      }
      setLoader(false);
    };

    // Adding event listener for focus
    const unsubscribe = navigation.addListener("focus", fetchOrders);

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
          <ActivityIndicator
            size="large"
            color={"#fff"}
            style={styles.loader}
          />
        )}

        {OrderList && OrderImage && OrderList.length > 0 ? (
          <FlatList
            style={styles.bodyContent}
            //data={OrderList}
            data={OrderList.sort((a, b) =>
              b.created_on.localeCompare(a.created_on)
            )}
            //  data={orderDetails}
            renderItem={({ item }) => (
              <View
              // onPress={() => {
              //   setOrder(item), navigation.navigate("OrderDetails");
              // }}
              >
                <OrderCard
                  onDetails={() => {
                    setOrder(item), navigation.navigate("OrderDetails");
                  }}
                  image={OrderImage}
                  orderId={item.id}
                  // orderStatus={item.status}
                  //.charAt(0).toUpperCase() + item.status.slice(1).replace("_", " ")}
                  orderStatus={
                    item.status === "draft"
                      ? "Draft"
                      : item.status === "uploaded"
                      ? "Uploaded"
                      : item.status === "in_progress"
                      ? "In Progress"
                      : item.status === "qc_in_progress"
                      ? "QC in progress"
                      : item.status === "approval_required"
                      ? "Approval required"
                      : item.status === "approved"
                      ? "Approved"
                      : item.status
                  }
                  // ('draft', 'Draft'),
                  // ('uploaded', 'Uploaded'),
                  // ('in_progress', 'In progress'),
                  // ('qc_in_progress', 'QC in progress'),
                  // ('approval_required', 'Approval required'),
                  // ('approved', 'Approved'),
                  imageCount={item?.images?.length}
                  //imageCount={arrayCount}
                  dayCount={moment(item.created_on).fromNow()}
                />
              </View>
            )}
          />
        ) : (
          <View  style={styles.flatList}>
       <Text style={{
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "condensedBold",
        
        alignItems:'center'
      }}> You have No orders till now </Text>
       </View>
        )}
        
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
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
});

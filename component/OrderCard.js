import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from "../auth/UserContext";
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
//import FastImage from 'react-native-fast-image';

export default function OrderCard({
  image,
  orderId,
  imageCount,
  dayCount,
  orderStatus,
  onDetails,
}) {
  let statusColor;

  // ('draft', 'Draft'),
  // ('uploaded', 'Uploaded'),
  // ('in_progress', 'In progress'),
  // ('qc_in_progress', 'QC in progress'),
  // ('approval_required', 'Approval required'),
  // ('approved', 'Approved'),

  if (orderStatus == "Draft") {
    statusColor = "pink";
  } else if (orderStatus == "Uploaded") {
    statusColor = "#FFCA0C";
  } else if (orderStatus == "QC in progress") {
    statusColor = "yellow";
  } else if (orderStatus == "In Progress") {
    statusColor = "#0CFFB3";
  } else if (orderStatus == "Approval required") {
    statusColor = "red";
  } else if (orderStatus == "Approved") {
    statusColor = "cyans";
  } else {
    statusColor = "white";
  }
  const { userData } = useContext(UserContext);
  const [Img, setImg] = useState("");
  const [Imgcount, setImgcount] = useState("");

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: `${BaseUrl}/order-upload/${orderId}/files/`,
  //     headers: {
  //       "Authorization": `Token ${userData?.token}`, // Pass the token here
  //       // 'Cookie': 'csrftoken=NJChvjOxebFsuddDFi8waFmFFeWWLsBm; sessionid=pewl7aqbu7dwierg2uy7yipixdz05r7s'
  //     }
  //   };
  //   {
  //     orderId &&
  //       axios.request(config)
  //         .then((response) => {
  //           setImg(response.data);
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           console.log('backgrounds', error);
  //         });
  //   }
  // }, [orderId])


  useEffect(() => {
    {
      orderId &&
        axios
          .get(`${BaseUrl}/order-upload/${orderId}/files/`, {
            headers: {
              Authorization: `token ${userData?.token}`, // Pass the token here
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setImg(response.data);
            //console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [orderId]);

  return (
    <View style={styles.OrderCard}>
      <View style={{ flex: 0.35 , height:124}}>
        {/* <ScrollView horizontal={true}>
          <Image source={{ uri: Img?.file }} style={styles.imageList} />
          <Image source={{ uri: Img?.file }} style={styles.imageList} />
        </ScrollView> */}
        <ScrollView horizontal={true}>
        <FlatList
        data={Img}
        renderItem={({ item }) => (
          <Image source={{ uri: item?.file }} style={styles.imageList} />
        )}
        keyExtractor={(item) => item.order_id} // Replace 'id' with the unique identifier of your images
        numColumns={10} // Adjust the number of columns as needed
       // columnWrapperStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
      />
      </ScrollView>
      </View>

      <View style={{ flex: 0.62, flexDirection: "column" }}>
        <View style={{ flex: 0.2, justifyContent: 'center' }}>

          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontFamily: "DMSans_500Medium",
            }}
          >

            {orderId}
          </Text>
        </View>
        <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-between", paddingRight: 8 }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "DMSans_400Regular",

            }}
          >
            {" "}
            {imageCount} images
          </Text>

          <Text
            style={{
              color: statusColor,
              fontSize: 13,
              fontFamily: "DMSans_500Medium",
            }}
          >
            {orderStatus}
          </Text>
        </View>
        <View style={{ flex: 0.4, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingRight: 8 }}>
          {/* <View style={{ paddingTop: 45, paddingLeft: 10 }}> */}
          <Text
            style={{
              color: "#ffffff",
              fontSize: 12,
              fontFamily: "DMSans_400Regular",
            }}
          >
            {dayCount}
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 15,
              width: 90,
              height: 30,
              padding: 5,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onDetails}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 12,
                fontFamily: "DMSans_400Regular",
              }}
            >
              View Order{" "}
              <MaterialCommunityIcons
                name="ship-wheel"
                size={12}
                color={"#ffffff"}
              />
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  OrderCard: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    padding: 2,
    borderRadius: 25,
  },
  imageList: {
    width: 119,
    height: 124,
    borderRadius: 22,
    marginRight:10
   

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

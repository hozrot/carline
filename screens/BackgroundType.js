import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,

} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from '../auth/UserContext';
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
export default function BackgroundType({ navigation, image, TypeName, route }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [imageList, setImageList] = useState(null);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/background-categories/`, {
          headers: {
            'Authorization': `token ${userData?.token}`,  // Pass the token here
            'Content-Type': 'application/json',
          }
        });
        setImageList(response.data);


        setIsLoading(false);
      } catch (err) {
        alert(err.message);  // Catch and display error if any
      }
    };

    fetchBackground();
  }, []);
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="stretch"
      style={styles.BackList}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingTop: 40,
          paddingLeft: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("GuideAdd")}
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
          Background Type
        </Text>
        <Text> </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={imageList}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => navigation.navigate("BackgroundList", { "catid": item.id })}
              style={{
                backgroundColor: 'transparent', borderRadius: 35, margin: 5,
              }}
            >
              <Image style={styles.ImageList} source={{ uri: item.image }} />
              <Text style={{
                color: "#ffffff",
                fontFamily: "DMSans_500Medium",
                fontSize: 18,

              }}> {item.name} </Text>
            </TouchableOpacity>

          )}
          keyExtractor={(item) => item.id}
        />)}
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  BackList: {
    flex: 1,
  },
  ImageList: {
    width: 'auto',
    height: 150,
    margin: 5,
    borderRadius: 15


  },
  imageBox: {
    width: "100%",
    height: 170,
    borderRadius: 25,
  },
  SelectIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 8,
    left: 6,
    height: 30,
    width: 30,
    backgroundColor: "transparent",
    borderRadius: 45,
  },
});
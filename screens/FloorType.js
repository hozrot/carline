import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from '../auth/UserContext';
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";

const FlrType = [
  {
    id: 1,
    image: require('../assets/red-car2.png'),
    TypeName: 'Interior',
  },

];
export default function FloorType({ navigation }) {

  const [selectedIds, setSelectedIds] = useState([]);
  const [imageList, setImageList] = useState(null);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFloor = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/floor-categories/`, {
          headers: {
            'Authorization': `token ${userData?.token}`,  // Pass the token here
            'Content-Type': 'application/json',
          }
        });
        setImageList(response.data);
        setIsLoading(false);
      } catch (err) {
        alert(err.message);  // Catch and display error if any
        setIsLoading(false);
      }
    };

    fetchFloor();
  }, []);

  return (
    <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' style={styles.BackList} >
      <View style={{
        color: 'white',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 40,
        paddingLeft: 10
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("GuideAdd")} style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={"#ffffff"} />
          <Text style={{
            color: "#ffffff",
            fontFamily: 'DMSans_500Medium', fontSize: 18
          }}> </Text>
        </TouchableOpacity>
        <Text style={{
          color: "#ffffff",
          fontFamily: 'DMSans_500Medium', fontSize: 18
        }}> Floor Type</Text>
        <Text>       </Text>

      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={imageList}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => navigation.navigate("FloorList", { "id": item.id })}
              style={{
                backgroundColor: 'transparent', borderRadius: 35, margin: 5
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
})
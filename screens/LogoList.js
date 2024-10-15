import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from '../auth/UserContext';
import BaseUrl from "../auth/BaseUrl";
import axios from "axios";
const data = [
  {
    id: 1,
    image: require('../assets/logo1.png'),
  },
  {
    id: 2,
    image: require('../assets/logo2.png'),
  },
  {
    id: 3,
    image: require('../assets/logo3.png'),
  },
  {
    id: 4,
    image: require('../assets/logo1.png'),
  },
  {
    id: 5,
    image: require('../assets/logo2.png'),
  },
  {
    id: 6,
    image: require('../assets/logo3.png'),
  },

  // ... more items
];


export default function LogoList({ navigation }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [imageList, setImageList] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/logo-placements/`, {
          headers: {
            'Authorization': `token ${userData?.token}`,  // Pass the token here
            'Content-Type': 'application/json',
          }
        });
        setImageList(response.data);
      } catch (err) {
        alert(err.message);  // Catch and display error if any
      }
    };

    fetchLogo();
  }, []);


  return (
    <ImageBackground source={require("../assets/background.png")} resizeMode='stretch' style={styles.BackList} >
      <View style={{
        color: 'white',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 40,
        paddingLeft: 10,
        paddingBottom: 10
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
        }}> Logo</Text>
        <Text>       </Text>

      </View>
      <FlatList
        data={imageList}
        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() => navigation.navigate("GuideAdd", item.image)}
            style={{
              backgroundColor: 'transparent', borderRadius: 35, margin: 5
            }}
          >
            <Image style={styles.ImageList} source={{ uri: item.image }} />
            {/* <Text style={{
              color: 'white'
            }} >
              {item.name}</Text> */}
          </TouchableOpacity>

        )}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: 207,
    borderRadius: 85

  },
  BackList: {
    flex: 1,
  },
  ImageList: {
    width: 'auto',
    height: 150,
    margin: 5,
    borderRadius: 15,
    resizeMode: 'stretch'


  },
})
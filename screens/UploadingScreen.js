//npm install react-native-svg
//npx expo install react-native-reanimated
// npm install react-native-circular-progress-indicator
import CircularProgress from "react-native-circular-progress-indicator";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
export default function UploadingScreen({ route, navigation, value }) {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="stretch"
      style={styles.containerView}
    >
      <View style={styles.containerView}>
        <CircularProgress
          value={value}
          radius={100}
          inActiveStrokeOpacity={1}
          activeStrokeWidth={15}
          valueSuffix={"%"}
          inActiveStrokeWidth={20}
          progressValueStyle={{
            fontWeight: "bold",
            fontSize: 30,
            color: "white",
          }}
          activeStrokeSecondaryColor="#A52306"
          inActiveStrokeColor="black"
          duration={1800}
          dashedStrokeConfig={{
            count: 50,
            width: 8,
          }}
          strokeColorConfig={[
            { color: "#FF4A22", value: 0 },
            { color: "#FF4A22", value: 50 },
            { color: "#FF4A22", value: 100 },
          ]}

          // onAnimationComplete={() => navigation.navigate("SuccessScreen")}
        />
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontFamily: "DMSans_500Medium",
            padding: 30,
          }}
        >
          Uploading File{" "}
        </Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

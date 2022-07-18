import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");

const yellowColour = "rgba(245, 233, 188, 1)";
const darkYellowColour = "rgb(251, 194, 8)";

const TrackerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bee/trialbee.jpg")}
        resizeMode="contain"
        style={{ height: height / 4, width: width / 2 }}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: yellowColour }]}
        onPress={() => navigation.navigate("expense tracker")}
      >
        <Text style={styles.textStyle}>Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: darkYellowColour }]}
        onPress={() => navigation.navigate("mood tracker")}
      >
        <Text style={styles.textStyle}>Mood</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 75,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    height: 90,
    width: 200,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gainsboro",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 10, width: 10 },
    borderColor: "gainsboro",
  },
  textStyle: {
    fontSize: 15,
  },
});
export default TrackerScreen;

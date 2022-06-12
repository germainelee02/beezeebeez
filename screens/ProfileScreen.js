import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../icons/menuRight.png")}
            style={{ tintColor: "gray" }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerName}>Profile screen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerName: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  menuContainer: {
    marginLeft: width - 50,
    borderRadius: 10,
    padding: 5,
  },
});
export default ProfileScreen;

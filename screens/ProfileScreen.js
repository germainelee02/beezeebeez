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
import { ScrollView } from "react-native-gesture-handler";
const { height, width } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../assets/icons/menuRight.png")}
              style={{ tintColor: "gray" }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerName}>Profile screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 10,
  },
  headerName: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  menuContainer: {
    marginLeft: width - 80,
    marginTop: 5,
  },
});
export default ProfileScreen;

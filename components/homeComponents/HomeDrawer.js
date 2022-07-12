import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Screens from "../../screens/index";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "../CustomDrawer";
const { height, width } = Dimensions.get("screen");

const Drawer = createDrawerNavigator();

const HomeDrawer = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props, navigation) => (
        <CustomDrawer {...props} {...navigation} />
      )}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerActiveBackgroundColor: "#f5e8bb",
        drawerActiveTintColor: "gray",
        gestureEnabled: true,
        drawerLabelStyle: { marginLeft: 15, fontWeight: "bold" },
        drawerItemStyle: {
          width: width / 2 - 20,
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 25,
        },
        drawerLabelStyle: {
          alignSelf: "center",
          marginLeft: 25,
        },
        drawerStyle: {
          width: width / 2 + 10,
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Screens.HomeScreen} />
      <Drawer.Screen name="Profile" component={Screens.ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

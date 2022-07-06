import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Screens from "../../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "../CustomDrawer";
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
        drawerLabelStyle: { marginLeft: 10, fontWeight: "bold" },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Screens.HomeScreen} />
      <Drawer.Screen name="Profile" component={Screens.ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

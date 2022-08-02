import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Screens from "../../screens/index";
import HomeDrawer from "./HomeDrawer";
import { Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 50,
          borderRadius: 25,
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 25,
          backgroundColor: "white",
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={Screens.CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
                backgroundColor: focused ? "#f6e6bb" : "white",
                width: 36,
                height: 36,
                borderRadius: 20,
              }}
            >
              <Octicons name="calendar" size={18} color={"grey"} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ToDo"
        component={Screens.ToDoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
                backgroundColor: focused ? "#f6e6bb" : "white",
                width: 36,
                height: 36,
                borderRadius: 20,
              }}
            >
              <Octicons name="check-circle" size={18} color={"grey"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
                backgroundColor: focused ? "#f6e6bb" : "white",
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Octicons name="home" size={18} color={"grey"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        // changed to tracker screen for mood/expenses
        name="Trackers"
        component={Screens.TrackerScreen}
        options={{
          title: "Tracking",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
                backgroundColor: focused ? "#f6e6bb" : "white",
                width: 36,
                height: 36,
                borderRadius: 20,
              }}
            >
              <Octicons name="pulse" size={18} color="grey" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Friends"
        component={Screens.FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
                backgroundColor: focused ? "#f6e6bb" : "white",
                width: 36,
                height: 36,
                borderRadius: 20,
              }}
            >
              <Octicons name="people" size={18} color={"grey"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "gray",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
});
export default TabNavigator;

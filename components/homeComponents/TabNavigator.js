import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Screens from "../../screens/index";
import HomeDrawer from "./HomeDrawer";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 60,
          borderRadius: 25,
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
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
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../../icons/tabBarIcons/cal.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "gray",
                  // tintColor: focused ? "#f5e9bc" : "gray",
                }}
              />
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
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../../icons/tabBarIcons/todo.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "gray",

                  // tintColor: focused ? "#f5e9bc" : "gray",
                }}
              />
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
              <Image
                source={require("../../icons/tabBarIcons/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "gray",

                  // tintColor: focused ? "#f5e9bc" : "gray",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ExpenseTracker"
        component={Screens.ExpenseTrackerScreen}
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
              <Image
                source={require("../../icons/tabBarIcons/expense.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "gray",

                  // tintColor: focused ? "#f5e9bc" : "gray",
                }}
              />
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
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../../icons/tabBarIcons/friends.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "gray",
                  // tintColor: focused ? "#f5e9bc" : "gray",
                }}
              />
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

import React, { Component } from "react";
import * as Screens from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./homeComponents/TabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Screens.LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Screens.SignUpScreen}
          options={{
            title: "Sign Up",
            headerStyle: { backgroundColor: "rgba(245, 233, 188, 1)" },
          }}
        />
        <Stack.Screen
          name="temp home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="monthly expenses"
          component={Screens.MonthlyExpenseScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="mood tracker"
          component={Screens.MoodTrackerScreen}
          options={{ headerShown: true, title: "Mood" }}
        />
        <Stack.Screen
          name="monthly mood"
          component={Screens.MonthlyMood}
          options={{ headerShown: true, title: "Monthly Mood" }}
        />
        <Stack.Screen
          name="tracker screen"
          component={Screens.TrackerScreen}
          options={{ headerShown: true, title: "Tracking" }}
        />
        <Stack.Screen
          name="expense tracker"
          component={Screens.ExpenseTrackerScreen}
          options={{ title: "Expenses" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

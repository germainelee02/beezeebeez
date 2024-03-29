import React, { Component } from "react";
import * as Screens from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./HomeComponents/TabNavigator";

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
          name="groups"
          component={Screens.FriendsScreen}
          options={{ headerShown: false, title: "" }}
        />

        <Stack.Screen
          name="invite"
          component={Screens.InviteFriendsScreen}
          options={{ headerShown: true, title: "Add Friend" }}
        />
        <Stack.Screen
          name="chat"
          component={Screens.ChatScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="options"
          component={Screens.OptionsScreen}
          options={{ headerShown: false, title: "" }}
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
        <Stack.Screen
          name="reset password screen"
          component={Screens.ResetPasswordScreen}
          options={{ title: "Reset Password" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

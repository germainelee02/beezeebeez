import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToDosToday } from "../components/homeComponents";

const ToDoScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>To do Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default ToDoScreen;

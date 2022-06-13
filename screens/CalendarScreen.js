import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const CalendarScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Calendar Screen</Text>
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

export default CalendarScreen;

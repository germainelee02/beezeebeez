import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const SharedScreen = () => {
  <View style={styles.mainContainer}>
    <Text>Shared Screen</Text>
  </View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default SharedScreen;

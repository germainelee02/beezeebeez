import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const FriendsScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>List out your friends here and GCs with shared cals</Text>
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

export default FriendsScreen;

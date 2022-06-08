import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

const WelcomeHeader = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.headerText1}>Hello,</Text>
      <Text style={styles.headerText2}> {props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {},

  headerText1: {
    fontSize: 40,
    letterSpacing: -2,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 5,
    lineHeight: 40,
  },
  headerText2: {
    fontSize: 40,
    letterSpacing: -2,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 40,
  },
});

export default WelcomeHeader;

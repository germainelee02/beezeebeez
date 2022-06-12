import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import moment from "moment";
const WelcomeHeader = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.headerText1}>Hello,</Text>
      <Text style={styles.headerText2}> {props.name}</Text>
      <Text style={styles.dateText}>
        {moment().format("dddd")}, {moment().format("ll")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 0,
  },
  dateText: {
    textAlign: "left",
    marginLeft: 5,
    marginTop: 10,
  },
});

export default WelcomeHeader;

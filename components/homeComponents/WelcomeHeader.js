import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import moment from "moment";
const WelcomeHeader = (props) => {
  const name = props.name;
  return (
    <View style={props.style}>
      <Text style={styles.headerText1}>Hello,</Text>
      <Text style={styles.headerText2}>{name}</Text>
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
    marginTop: 10,
    width: " 100%",
  },
});

export default WelcomeHeader;

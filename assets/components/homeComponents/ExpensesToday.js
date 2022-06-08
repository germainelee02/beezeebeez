import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");
const ExpensesToday = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.header}>Today's Spending</Text>
      <View style={[styles.container]}>
        <Text style={styles.amount}>${props.amountSpentToday}</Text>

        {/* <Text>Your budget today is {props.budgetToday}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6e6bb",
    height: 150,
    width: 165,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
  },
  header: {
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: -1,
    fontSize: 20,
  },
  amount: {
    fontSize: 40,
    color: "gray",
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.5,
    elevation: 4,
  },
});

export default ExpensesToday;

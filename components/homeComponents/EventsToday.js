import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

const EventsToday = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.header}>Today's Events</Text>
      <View style={[styles.container]}>
        <Text style={{ marginTop: 20 }}>Events here in list form</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6e6bb",
    height: 180,
    width: width - 40,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
  },
  header: {
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: -1,
    fontSize: 20,
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
export default EventsToday;

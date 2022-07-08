import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import moment from "moment";
import WeekCalendar from "./WeekCalendar";
const { height, width } = Dimensions.get("window");

const WelcomeHeader = (props) => {
  const name = props.name;
  const [date, setDate] = useState(new Date());
  return (
    <View style={props.style}>
      <View style={{ flex: 1, marginTop: 15 }}>
        <Text style={styles.headerText1}>Hello,</Text>
        <Text style={styles.headerText2}>{name}</Text>
      </View>

      <View style={styles.weekCalContainer}>
        <WeekCalendar date={date} />
      </View>
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
  monthText: {
    textAlign: "center",
    marginTop: 10,
    width: " 100%",
    letterSpacing: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  weekCalContainer: {
    alignContent: "center",
    position: "absolute",
    top: 120,
  },
});

export default WelcomeHeader;

import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarMonth from "../components/CalendarComponents/CalendarMonth";
import AgendaScreen from "../components/CalendarComponents/AgendaScreen";
import CreateEventModal from "../components/CalendarComponents/CreateEventModal";
const { height, width } = Dimensions.get("window");

const CalendarScreen = () => {
  // for create event modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AgendaScreen />
      <View style={styles.createBtnContainer}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => changeModalVisible(true)}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
      >
        <CreateEventModal changeModalVisible={changeModalVisible} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  plus: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
  },
  createBtn: {
    backgroundColor: "#ffba09",
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
  },
  createBtnContainer: {
    position: "absolute",
    top: height - 90,
    left: width - 70,
  },
});

export default CalendarScreen;

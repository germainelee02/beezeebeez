import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarMonth from "../components/CalendarComponents/CalendarMonth";
import CreateEventModal from "../components/CalendarComponents/CreateEventModal";
import Cal from "../components/CalendarComponents/Cal";
import AgendaView from "../components/CalendarComponents/AgendaView";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const CalendarScreen = () => {
  // for create event modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  const [dateSelected, setDateSelected] = useState(
    moment().format("DD MMMM YYYY")
  );
  const [loading, setLoading] = useState(false);

  // useEffect(() => setDateSelected(Date()));
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ marginBottom: 5 }}>
        <Cal updateData={(data) => setDateSelected(data)} />
      </View>

      <AgendaView date={dateSelected} />
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
    shadow: {
      shadowColor: "white",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4.5,
      elevation: 4,
    },
  },
  createBtnContainer: {
    position: "absolute",
    top: height - 90,
    left: width - 60,
  },
});

export default CalendarScreen;

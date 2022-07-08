import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import EventModal from "./EventModal";
const { height, width } = Dimensions.get("window");

const Event = ({
  title,
  startTime,
  endTime,
  notes,
  endDate,
  startDate,
  id,
}) => {
  const notesDisplay =
    notes.length > 30 ? notes.substring(0, 30) + "....." : notes;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeModalVisible(true)}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.startTime}>{startTime}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.notes}>{notesDisplay}</Text>
      </View>
      <Modal
        visible={isModalVisible}
        // presentationStyle={"overFullScreen"}
        transparent={true}
      >
        <EventModal
          changeModalVisible={changeModalVisible}
          title={title}
          notes={notes}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          endDate={endDate}
          id={id}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5e8bb",
    width: width - 40,
    height: 70,
    marginBottom: 15,
    justifyContent: "center",
    // paddingLeft: 18,
    // paddingRight: 18,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    paddingBottom: 5,
  },
  notes: {
    color: "grey",
  },
  startTime: {
    fontSize: 13,
    paddingBottom: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
  },
  rightContainer: {
    paddingTop: 10,
    flex: 1,
    marginLeft: 15,
  },
  timeContainer: {
    justifyContent: "center",
    width: 40,
    height: 50,
    alignContent: "center",
    marginLeft: 15,
    marginTop: 5,
  },
});

export default Event;

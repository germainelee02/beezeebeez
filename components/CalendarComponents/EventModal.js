import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDoc, doc } from "firebase/firestore";
import { authentication, db } from "../../firebase/firebase-config";

const EventModal = (props) => {
  const closeEvent = (bool) => {
    props.changeModalVisible(bool);
  };

  const deleteEvent = async () => {
    try {
      await deleteDoc(
        db,
        "events: " + authentication.currentUser.uid,
        props.id
      );
    } catch (e) {
      console.log(e);
    }
    closeEvent(false);
  };
  const showAlert = () => {
    return Alert.alert(
      "Are you sure you want to delete this event?",
      "You cannot undo this change",
      [
        { text: "Cancel", onPress: () => console.log("alert closed") },
        { text: "Confirm", onPress: () => deleteEvent() },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>

        <View style={styles.startContainer}>
          <Text style={{ fontWeight: "500" }}>Starts: </Text>
          <Text style={styles.startTime}>
            {props.startDate}, {props.startTime}
          </Text>
        </View>
        <View style={styles.startContainer}>
          <Text style={{ fontWeight: "500" }}>Ends: </Text>
          <Text style={styles.startTime}>
            {props.endDate}, {props.endTime}
          </Text>
        </View>
        <View style={styles.startContainer}>
          <Text style={styles.notes}>{props.notes}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => closeEvent(false)}
            style={[styles.buttonContainer, { backgroundColor: "lightgrey" }]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: "#ea897b" }]}
            onPress={() => showAlert()}
          >
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  titleContainer: {
    top: 30,
    width: 200,
    alignItems: "center",
  },
  cancelContainer: {
    left: 100,
  },
  startContainer: {
    top: 60,
    flexDirection: "row",
    marginBottom: 25,
  },
  cancel: {},
  container: {
    backgroundColor: "white",
    height: 400,
    width: 300,
    borderRadius: 25,
    // justifyContent: "center",
    alignItems: "center",
  },
  notes: {
    color: "grey",
  },
  buttonsContainer: {
    top: 300,
    position: "absolute",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 35,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "500",
  },
});
export default EventModal;

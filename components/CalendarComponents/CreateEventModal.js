import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ModalDatePicker from "./ModalDatePicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db, authentication } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  where,
  updateDoc,
  Firestore,
} from "firebase/firestore";
import * as firebase from "firebase/app";
import moment from "moment";
import { toDate } from "date-fns";

const { height, width } = Dimensions.get("window");
const { Timestamp } = require("firebase/firestore");

const CreateEventModal = (props) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(
    moment().format("DD MMMM YYYY, h:mm A")
  );
  const [endDate, setEndDate] = useState("");

  const [events, setEvents] = useState([
    {
      title: "",
      startDate: "",
      endDate: "",
      notes: "",
    },
  ]);

  const handleAddEvent = () => {
    console.log(startDate);
    setEvents([
      ...events,
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
      },
    ]);
  };

  const uploadEvent = async () => {
    const docRef = await addDoc(
      collection(db, "events: " + authentication.currentUser.uid),
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
      }
    );
    updateDoc(docRef, {
      id: docRef.id,
    });
  };

  const closeEvent = (bool) => {
    props.changeModalVisible(bool);
  };

  const clearInputs = () => {
    setTitle("");
    setNotes("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <View style={styles.closeIconContainer}>
            <MaterialIcons name="close" size={20} onPress={closeEvent} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.bigHeader}>Your</Text>
            <Text style={styles.bigHeader}>New Event</Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>Title:</Text>
            <TextInput
              style={styles.genereicContainer}
              value={title}
              onChangeText={(text) => setTitle(text)}
              selectionColor={"#ffba09"}
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>Start Date & Time:</Text>
          </View>
          <ModalDatePicker updateData={(val) => setStartDate(val)} />

          <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>End Date & Time:</Text>
          </View>
          <ModalDatePicker updateData={(val) => setEndDate(val)} />

          <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>Notes:</Text>
            <Text style={{ marginBottom: 5, color: "gray" }}>
              (max of 300 characters)
            </Text>
            <TextInput
              style={[styles.notesContainer]}
              value={notes}
              onChangeText={(text) => setNotes(text)}
              selectionColor={"#ffba09"}
              multiline={true}
              maxLength={300}
            />
          </View>
          <View style={styles.createBtnContainer}>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => {
                handleAddEvent();
                closeEvent(false);
                uploadEvent();
                clearInputs();
              }}
            >
              <Text style={styles.tick}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default CreateEventModal;

const styles = StyleSheet.create({
  bigHeader: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -1,
    color: "black",
  },
  modalContent: {
    textAlign: "left",
    padding: 15,
    height: height - 10,
    width: width,
  },
  closeIconContainer: {
    top: 0,
    marginBottom: 50,
    bottom: 0,
    top: 50,
    marginLeft: width - 60,
  },
  genereicContainer: {
    paddingVertical: 15,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  notesContainer: {
    borderColor: "gray",
    paddingVertical: 15,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingTop: 10,
  },
  tick: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
  headerStyle: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  headerContainer: {
    marginTop: 15,
  },
  createBtnContainer: {
    bottom: 20,
    position: "absolute",
    top: height - 20,
    left: width - 70,
    justifyContent: "flex-end",
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
});

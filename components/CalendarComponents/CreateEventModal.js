import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Modal,
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
import Input from "./Input";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../../screens/LoadingScreen";

const { height, width } = Dimensions.get("window");
const { Timestamp } = require("firebase/firestore");

const CreateEventModal = (props) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(moment().format("DD MMMM YYYY"));
  const [startTime, setStartTime] = useState(moment().format("h:mm A"));
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(moment().format("h:mm A"));
  const [isDataValid, setIsDataValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemId, setItemId] = useState("");

  const [events, setEvents] = useState([
    {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      notes: "",
    },
  ]);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title: title,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        notes: notes,
      },
    ]);
  };
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    } else {
      hours = "0" + hours;
    }

    return `${hours}${minutes}`;
  };

  const uploadEvent = async () => {
    const startDateTime = startDate + " " + convertTime12to24(startTime);
    const endDateTime = endDate + " " + convertTime12to24(endTime);
    const docRef = await addDoc(
      collection(db, "events: " + authentication.currentUser.uid),
      {
        title: title,
        startDate: startDate,
        startTime: startTime,
        startDateTime: startDateTime,
        endTime: endTime,
        endDate: endDate,
        endDateTime: endDateTime,
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
    setStartTime("");
    setEndTime("");
  };
  // to open loading screen
  const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false);
  const changeLoadingVisible = (bool) => {
    setIsLoadingScreenOpen(bool);
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const isFocused = useIsFocused();

  const validate = () => {
    let isValid = true;
    if (!title) {
      handleError("Please enter your event title", "title");
      isValid = false;
      setIsDataValid(false);
    }
    if (!(endDate >= startDate)) {
      // end date is before start date,
      handleError("Please enter a valid date", "endDate");
      isValid = false;
      setIsDataValid(false);
    } else {
      if (
        startDate == endDate &&
        !(convertTime12to24(endTime) > convertTime12to24(startTime))
      ) {
        handleError("Please enter a valid time", "endDate");
        isValid = false;
        setIsDataValid(false);
      }
    }

    if (notes && notes.length > 300) {
      handleError("You cannot exceed 300 characters", "notes");
      isValid = false;
      setIsDataValid(false);
    }
    if (isValid) {
      handleError(null, "endDate");
      handleError(null, "title");
      handleError(null, "notes");
      setIsDataValid(true);
      uploadEvent();
      setIsLoadingScreenOpen(true);
      closeEvent(false);
      clearInputs();
    }
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

          <View
            style={{
              marginTop: 10,
              flex: 1,
              alignContent: "center",
            }}
          >
            <Input
              label={"Title:"}
              value={title}
              onChangeText={(text) => setTitle(text)}
              selectionColor={"#ffba09"}
              onFocus={() => handleError(null, "title")}
              error={errors.title}
            />
            <View style={styles.genericContainer}>
              <Text style={styles.headerStyle}>Start Date & Time:</Text>
              <ModalDatePicker
                updateDate={(val) => setStartDate(val)}
                updateTime={(time) => setStartTime(time)}
              />
            </View>

            <View style={styles.genericContainer}>
              <Text style={styles.headerStyle}>End Date & Time:</Text>
              <ModalDatePicker
                updateDate={(val) => setEndDate(val)}
                updateTime={(time) => setEndTime(time)}
                error={errors.endDate}
              />
            </View>

            <Input
              label={"Notes:"}
              value={notes}
              onChangeText={(text) => setNotes(text)}
              onFocus={() => handleError(null, "notes")}
              error={errors.notes}
              selectionColor={"#ffba09"}
              multiline={true}
            />
          </View>
          <View style={styles.createBtnContainer}>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => {
                handleAddEvent();
                validate();
              }}
            >
              <Text style={styles.tick}>✓</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={isLoadingScreenOpen}>
            <LoadingScreen changeLoadingVisible={changeLoadingVisible} />
          </Modal>
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
    marginTop: 0,
    marginBottom: 5,
  },
  genericContainer: {
    height: 100,
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

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import { authentication, db } from "../firebase/firebase-config";
import {
  doc,
  setDoc,
  collection,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";
import PopUpModal from "../components/MoodComponents/PopUpModal";
import ReasonModal from "../components/MoodComponents/ReasonModal";

const MoodTrackerScreen = ({ navigation }) => {
  const happyColour = "lemonchiffon";

  const sadColour = "powderblue";

  const fearColour = "lavender";

  const angryColour = "lightcoral";

  const disgustColour = "darkseagreen";

  const surpriseColour = "navajowhite";

  const [markedDays, setMarkedDays] = useState({});

  const [reasonDays, setReasonDays] = useState({});

  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(true);

  const [day, setDay] = useState({});

  const [colour, setColour] = useState("");

  // toggling the popup modal
  const [visible, setVisible] = useState(false);

  // toggling the reason modal
  const [revisible, setRevisible] = useState(false);
  // console.log(reasonDays["2022-06-16"].reason);

  useEffect(() => {
    getData();
    console.log("mood tracker re-rendered");
  }, [refresh]);

  const closeModal = () => {
    setVisible(false);
  };

  const closeReModal = () => {
    setRevisible(false);
  };
  const openReasonModal = (day, col) => {
    setDay(day);
    setColour(col);
    setVisible(false);
    setRevisible(true);
  };
  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const getData = async () => {
    setLoading(true);
    const q = query(
      collection(db, "mood tracker: " + authentication.currentUser.uid)
    );
    const moodSnapshot = await getDocs(q);

    let tempMarkedDays = markedDays;

    let tempReasonDays = reasonDays;

    moodSnapshot.forEach((doc) => {
      const { day, colour, reason } = doc.data();
      tempMarkedDays[day] = {
        color: colour,
        startingDay: true,
        endingDay: true,
      };
      tempReasonDays[day] = { reason: reason };
    });
    setMarkedDays(tempMarkedDays);
    setReasonDays(tempReasonDays);
    setLoading(false);
  };

  const addMarkedDays = async (reason) => {
    const moodRef = doc(
      db,
      "mood tracker: " + authentication.currentUser.uid,
      day.dateString
    );
    setDoc(moodRef, {
      day: day.dateString,
      colour: colour,
      reason: reason,
      month: day.month.toString(),
      year: day.year.toString(),
    });
    refreshPage();
    setRevisible(false);
  };

  const checkAndAdd = async (day) => {
    const docRef = doc(
      db,
      "mood tracker: " + authentication.currentUser.uid,
      day.dateString
    );
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return moodAlert(day);
    } else {
      Alert.alert("Mood already selected", "Want to change your mood?", [
        {
          text: "No",
          onPress: () => {
            /* do nothing */
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => moodAlert(day),
        },
      ]);
    }
  };
  const moodAlert = (day) => {
    setDay(day);
    setVisible(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          paddingTop: 40,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text style={styles.titleText}>See your mood in colours!</Text>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => navigation.navigate("monthly mood")}
        >
          <Text style={{ maxWidth: "80%", textAlign: "center" }}>
            View by month
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <PopUpModal
          visible={visible}
          happyColour={happyColour}
          sadColour={sadColour}
          angryColour={angryColour}
          surpriseColour={surpriseColour}
          disgustColour={disgustColour}
          fearColour={fearColour}
          openReasonModal={openReasonModal}
          closeModal={closeModal}
          day={day}
        />
        <ReasonModal
          visible={revisible}
          addMarkedDays={addMarkedDays}
          closeReModal={closeReModal}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <CalendarList
              markingType={"period"}
              markedDates={markedDays}
              onDayPress={(day) => checkAndAdd(day)}
              onDayLongPress={(day) =>
                Alert.alert("Reason", reasonDays[day.dateString].reason)
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: -2,
    textAlign: "left",
    lineHeight: 40,
    maxWidth: "75%",
  },
  monthButton: {
    backgroundColor: "rgb(251, 194, 8)",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default MoodTrackerScreen;

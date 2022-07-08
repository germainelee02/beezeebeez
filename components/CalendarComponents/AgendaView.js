import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, authentication } from "../../firebase/firebase-config";
import Event from "./Event";
import { he } from "date-fns/locale";

const { height, width } = Dimensions.get("window");

const AgendaView = (props) => {
  const date = moment(props.date);
  const dayNum = moment(props.date).format("DD");
  const month = date.format("MMMM");
  const title =
    date.format("DD-MMMM-YYYY") === moment().format("DD-MMMM-YYYY")
      ? "Today's Agenda"
      : "Agenda";

  const [events, setEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [loading, setLoading] = useState(false);

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}${minutes}`;
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const eventsCol = query(
        collection(db, "events: " + authentication.currentUser.uid),
        // where("startDate", "==", date.format("DD MMMM YYYY")),
        orderBy("startTime")
      );
      const eventsSnashot = await getDocs(eventsCol);
      const tempOngoingArray = [];
      const tempUpcomingArray = [];
      eventsSnashot.forEach((doc) => {
        if (
          doc.data().startDate <= date.format("DD MMMM YYYY") &&
          convertTime12to24(doc.data()).startTime <=
            convertTime12to24(moment("h:mm A")) &&
          doc.data().endDateTime >= moment("DD MMMM YYYY") &&
          convertTime12to24(doc.data()).endTime >=
            convertTime12to24(moment("h:mm A"))
        ) {
          tempOngoingArray.push(doc.data());
        }
        if (doc.data().startDate == date.format("DD MMMM YYYY")) {
          tempUpcomingArray.push(doc.data());
        }
      });
      setOngoingEvents(tempOngoingArray);
      setUpcomingEvents(tempUpcomingArray);
      () => console.log(ongoingEvents);
      () => console.log(upcomingEvents);
    };
    getData();
    setLoading(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        top: 20,
        bottom: 200,
        width: width,
      }}
    >
      {loading ? (
        <View>
          <ActivityIndicator size={large} />
        </View>
      ) : (
        <View>
          <Text style={styles.selectedDate}>
            {title}: {date.format("D MMMM YYYY")}
          </Text>
          {events ? (
            <View>
              <Text style={styles.onGoing}>Ongoing</Text>
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                  height: events.length * 130,
                }}
                data={ongoingEvents}
                showsVerticalScrollIndicator={true}
                keyExtractor={(event) => events.indexOf(event)}
                renderItem={({ item, index }) => {
                  return (
                    <Event
                      title={item.title}
                      notes={item.notes}
                      startTime={item.startTime}
                      startDate={item.startDate}
                      endTime={item.endTime}
                      endDate={item.endDate}
                      id={item.id}
                    />
                  );
                }}
              ></FlatList>
              <Text style={styles.onGoing}>Upcoming</Text>
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                  height: events.length * 130,
                }}
                data={upcomingEvents}
                showsVerticalScrollIndicator={true}
                keyExtractor={(event) => events.indexOf(event)}
                renderItem={({ item, index }) => {
                  return (
                    <Event
                      title={item.title}
                      notes={item.notes}
                      startTime={item.startTime}
                      startDate={item.startDate}
                      endTime={item.endTime}
                      endDate={item.endDate}
                      id={item.id}
                    />
                  );
                }}
              ></FlatList>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "gray",
                height: height,
                width: 400,
                flex: 1,
              }}
            >
              <Event title={"You have no events today"} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  selectedDate: {
    fontSize: 20,
    letterSpacing: -1,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 20,
  },
  onGoing: {
    fontWeight: "500",
    marginLeft: 20,
    marginBottom: 10,
  },
});
export default AgendaView;

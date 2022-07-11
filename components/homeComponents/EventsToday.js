import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import moment from "moment";
import { db, authentication } from "../../firebase/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const EventsToday = (props) => {
  const isFocused = useIsFocused();
  const dateNow = moment().format("DD MMMM YYYY");
  const dateSelected = moment(props.date).format("DD MMMM YYYY");
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      const eventsCol = query(
        collection(db, "events: " + authentication.currentUser.uid),
        orderBy("startDateTime")
      );
      onSnapshot(eventsCol, (snapshot) => {
        let tempOngoing = [];
        let tempUpcoming = [];

        snapshot.docs.forEach((doc) => {
          const docStartTime = convertTime12to24(doc.data().startTime);
          const docEndTime = convertTime12to24(doc.data().endTime);
          const docStartDate = doc.data().startDate;
          const docEndDate = doc.data().endDate;

          if (docStartDate === dateSelected) {
            if (docStartDate < dateNow) {
              // do nothing
            } else if (docStartDate > dateNow) {
              tempUpcoming.push(doc.data());
            } else if (docStartDate === dateNow) {
              if (docEndDate > dateSelected && dateSelected === dateNow) {
                tempOngoing.push(doc.data());
              } else if (
                docEndTime < convertTime12to24(moment().format("h:mm A"))
              ) {
                // do nothing
              } else if (
                docStartTime > convertTime12to24(moment().format("h:mm A"))
              ) {
                tempUpcoming.push(doc.data());
              } else if (
                docStartTime <= convertTime12to24(moment().format("h:mm A")) &&
                docEndTime > convertTime12to24(moment().format("h:mm A")) &&
                dateSelected === dateNow
              ) {
                tempOngoing.push(doc.data());
              }
            }
          } else if (
            docStartDate < dateSelected &&
            docEndDate > dateSelected &&
            dateSelected === dateNow
          ) {
            tempOngoing.push(doc.data());
          } else if (
            docEndDate == dateSelected &&
            docStartDate < dateSelected &&
            dateSelected === dateNow
          ) {
            tempOngoing.push(doc.data());
          } else if (docEndDate === dateSelected) {
            tempUpcoming.push(doc.data());
          } else if (
            docStartDate < dateSelected &&
            docEndDate > dateSelected &&
            dateSelected > dateNow
          ) {
            tempUpcoming.push(doc.data());
          }
        });
        setOngoingEvents(tempOngoing);
        setUpcomingEvents(tempUpcoming);
      });
    };
    getData();
  }, [isFocused]);

  return (
    <View style={props.style}>
      <Text style={styles.header}>Today's Events</Text>
      <View style={[styles.container]}>
        {ongoingEvents.length != 0 ? (
          <View>
            <Text style={styles.subheading}>Ongoing</Text>
            {ongoingEvents.map((item) => {
              return (
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    backgroundColor: "#f0d690",
                    width: 300,
                    height: 25,
                    borderRadius: 15,
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                  key={item.id}
                >
                  <View sty>
                    <Text>{item.startTime}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "600", marginLeft: 30 }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View></View>
        )}
        {upcomingEvents.length != 0 ? (
          <View style={{ marginTop: 5, marginBottom: 10 }}>
            <Text style={styles.subheading}>Upcoming</Text>
            {upcomingEvents.map((item) => {
              return (
                <View
                  style={{
                    marginBottom: 3,
                    flexDirection: "row",
                    width: 300,
                    height: 20,
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                  key={item.id}
                >
                  <View>
                    <Text>{item.startTime}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "600", marginLeft: 30 }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6e6bb",
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
  subheading: {
    color: "grey",
    fontWeight: "bold",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
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

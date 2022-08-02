import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
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
import { db, authentication } from "../../firebase/firebase-config";
import * as Events from "./events/index";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../../screens/LoadingScreen";
const { height, width } = Dimensions.get("window");

const AgendaView = (props) => {
  const dateNow = moment().format("DD MMMM YYYY");
  const dateSelected = moment(props.date).format("DD MMMM YYYY");
  const dayNum = moment(props.date).format("DD");

  const title = dateSelected === dateNow ? "Today's Agenda" : "Agenda";

  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false);
  const changeLoadingVisible = (bool) => {
    setIsLoadingScreenOpen(bool);
  };

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

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
    setLoading(true);
    // setIsLoadingScreenOpen(true);
    const getData = async () => {
      const eventsCol = query(
        collection(db, "events: " + authentication.currentUser.uid),
        orderBy("startDateTime")
      );

      onSnapshot(eventsCol, (snapshot) => {
        let tempOngoing = [];
        let tempUpcoming = [];
        let tempPast = [];

        snapshot.docs.forEach((doc) => {
          const docStartTime = convertTime12to24(doc.data().startTime);
          const docEndTime = convertTime12to24(doc.data().endTime);
          const docStartDate = doc.data().startDate;
          const docEndDate = doc.data().endDate;

          if (docStartDate === dateSelected) {
            if (docStartDate < dateNow) {
              tempPast.push(doc.data());
            } else if (docStartDate > dateNow) {
              tempUpcoming.push(doc.data());
            } else if (docStartDate === dateNow) {
              if (
                docEndDate > dateSelected &&
                dateSelected === dateNow &&
                docStartTime <= convertTime12to24(moment().format("h:mm A"))
              ) {
                tempOngoing.push(doc.data());
              } else if (
                docEndTime < convertTime12to24(moment().format("h:mm A")) &&
                docEndDate === dateSelected
              ) {
                tempPast.push(doc.data());
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
          } else if (docEndDate === dateSelected && dateSelected > dateNow) {
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
        setPastEvents(tempPast);
      });
    };
    getData();
    setLoading(false);
  }, [dateSelected, isFocused]);

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
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              alignContent: "center",
              width: width - 40,
            }}
          >
            <View style={styles.dateNumContainer}>
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>{dayNum}</Text>
              <Text style={{ lineHeight: 13 }}>
                {moment(props.date).format("ddd")}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                width: 200,

                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>

          <View style={{ height: 320 }}>
            <ScrollView
              contentContainerStyle={{
                width: width - 30,
                paddingBottom: 100,
              }}
            >
              {ongoingEvents.length != 0 ? (
                <Text style={styles.onGoing}>Ongoing</Text>
              ) : (
                <Text></Text>
              )}
              {ongoingEvents.map((item, index) => {
                return <Events.OngoingEvent item={item} key={index} />;
              })}

              {dateSelected >= dateNow ? (
                <Text style={styles.onGoing}>Upcoming</Text>
              ) : (
                <View></View>
              )}
              {upcomingEvents.length != 0 ? (
                upcomingEvents.map((item, index) => {
                  return <Events.UpcomingEvent item={item} key={index} />;
                })
              ) : dateSelected >= dateNow ? (
                <Text
                  style={{
                    marginBottom: 20,
                    marginLeft: 10,
                    fontStyle: "italic",
                  }}
                >
                  You have no upcoming events
                </Text>
              ) : (
                <View></View>
              )}

              {dateSelected <= dateNow ? (
                <Text style={styles.onGoing}>Past</Text>
              ) : (
                <View></View>
              )}
              {pastEvents.length != 0 ? (
                pastEvents.map((item, index) => {
                  return <Events.PastEvent item={item} key={index} />;
                })
              ) : dateSelected <= dateNow && pastEvents.length == 0 ? (
                <Text
                  style={{
                    marginBottom: 20,
                    marginLeft: 10,
                    fontStyle: "italic",
                  }}
                >
                  You have no past events
                </Text>
              ) : (
                <View></View>
              )}
            </ScrollView>
          </View>
          <Modal visible={isLoadingScreenOpen}>
            <LoadingScreen
              changeLoadingVisible={changeLoadingVisible}
              timeout={false}
            />
          </Modal>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    letterSpacing: -1,
    fontWeight: "bold",
    marginBottom: 15,
  },
  onGoing: {
    fontWeight: "500",
    color: "gray",
    marginBottom: 10,
    marginLeft: 5,
  },
  dateNumContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AgendaView;

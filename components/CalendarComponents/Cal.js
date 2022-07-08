import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarList, Calendar } from "react-native-calendars";
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
import moment from "moment";
const { height, width } = Dimensions.get("window");

const Cal = (props) => {
  const changeSelectedDate = (date) => {
    props.updateData(date);
  };

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const getData = async () => {
      const eventsCol = query(
        collection(db, "events: " + authentication.currentUser.uid)
      );
      const eventsSnashot = await getDocs(eventsCol);
      const tempArray = {};
      eventsSnashot.forEach((doc) => {
        const { startDate } = doc.data();
        const date = moment(new Date(startDate)).format("YYYY-MM-DD");
        tempArray[date] = {
          marked: true,
        };
      });
      setMarkedDates(tempArray);
    };
    getData();
  }, []);

  return (
    <View style={{ marginTop: 10, height: 320, marginBottom: 15 }}>
      <Calendar
        calendarWidth={width}
        markedDates={markedDates}
        markingType={"dot"}
        onDayPress={(day) => changeSelectedDate(day.dateString)}
        enableSwipeMonths={true}
        style={{
          height: 100,
          width: width - 40,
        }}
        theme={{
          selectedDayTextColor: "blue",
          selectedDayBackgroundColor: "blue",
          textDayHeaderFontSize: 12,
          "stylesheet.calendar.header": {
            monthText: {
              fontSize: 16,
              fontWeight: "bold",
              margin: 10,
            },
            week: {
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
          "stylesheet.calendar.day.basic": {
            text: {
              color: "blue",
            },
          },
          "stylesheet.calendar": {
            container: {
              paddingLeft: 5,
              paddingRight: 5,
              backgroundColor: "red",
            },
          },
        }}
      />
    </View>
  );
};

export default Cal;

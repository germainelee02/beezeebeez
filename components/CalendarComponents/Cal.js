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
  onSnapshot,
} from "firebase/firestore";
import { db, authentication } from "../../firebase/firebase-config";
import moment from "moment";
const { height, width } = Dimensions.get("window");

const Cal = (props) => {
  const changeSelectedDate = (date) => {
    props.updateData(date);
    setSelectedDate(date);
  };

  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD MMMM YYYY")
  );
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    // gets data to mark dates on the calendar
    const getData = async () => {
      const eventsCol = query(
        collection(db, "events: " + authentication.currentUser.uid)
      );

      onSnapshot(eventsCol, (snapshot) => {
        const tempArray = {};
        snapshot.docs.forEach((doc) => {
          const { startDate, endDate } = doc.data();
          const sdate = moment(startDate).format("YYYY-MM-DD");
          const edate = moment(endDate).format("YYYY-MM-DD");
          // for (
          //   let i = moment(sdate);
          //   i <= moment(edate);
          //   i = moment(new Date(i)).add(1, "days")
          // ) {
          //   i = moment(i).format("YYYY-MM-DD");
          //   tempArray[i] = {
          //     marked: true,
          //   };
          // }
          let curr = startDate;
          while (curr <= endDate) {
            let fCurr = moment(new Date(curr)).format("YYYY-MM-DD");
            tempArray[fCurr] = {
              marked: true,
            };
            curr = moment(curr).add(1, "day").format("DD MMMM YYYY");
          }
        });
        setMarkedDates(tempArray);
      });
    };
    getData();
  }, [selectedDate]);

  return (
    <View style={{ marginTop: 10, height: 320, marginBottom: 15 }}>
      <Calendar
        calendarWidth={width}
        markedDates={markedDates}
        markingType={"period"}
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

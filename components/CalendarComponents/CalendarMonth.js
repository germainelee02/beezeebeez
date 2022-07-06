import { View, Text } from "react-native";
import React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import dateFns from "date-fns";

const CalendarMonth = () => {
  return (
    <View>
      <Calendar style={{ height: 400, width: 400 }} theme={{}} />
    </View>
  );
};

export default CalendarMonth;

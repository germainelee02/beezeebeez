import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventModal from "./EventModal";
import moment from "moment";
const { height, width } = Dimensions.get("window");

const OngoingEvent = ({
  title,
  startTime,
  endTime,
  notes,
  endDate,
  startDate,
  key,
  item,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  const [isOneDay, setIsOneDay] = useState(true);

  useEffect(() => {
    const end = moment(endDate);
    const start = moment(startDate).format("YYYYMMDD");
    const diff = end.diff(start, "days");
    if (diff > 0) {
      setIsOneDay(false);
    }
  }, []);

  const timeText = isOneDay
    ? `${startTime} - ${endTime}`
    : startDate == moment().format("DD MMMM YYYY")
    ? `${startTime} - ${endDate}, ${endTime}`
    : `${startDate}, ${startTime} - ${endDate}, ${endTime}`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeModalVisible(true)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.time}>{timeText}</Text>
        <Text style={styles.title}>{title}</Text>
        {notes ? (
          <Text style={styles.notes}>
            {notes.length > 30 ? notes.substring(0, 30) + "....." : notes}{" "}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <Modal visible={isModalVisible} transparent={true}>
        <EventModal
          changeModalVisible={changeModalVisible}
          title={title}
          notes={notes}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          endDate={endDate}
          key={key}
          item={item}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5e8bb",
    width: width - 50,
    height: 80,
    marginBottom: 15,
    justifyContent: "center",
    // paddingLeft: 18,
    // paddingRight: 18,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    paddingBottom: 5,
  },
  notes: {
    color: "grey",
  },
  time: {
    fontSize: 12,
    paddingBottom: 5,
  },
  startTime: {
    fontSize: 13,
    paddingBottom: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  timeContainer: {
    justifyContent: "center",
    width: 45,
    height: 50,
    alignContent: "center",
    marginLeft: 15,
    marginTop: 5,
  },
});

export default OngoingEvent;

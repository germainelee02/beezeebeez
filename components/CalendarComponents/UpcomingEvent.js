import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventModal from "./EventModal";
const { height, width } = Dimensions.get("window");

const UpcomingEvent = ({
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

  return (
    <TouchableOpacity onPress={() => changeModalVisible(true)}>
      <View style={styles.container}>
        <Text style={styles.startTime}>{startTime}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Modal visible={isModalVisible} transparent={true}>
        <EventModal
          changeModalVisible={changeModalVisible}
          item={item}
          title={title}
          notes={notes}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          endDate={endDate}
          key={key}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5EFDB",
    height: 35,
    borderRadius: 25,
    width: width - 50,
    alignItems: "center",
    height: 35,
    marginBottom: 10,
    alignSelf: "center",
  },
  startTime: {
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
  },
});
export default UpcomingEvent;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import EventModal from "./EventModal";
const { height, width } = Dimensions.get("window");

const PastEvent = ({ item }) => {
  const title = item.title;
  const startTime = item.startTime;
  const startDate = item.startDate;
  const endTime = item.endTime;
  const endDate = item.endDate;
  const notes = item.notes;
  const key = item.id;

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
    width: width - 50,
    alignItems: "center",
    height: 35,
    marginBottom: 10,
    backgroundColor: "#dedcd5",
    borderRadius: 25,
    alignSelf: "center",
  },
  startTime: {
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
  },
});
export default PastEvent;

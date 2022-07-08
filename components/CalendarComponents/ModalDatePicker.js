import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Months } from "../../configs/Months";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const ModalDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    // setShow(false);
  };

  const close = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    props.updateDate(moment(date).format("DD MMMM YYYY"));
    props.updateTime(moment(date).format("h:mm A"));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const formattedDate = moment(date).format("DD MMMM YYYY, h:mm A");

  return (
    <SafeAreaView>
      <View>
        <View
          style={[
            styles.dateBtnContainer,
            {
              borderColor: props.error ? "red" : "grey",
              alignItems: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setIsFocused(true);
            }}
          >
            <Text>{formattedDate}</Text>
          </TouchableOpacity>
        </View>
        {props.error && (
          <View
            style={{
              height: 20,
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Text style={{ color: "red", fontSize: 12 }}>{props.error}</Text>
          </View>
        )}
        <DateTimePickerModal
          isVisible={show}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display={"inline"}
          is24Hour={true}
          locale="em_GB"
        />
      </View>
    </SafeAreaView>
  );
};

export default ModalDatePicker;
const styles = StyleSheet.create({
  doneBtnContainer: {
    marginLeft: width - 100,
    padding: 10,
  },
  dateBtnContainer: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "red",
    // paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
});

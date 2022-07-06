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

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    // setShow(false);
  };

  const close = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    props.updateData(moment(date).format("DD MMMM YYYY, h:mm A"));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const formattedDate = moment(date).format("DD MMMM YYYY, h:mm A");

  return (
    <SafeAreaView>
      <View>
        <View style={styles.dateBtnContainer}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text>{formattedDate}</Text>
          </TouchableOpacity>
        </View>

        {/* edited */}
        <DateTimePickerModal
          isVisible={show}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display={"inline"}
          is24Hour={true}
          locale="em_GB"
        />

        {/* <View>
          {show && (
            <View
              style={{
                marginTop: height - 450,
                borderRadius: 1,
                borderColor: "black",
              }}
            >
              <View style={styles.doneBtnContainer}>
                <TouchableOpacity onPress={() => close()}>
                  <Text>Done</Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
              />
            </View>
          )}
        </View> */}
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
    borderColor: "gray",
    paddingVertical: 15,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

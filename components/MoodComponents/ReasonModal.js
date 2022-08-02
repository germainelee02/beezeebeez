import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

const ReasonModal = ({ visible, addMarkedDays, closeReModal }) => {
  const [reason, setReason] = useState("");

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => closeReModal(false)}>
                <Entypo name="cross" size={30} color="firebrick" />
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 40 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Why are you feeling this way?
              </Text>
            </View>
            <KeyboardAvoidingView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={300}
            >
              <View style={styles.reason}>
                <TextInput
                  style={{ padding: 10 }}
                  placeholder={"Reason..."}
                  value={reason}
                  onChangeText={(text) => setReason(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  addMarkedDays(reason);
                  setReason("");
                }}
              >
                <AntDesign name="enter" size={20} />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  reason: {
    width: "70%",
    // height: 50,
    justifyContent: "center",
    margin: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gainsboro",
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "orange",
  },
  modal: {
    width: "90%",
    justifyContent: "center",
    marginHorizontal: 100,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gainsboro",
    shadowColor: "gainsboro",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 10, width: 10 },
  },
  feelings: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "orange",
    width: "100%",
    marginBottom: 40,
  },
  eachEmotion: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 75,
    width: 75,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gainsboro",
    shadowColor: "gainsboro",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: { height: 2.5, width: 2.5 },
  },
});

export default ReasonModal;

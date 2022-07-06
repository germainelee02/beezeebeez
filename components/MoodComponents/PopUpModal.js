import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const PopUpModal = ({
  visible,
  happyColour,
  sadColour,
  fearColour,
  disgustColour,
  surpriseColour,
  angryColour,
  closeModal,
  openReasonModal,
  day,
}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <KeyboardAvoidingView style={styles.modalBackground}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => closeModal(false)}>
                <Entypo name="cross" size={30} color="firebrick" />
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 40 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                How are you feeling?
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.feelings}>
              <TouchableOpacity
                onPress={() => openReasonModal(day, happyColour)}
              >
                <View
                  style={[
                    styles.eachEmotion,
                    {
                      backgroundColor: happyColour,
                    },
                  ]}
                >
                  <Text style={styles.emotionText}>Happy</Text>
                  <Text style={styles.emoticon}>😁</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openReasonModal(day, sadColour)}>
                <View
                  style={[
                    styles.eachEmotion,
                    {
                      backgroundColor: sadColour,
                    },
                  ]}
                >
                  <Text style={styles.emotionText}>Sad</Text>
                  <Text style={styles.emoticon}>😞</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openReasonModal(day, fearColour)}
              >
                <View
                  style={[styles.eachEmotion, { backgroundColor: fearColour }]}
                >
                  <Text style={styles.emotionText}>Fearful</Text>
                  <Text style={styles.emoticon}>😨</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.feelings}>
              <TouchableOpacity
                onPress={() => openReasonModal(day, angryColour)}
              >
                <View
                  style={[styles.eachEmotion, { backgroundColor: angryColour }]}
                >
                  <Text style={styles.emotionText}>Angry</Text>
                  <Text style={styles.emoticon}>😡</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openReasonModal(day, disgustColour)}
              >
                <View
                  style={[
                    styles.eachEmotion,
                    { backgroundColor: disgustColour },
                  ]}
                >
                  <Text style={styles.emotionText}>Disgusted</Text>
                  <Text style={styles.emoticon}>🤮</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openReasonModal(day, surpriseColour)}
              >
                <View
                  style={[
                    styles.eachEmotion,
                    { backgroundColor: surpriseColour },
                  ]}
                >
                  <Text style={styles.emotionText}>Surprised</Text>
                  <Text style={styles.emoticon}>😯</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  emotionText: {
    fontSize: 15.5,
    color: "darkslategrey",
  },
  emoticon: {
    fontSize: 25,
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

export default PopUpModal;

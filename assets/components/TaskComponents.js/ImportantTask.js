import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const ImportantTask = ({
  text,
  deleteImportantTask,
  unpinTask,
  index,
  toggleImportantTask,
  complete,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {/* <View style={styles.square}></View> */}
        <AntDesign style={styles.pin} name="pushpino" size={20} />
        {complete ? (
          <Text style={styles.itemCompletedText}>{text}</Text>
        ) : (
          <Text style={styles.itemText}>{text}</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => toggleImportantTask(index)}>
          {complete ? (
            <Ionicons name="checkmark-done" size={23} />
          ) : (
            <Ionicons name="checkmark" size={23} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => unpinTask(index)}>
          <AntDesign name="star" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteImportantTask(index)}>
          <EvilIcons name="trash" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 5,
  },
  item: {
    backgroundColor: "rgb(251, 194, 8)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "80%",
  },
  itemCompletedText: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
  },
  pin: {
    marginRight: 15,
  },
});

export default ImportantTask;

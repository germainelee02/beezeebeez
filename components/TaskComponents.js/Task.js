import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const Task = ({ text, deleteTask, pinTask, index, complete, toggleTask }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        {complete ? (
          <Text style={styles.itemCompleted}>{text}</Text>
        ) : (
          <Text style={styles.itemText}>{text}</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => toggleTask(index)}>
          {complete ? (
            <Ionicons name="checkmark-done" size={23} />
          ) : (
            <Ionicons name="checkmark" size={23} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pinTask(index)}>
          <AntDesign name="staro" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
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
    backgroundColor: "rgba(245, 233, 188, 1)",
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
  itemCompleted: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "grey",
    opacity: 0.2,
    borderRadius: 5,
    marginRight: 15,
  },
});

export default Task;

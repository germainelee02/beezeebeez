import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OptionsIcon = ({ groupId, friend, enterOptions }) => {
  return (
    <TouchableOpacity onPress={() => enterOptions(groupId, friend)}>
      <SimpleLineIcons name="options" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default OptionsIcon;

const styles = StyleSheet.create({});

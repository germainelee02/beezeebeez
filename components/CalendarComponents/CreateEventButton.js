import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateEventButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEventButton;

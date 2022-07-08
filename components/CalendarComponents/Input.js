import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const Input = ({ label, error, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ height: 100 }}>
      <View
        style={{
          marginBottom: 20,
          height: 65,
        }}
      >
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: error ? "red" : isFocused ? "black" : "gray",
              alignItems: "center",
            },
          ]}
        >
          <View>
            <TextInput
              autoCorrect={false}
              onFocus={() => {
                onFocus();
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              selectionColor={"#f5e8bb"}
              style={styles.inputText}
              {...props}
            />
          </View>
        </View>
        {error && (
          <View
            style={{
              height: 20,
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    height: 50,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 0.5,
    // paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    tintColor: "gray",
    height: 17,
    width: 17,
  },
  inputText: {
    height: 35,
    width: 305,
    paddingLeft: 10,
  },
});
export default Input;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    Keyboard.dismiss();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent!");
        setEmail("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.background}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/bee/resetpasswordbee.png")}
          />
          <TextInput
            placeholder="Enter your email here"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.emailBox}
          />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => resetPassword()}
          >
            <Text style={styles.resetText}>Reset!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 150,
  },
  resetText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailBox: {
    height: 70,
    width: "95%",
    backgroundColor: "rgba(245, 233, 188, 1)",
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    shadowColor: "gainsboro",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 10, width: 10 },
    borderColor: "gainsboro",
  },
  image: {
    height: "20%",
    width: "40%",
    resizeMode: "contain",
    margin: 50,
  },
  resetButton: {
    width: "50%",
    height: 70,
    backgroundColor: "rgb(251, 194, 8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    margin: 20,
    shadowColor: "gainsboro",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 10, width: 10 },
    borderColor: "gainsboro",
  },
});

export default ResetPasswordScreen;

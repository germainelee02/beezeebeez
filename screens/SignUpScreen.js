import React, { useState } from "react";
import {
  Alert,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

function SignUpScreen(props) {
  // the email that is saved and used to log in
  const [email, setEmail] = useState("");

  // the password that comes with the email
  const [password, setPassword] = useState("");

  // asking users to enter password a second time to check if it matches with the password typed in the second time
  const [repassword, setRepassword] = useState("");

  const [canSeePass, setCanSeePass] = useState(true);

  const [iconPass, setIconPass] = useState("eye");

  const [canSeeRepass, setCanSeeRepass] = useState(true);

  const [iconRepass, setIconRepass] = useState("eye");

  const onPassIconPress = () => {
    let iconName = canSeePass ? "eye-off" : "eye";
    setCanSeePass(!canSeePass);
    setIconPass(iconName);
  };

  const onRepassIconPress = () => {
    let iconName = canSeeRepass ? "eye-off" : "eye";
    setCanSeeRepass(!canSeeRepass);
    setIconRepass(iconName);
  };
  // function that uses firebase to sign up for an account
  const handleSignUp = () => {
    if (password == repassword) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
        })
        .catch((error) => alert(error.message));
    } else {
      Alert.alert("Error", "Password mismatch");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={useHeaderHeight()}
        style={styles.background}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/bee/bees.png")}
        />
        <TextInput
          placeholder="Email..."
          // when the user types in, it changes the `email` state at the top
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          style={styles.emailBox}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password..."
            secureTextEntry={canSeePass}
            // when user types in the password, it changes `password` state at the top
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            style={styles.passwordText}
          />

          <TouchableOpacity onPress={() => onPassIconPress()}>
            <MaterialCommunityIcons name={iconPass} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Re-enter password..."
            // changes `repassword` state at the top when user types in repassword
            secureTextEntry={canSeeRepass}
            autoCapitalize="none"
            onChangeText={(text) => setRepassword(text)}
            style={styles.passwordText}
          />

          <TouchableOpacity onPress={() => onRepassIconPress()}>
            <MaterialCommunityIcons name={iconRepass} size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          // when button is pressed, signs up
          onPress={() => handleSignUp()}
        >
          <Text style={styles.loginText}> Sign up! </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(245, 233, 188, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emailBox: {
    height: 70,
    width: "95%",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    height: "35%",
    width: "40%",
    margin: 0,
    resizeMode: "contain",
  },
  loginButton: {
    width: "50%",
    height: 70,
    backgroundColor: "rgb(251, 194, 8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    margin: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 70,
    width: "95%",
  },
  passwordText: {
    flex: 1,
  },
});

export default SignUpScreen;

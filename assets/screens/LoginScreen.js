import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authentication } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSee, setCanSee] = useState(true);
  const [icon, setIcon] = useState("eye");

  // logs in to the homescreen when the authentication state is changed (log in or sign up)
  // not really sure how this works..
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("temp home");
      }
    });
    return unsubscribe;
  }, []);

  // handles log in with firebase
  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  const onIconPress = () => {
    let iconName = canSee ? "eye-off" : "eye";
    setCanSee(!canSee);
    setIcon(iconName);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={styles.signUpText}> Sign Up </Text>
        </TouchableOpacity>

        <Image
          style={styles.image}
          source={require("../images/bee/bees.png")}
        />
        <TextInput
          placeholder="Email..."
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.emailBox}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password..."
            secureTextEntry={canSee}
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            autoCapitalize="none"
            style={styles.passwordText}
          />

          <TouchableOpacity onPress={() => onIconPress()}>
            <MaterialCommunityIcons name={icon} size={25} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.loginText}> Login </Text>
        </TouchableOpacity>

        {/* remove this after done */}
        <Button
          title="direct shortcut to home page (delete this after done)"
          onPress={() => navigation.navigate("temp home")}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

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
    padding: 10,
    borderRadius: 15,
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
  signUpText: {
    textDecorationLine: "underline",
    fontSize: 18,
  },
  signUp: {
    position: "absolute",
    top: 85,
    right: 30,
  },
});

export default LoginScreen;

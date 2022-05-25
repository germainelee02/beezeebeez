import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Alert } from "react-native-web";
import { authentication } from "../../firebase/firebase-config";

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("login");
      })
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        hello
        <Text style={styles.emailInfo}>
          {" "}
          {authentication.currentUser?.email}!{" "}
        </Text>
        this is the temporary homscreen. here's the logout button below{" "}
      </Text>
      <TouchableOpacity style={styles.logout} onPress={() => handleSignOut()}>
        <Text style={styles.logoutText}>Log out!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 233, 188, 1)",
  },
  emailInfo: {
    color: "indigo",
  },
  info: {
    textAlign: "center",
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(251, 194, 8)",
    margin: 15,
    width: "25%",
    height: 50,
    borderRadius: 50,
  },
  logoutText: {
    fontWeight: "bold",
  },
});

export default HomeScreen;

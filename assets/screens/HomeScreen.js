import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Alert } from "react-native-web";
import { authentication } from "../../firebase/firebase-config";
import { StatusBar } from "expo-status-bar";
import * as Components from "../components/homeComponents/index";
import moment from "moment";
const { height, width } = Dimensions.get("screen");

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
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <View style={{ marginBottom: 20 }}>
        <ScrollView style={{ height: "100%" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {/* pass in user's name here */}
                <Components.WelcomeHeader
                  name={"Bernice"}
                  style={styles.WelcomeHeaderContainer}
                />
              </View>
              <Image
                source={require("../images/bee/beeside.png")}
                resizeMode="contain"
                style={{
                  height: 140,
                  width: 140,
                  marginLeft: 70,
                  marginRight: 10,
                }}
              />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {moment().format("dddd")}, {moment().format("ll")}
              </Text>
            </View>

            <View>
              <Components.FavouriteGroups
                style={styles.FavouriteGroupsContainer}
              />
            </View>

            <View>
              <Components.EventsToday style={styles.EventsTodayContainer} />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Components.ExpensesToday
                amountSpentToday={30}
                budgetToday={40}
                style={styles.ExpensesTodayContainer}
              />
              <Components.ToDosToday
                style={styles.ToDosTodayContainer}
                numberPending={3}
                numberCompleted={4}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.logout}
              onPress={() => handleSignOut()}
            >
              <Text style={styles.logoutText}>Log out!</Text>
            </TouchableOpacity>
          </View>

          {/* empty view to pad scrollview and tab bar */}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    marginTop: 10,
    width: width - 40,
  },
  dateText: {
    fontSize: 16,
    textAlign: "left",
  },
  WelcomeHeaderContainer: {
    textAlign: "left",
    marginTop: 50,
    flex: 1,
    width: "100%",
  },
  tasksPendingContainer: {
    flex: 1,
    width: "90%",
  },
  FavouriteGroupsContainer: {
    marginTop: 20,
    height: 200,
    width: width - 40,
  },
  EventsTodayContainer: {
    marginTop: 20,
  },
  ExpensesTodayContainer: {
    marginRight: 18,
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(251, 194, 8)",
    margin: 15,
    width: "25%",
    height: 50,
    borderRadius: 50,
    marginTop: 50,
  },
  logoutText: {
    fontWeight: "bold",
  },
});

export default HomeScreen;

import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Components from "../components/homeComponents/index";
import moment from "moment";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { db, authentication } from "../firebase/firebase-config";
import { Auth, getAuth } from "firebase/auth";
import { userConverter } from "../configs/User";
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

  const [completedCount, setCompletedCount] = useState(0);

  const [pendingCount, setPendingCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [todaysSpending, setTodaysSpending] = useState(0);

  const [userName, setUserName] = useState("");

  const month = moment().format("M");
  const year = moment().format("YYYY");
  const date = moment().format("D");

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const getData = async () => {
    try {
      setLoading(true);

      //querying user's info
      const usersDocRef = doc(
        db,
        "users",
        getAuth().currentUser.uid
      ).withConverter(userConverter);
      const userRefSnap = await getDoc(usersDocRef);
      if (userRefSnap.exists()) {
        const user = userRefSnap.data();
        setUserName(user.fName);
      }

      // querying the todo list
      const todoCol = query(
        collection(db, "to do: " + authentication.currentUser.uid)
      );
      const todoSnapshot = await getDocs(todoCol);
      let tempCompleted = 0;
      let tempPending = 0;
      todoSnapshot.forEach((doc) => {
        const { complete } = doc.data();
        if (complete) {
          tempCompleted++;
        } else if (!complete) {
          tempPending++;
        }
      });
      setLoading(false);
      setCompletedCount(tempCompleted);
      setPendingCount(tempPending);

      // querying the expense tracker
      let spending = 0.0;
      const q = query(
        collection(db, "expenses: " + authentication.currentUser.uid),
        where("dates", "==", date.toString()),
        where("months", "==", month.toString()),
        where("years", "==", year.toString())
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { expense, expenseType } = doc.data();
        if (expenseType == "add") {
          spending = spending + Number(expense);
        } else {
          spending = spending - Number(expense);
        }
      });
      setTodaysSpending(spending);
    } catch (e) {
      console.log(e);
    }
  };

  // immediately queries from firestore when screen renders
  // screen re-renders everytime the refresh boolean is changed
  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar style="auto" />
      <View
        style={{
          marginBottom: 20,
        }}
      >
        {/* if data is still being queries, then show the loading symbol
        if data is done, then show the scrollview */}
        {loading ? (
          <View
            style={{
              position: "absolute",
              marginLeft: width / 2 - 15,
              marginTop: height / 2 - 60,
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <ScrollView style={{ height: "100%" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", width: width - 40 }}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {/* pass in user's name here */}
                  <Components.WelcomeHeader
                    name={userName}
                    style={styles.WelcomeHeaderContainer}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    width: 200,
                  }}
                >
                  <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                      <Image
                        source={require("../assets/icons/menuRight.png")}
                        style={{ tintColor: "gray" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => refreshPage()}>
                    <Image
                      source={require("../assets/images/bee/beeside.png")}
                      resizeMode="contain"
                      style={styles.beeContainer}
                    />
                  </TouchableOpacity>
                </View>
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
                  amountSpentToday={todaysSpending}
                  budgetToday={40}
                  style={styles.ExpensesTodayContainer}
                />
                <Components.ToDosToday
                  style={styles.ToDosTodayContainer}
                  numberPending={pendingCount}
                  numberCompleted={completedCount}
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
        )}
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
  dateText: {
    fontSize: 16,
    textAlign: "left",
  },
  menuContainer: {
    alignItems: "flex-end",
    marginRight: 0,
  },
  WelcomeHeaderContainer: {
    textAlign: "left",
    marginTop: 70,
    flex: 1,
    height: 120,
  },
  FavouriteGroupsContainer: {
    marginTop: 0,
    height: 200,
    width: width - 40,
  },
  EventsTodayContainer: {
    marginTop: 20,
  },
  ExpensesTodayContainer: {
    marginRight: 18,
  },
  ToDosTodayContainer: {},
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
  beeContainer: {
    height: 140,
    width: 140,
    marginLeft: 30,
    marginRight: 20,
    marginTop: 5,
  },
});

export default HomeScreen;

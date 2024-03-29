import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  // ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { db, authentication } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";
import RNSelectPicker from "react-native-picker-select";
import Expense from "../components/ExpenseComponents/Expense";
import moment from "moment";

const ExpenseTrackerScreen = ({ navigation }) => {
  const todaysyear = moment().format("YYYY");

  const [expense, setExpense] = useState("");

  // possible expenseType = "add", "minus"
  const [expenseType, setExpenseType] = useState("add");

  const [allExpenses, setAllExpenses] = useState([]);

  const [dates, setDates] = useState("");

  const [months, setMonths] = useState("");

  const [years, setYears] = useState(todaysyear);

  const [reason, setReason] = useState("");

  const [balance, setBalance] = useState(0);

  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(false);

  // possible viewType = "all", "inflow", "outflow"
  const [viewType, setViewType] = useState("all");

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getData = async () => {
      let expenseCol = query(
        collection(db, "expenses: " + authentication.currentUser.uid),
        orderBy("timeSent", "desc")
      );

      if (viewType == "inflow") {
        expenseCol = query(
          collection(db, "expenses: " + authentication.currentUser.uid),
          where("expenseType", "==", "add")
        );
      }
      if (viewType == "outflow") {
        expenseCol = query(
          collection(db, "expenses: " + authentication.currentUser.uid),
          where("expenseType", "==", "minus")
        );
      }

      const expenseSnapshot = await getDocs(expenseCol);
      let tempArray = [];
      expenseSnapshot.forEach((doc) => {
        tempArray.push(doc.data());
      });
      setAllExpenses(tempArray);
      setLoading(false);
      calculateBalance();
    };

    const calculateBalance = () => {
      let tempNum = 0.0;
      for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].expenseType == "add") {
          tempNum = tempNum + Number(allExpenses[i].expense);
        } else {
          tempNum = tempNum - Number(allExpenses[i].expense);
        }
      }
      setBalance(tempNum);
    };
    getData();
  }, [balance, refresh, viewType, loading]);

  const deleteItem = async (index) => {
    const item = allExpenses[index];
    await deleteDoc(
      doc(db, "expenses: " + authentication.currentUser.uid, item.id)
    );
    onRefresh();
  };

  const sendData = async () => {
    Keyboard.dismiss();
    if (dates && months && years && expense && reason) {
      const docRef = await addDoc(
        collection(db, "expenses: " + authentication.currentUser.uid),
        {
          expense: expense,
          expenseType: expenseType,
          dates: dates,
          months: months,
          years: years,
          timeSent: serverTimestamp(),
          reason: reason,
        }
      );

      updateDoc(docRef, { id: docRef.id });
      setExpense("");
      setExpenseType("add");
      setReason("");
      onRefresh();
    }
  };

  // all the available dates in
  let date = [];
  for (let i = 1; i < 32; i++) {
    date.push({ label: i.toString(), value: i.toString() });
  }

  const monthInWords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = [];
  for (let i = 1; i < 13; i++) {
    month.push({ label: monthInWords[i - 1], value: i.toString() });
  }

  const addOrSubtract = () => {
    if (expenseType == "add") {
      setExpenseType("minus");
    } else {
      setExpenseType("add");
    }
  };

  const HandleOutsideTouches = () => {
    Keyboard.dismiss();
    return false;
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView
        style={styles.handleOutside}
        onStartShouldSetResponder={() => HandleOutsideTouches()}
      >
        <View style={styles.container}>
          <View style={styles.expensesWrapper}>
            <View style={styles.balanceWrapper}>
              <Text style={styles.sectionTitle}>Cash Flows</Text>
              <View style={styles.viewButton}>
                <RNSelectPicker
                  onValueChange={(value) => setViewType(value)}
                  items={[
                    { label: "Inflows", value: "inflow" },
                    { label: "Outflows", value: "outflow" },
                  ]}
                  placeholder={{ label: "All", value: "all" }}
                  style={{ placeholder: { color: "black" } }}
                />
              </View>
              <TouchableOpacity
                style={styles.monthButton}
                onPress={() => navigation.navigate("monthly expenses")}
              >
                <Text style={{ maxWidth: "80%", textAlign: "center" }}>
                  View by Month
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.balanceWrapper}>
              {balance >= 0 ? (
                <Text style={styles.balanceText}>
                  Current Balance: ${Number(balance).toFixed(2).toString()}
                </Text>
              ) : (
                <Text style={styles.balanceText}>
                  Current Balance: -${Number(-balance).toFixed(2).toString()}
                </Text>
              )}
            </View>

            <ScrollView style={styles.items}>
              {allExpenses.map((item, index) => {
                return (
                  <Expense
                    date={item.dates}
                    month={item.months}
                    year={item.years}
                    expense={item.expense}
                    expenseType={item.expenseType}
                    reason={item.reason}
                    key={index}
                    index={index}
                    deleteItem={deleteItem}
                  />
                );
              })}
            </ScrollView>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={styles.writeExpenseWrapper}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => addOrSubtract()}>
                  {expenseType == "add" ? (
                    <FontAwesome
                      name="plus"
                      size={20}
                      color={"rgb(251, 194, 8)"}
                    />
                  ) : (
                    <FontAwesome
                      name="minus"
                      size={20}
                      color={"rgb(251, 194, 8)"}
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.inputExpense}
                  keyboardType="numeric"
                  placeholder={"Add expense"}
                  value={expense}
                  onChangeText={(num) => setExpense(num)}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder={"Reason for expense"}
                value={reason}
                onChangeText={(text) => setReason(text)}
                autoCorrect={false}
              />
              <View style={styles.selectionWrapper}>
                <View style={styles.date}>
                  <RNSelectPicker
                    onValueChange={(value) => setDates(value)}
                    items={date}
                    placeholder={{ label: "Date", value: "" }}
                  />
                </View>
                <Text>/</Text>
                <View style={styles.date}>
                  <RNSelectPicker
                    onValueChange={(value) => setMonths(value)}
                    items={month}
                    placeholder={{ label: "Month", value: "" }}
                  />
                </View>
                <Text>/</Text>
                <TextInput
                  style={styles.year}
                  keyboardType="number-pad"
                  placeholder={todaysyear}
                  value={years}
                  onChangeText={(num) => setYears(num)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => sendData()}
              onLongPress={() => addOrSubtract()}
            >
              <View>
                <Image
                  source={require("../assets/images/bee/bee-left.png")}
                  resizeMode="contain"
                  style={styles.addWrapper}
                />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  balanceText: {
    fontSize: 17,
  },
  balanceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 50,
  },
  date: {
    backgroundColor: "white",
    width: 72,
    height: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 5,
  },
  year: {
    width: 72,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
  },
  handleOutside: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  items: {
    marginTop: 10,
    marginBottom: 280,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  expensesWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  loading: {
    position: "absolute",
    marginLeft: "42.5%",
    marginTop: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  writeExpenseWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    paddingVertical: 5,
    width: 250,
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 2,
  },
  inputExpense: {
    paddingVertical: 5,
    width: 225,
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 2,
  },
  selectionWrapper: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addWrapper: {
    width: 60,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "rgba(245, 233, 188, 1)",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  monthButton: {
    backgroundColor: "rgb(251, 194, 8)",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default ExpenseTrackerScreen;

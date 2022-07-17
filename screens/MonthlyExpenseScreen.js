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
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { db, authentication } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import RNSelectPicker from "react-native-picker-select";
import Expense from "../components/ExpenseComponents/Expense";
import moment from "moment";

const MonthlyExpenseScreen = ({ navigation }) => {
  const [allExpenses, setAllExpenses] = useState([]);

  const todaysmonth = moment().format("M");

  const todaysyear = moment().format("YYYY");

  const [months, setMonths] = useState(todaysmonth);

  const [years, setYears] = useState(todaysyear);

  const [balance, setBalance] = useState(0);

  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(false);

  // possible viewTypes: "all", "inflow", "outflow"
  const [viewType, setViewType] = useState("all");

  const deleteItem = async (index) => {
    const item = allExpenses[index];
    await deleteDoc(
      doc(db, "expenses: " + authentication.currentUser.uid, item.id)
    );
    searchMonth();
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

  useEffect(() => {
    searchMonth();
  }, [refresh, viewType]);

  const searchMonth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let q = query(
      collection(db, "expenses: " + authentication.currentUser.uid),
      where("months", "==", months),
      where("years", "==", years)
    );

    if (viewType == "inflow") {
      q = query(
        collection(db, "expenses: " + authentication.currentUser.uid),
        where("expenseType", "==", "add")
      );
    }
    if (viewType == "outflow") {
      q = query(
        collection(db, "expenses: " + authentication.currentUser.uid),
        where("expenseType", "==", "minus")
      );
    }

    const querySnapshot = await getDocs(q);
    let tempArray = [];
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setAllExpenses(tempArray);
    setLoading(false);
    calculateBalance();
  };

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

  const HandleOutsideTouches = () => {
    Keyboard.dismiss();
    return false;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView
        style={styles.handleOutside}
        onStartShouldSetResponder={() => HandleOutsideTouches()}
      >
        <View style={styles.container}>
          <View style={styles.expensesWrapper}>
            <View style={styles.balanceWrapper}>
              <Text style={styles.sectionTitle}>Monthly Cash Flows</Text>
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

              <TouchableOpacity
                onPress={() => {
                  refresh ? setRefresh(false) : setRefresh(true);
                }}
              >
                <EvilIcons name="refresh" size={32} color={"cornflowerblue"} />
              </TouchableOpacity>
            </View>
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <ScrollView style={styles.items}>
                {allExpenses.map((item, index) => {
                  return (
                    <Expense
                      date={item.dates}
                      month={item.months}
                      year={item.years}
                      expense={item.expense}
                      reason={item.reason}
                      key={index}
                      index={index}
                      expenseType={item.expenseType}
                      deleteItem={deleteItem}
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={useHeaderHeight()}
            style={styles.writeExpenseWrapper}
          >
            <View style={styles.selectionWrapper}>
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

            <TouchableOpacity onPress={() => searchMonth()}>
              <View>
                {/* <View style={styles.addWrapper}>
                  <Text style={{ color: "grey" }}>Search</Text>
                </View> */}
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
    </View>
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
  },
  date: {
    backgroundColor: "white",
    width: 110,
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 5,
  },
  year: {
    width: 110,
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
    flex: 1,
  },
  items: {
    marginTop: 30,
    marginBottom: 170,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  expensesWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  writeExpenseWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 2,
  },
  loading: {
    position: "absolute",
    marginLeft: "42.5%",
    marginTop: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectionWrapper: {
    width: 250,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
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
  addWrapper: {
    width: 60,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MonthlyExpenseScreen;

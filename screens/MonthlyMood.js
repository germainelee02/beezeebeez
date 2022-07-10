import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import moment from "moment";
import RNSelectPicker from "react-native-picker-select";
import { db, authentication } from "../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import MoodLegend from "../components/MoodComponents/MoodLegend";

const MonthlyMood = () => {
  const todaysmonth = moment().format("M");
  const todaysyear = moment().format("YYYY");

  const [currentMonth, setCurrentMonth] = useState(todaysmonth);

  const [currentYear, setCurrentYear] = useState(todaysyear);

  const [isLoading, setIsLoading] = useState(true);

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
  const happyColour = "lemonchiffon";
  const [happyNum, setHappyNum] = useState(0);

  const sadColour = "powderblue";
  const [sadNum, setSadNum] = useState(0);

  const fearColour = "lavender";
  const [fearNum, setFearNum] = useState(0);

  const angryColour = "lightcoral";
  const [angryNum, setAngryNum] = useState(0);

  const disgustColour = "darkseagreen";
  const [disgustNum, setDisgustNum] = useState(0);

  const surpriseColour = "navajowhite";
  const [surpriseNum, setSurpriseNum] = useState(0);

  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    setIsLoading(true);
    let q = query(
      collection(db, "mood tracker: " + authentication.currentUser.uid),
      where("month", "==", currentMonth),
      where("year", "==", currentYear)
    );
    const querySnapshot = await getDocs(q);
    let happyCount = 0;
    let sadCount = 0;
    let angryCount = 0;
    let disgustCount = 0;
    let fearCount = 0;
    let surpriseCount = 0;
    querySnapshot.forEach((doc) => {
      const { colour } = doc.data();
      if (colour == happyColour) {
        happyCount++;
      } else if (colour == sadColour) {
        sadCount++;
      } else if (colour == angryColour) {
        angryCount++;
      } else if (colour == disgustColour) {
        disgustCount++;
      } else if (colour == fearColour) {
        fearCount++;
      } else {
        surpriseCount++;
      }
    });
    setHappyNum(happyCount);
    setSadNum(sadCount);
    setAngryNum(angryCount);
    setDisgustNum(disgustCount);
    setFearNum(fearCount);
    setSurpriseNum(surpriseCount);
    setIsLoading(false);
  };

  const pieData = [
    {
      name: "Happy",
      number: happyNum,
      color: happyColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sad",
      number: sadNum,
      color: sadColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fearful",
      number: fearNum,
      color: fearColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Angry",
      number: angryNum,
      color: angryColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Disgusted",
      number: disgustNum,
      color: disgustColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Surprised",
      number: surpriseNum,
      color: surpriseColour,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Mood summary for {monthInWords[currentMonth - 1]}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingLeft: 165,
              }}
            >
              <View style={{ height: 80, width: 175, paddingBottom: 30 }}>
                <MoodLegend
                  happyColour={happyColour}
                  sadColour={sadColour}
                  angryColour={angryColour}
                  fearColour={fearColour}
                  disgustColour={disgustColour}
                  surpriseColour={surpriseColour}
                />
              </View>
              {isLoading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: Dimensions.get("window").height / 3,
                    width: Dimensions.get("window").width,
                    // backgroundColor: "pink",
                    paddingRight: 160,
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              ) : (
                <PieChart
                  data={pieData}
                  width={Dimensions.get("window").width}
                  height={Dimensions.get("window").height / 3}
                  chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  accessor="number"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  avoidFalseZero={true}
                  hasLegend={false}
                />
              )}
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={styles.selectWrapper}>
                  <RNSelectPicker
                    onValueChange={(value) => setCurrentMonth(value)}
                    items={month}
                    placeholder={{ label: "Month", value: "month" }}
                    style={{ placeholder: { color: "black" } }}
                  />
                </View>
                <View style={styles.selectWrapper}>
                  <TextInput
                    placeholder={"Year"}
                    keyboardType={"number-pad"}
                    onChangeText={(text) => setCurrentYear(text)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={styles.enterButton}>
                  <TouchableOpacity
                    onPress={() => {
                      if (currentMonth != "" && currentYear != "") {
                        setRefresh(!refresh);
                      } else {
                        Alert.alert("Please fill in both month and year!");
                      }
                    }}
                  >
                    <Text style={styles.enterText}>Enter!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  titleContainer: {
    paddingBottom: 40,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: -2,
    textAlign: "left",
    lineHeight: 40,
  },
  selectWrapper: {
    backgroundColor: "white",
    width: Dimensions.get("window").width / 2 - 30,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: 5,
  },
  enterButton: {
    backgroundColor: "rgb(251, 194, 8)",
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginTop: 20,
  },
  enterText: {
    fontWeight: "bold",
  },
});
export default MonthlyMood;

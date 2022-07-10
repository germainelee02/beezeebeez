import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MoodLegend = ({
  happyColour,
  sadColour,
  angryColour,
  fearColour,
  surpriseColour,
  disgustColour,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={happyColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Happy</Text>
          </View>
        </View>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={sadColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Sad</Text>
          </View>
        </View>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={angryColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Angry</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column", paddingHorizontal: 20 }}>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={fearColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Fear</Text>
          </View>
        </View>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={disgustColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Disgust</Text>
          </View>
        </View>
        <View style={styles.eachRow}>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <FontAwesome name="circle" size={25} color={surpriseColour} />
          </View>
          <View style={{ paddingLeft: 5, paddingVertical: 10 }}>
            <Text>Surprise</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  eachRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export default MoodLegend;

import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const Expense = ({
  expense,
  date,
  month,
  year,
  reason,
  deleteItem,
  index,
  expenseType,
}) => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.reasonText}>{reason}</Text>
        <TouchableOpacity onPress={() => deleteItem(index)}>
          <EvilIcons name="trash" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <Text>
          {date}/{month}/{year}
        </Text>
        {expenseType == "add" ? (
          <Text style={styles.inflow}>+${Number(expense).toFixed(2)}</Text>
        ) : (
          <Text style={styles.outflow}>-${Number(expense).toFixed(2)}</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  inflow: {
    fontWeight: "bold",
    color: "mediumseagreen",
  },
  outflow: {
    fontWeight: "bold",
    color: "salmon",
  },
  reasonText: {
    fontSize: 15,
    fontWeight: "bold",
    maxWidth: "75%",
  },
  item: {
    backgroundColor: "rgba(245, 233, 188, 1)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 20,
  },
});
export default Expense;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, authentication } from "../firebase/firebase-config";

const CustomDrawer = (props, navigation) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <TouchableOpacity style={styles.logout} onPress={() => handleSignOut()}>
          <Text style={{ fontWeight: "bold" }}>Log out!</Text>
        </TouchableOpacity> */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(251, 194, 8)",
    margin: 15,
    height: 50,
    width: 200,
    borderRadius: 20,
    marginTop: 530,
  },
});
export default CustomDrawer;

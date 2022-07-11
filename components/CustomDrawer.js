import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, authentication } from "../firebase/firebase-config";
const { height, width } = Dimensions.get("screen");

const CustomDrawer = (props) => {
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        props.navigation.replace("login");
      })
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => (
            <View
              style={{
                backgroundColor: "#feba07",
                height: 43,
                width: width / 2 - 30,
                marginTop: height - 300,
                borderRadius: 25,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                marginLeft: 32,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Log out
              </Text>
            </View>
          )}
          onPress={() => handleSignOut()}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 15,
    height: 50,
    width: 200,
    borderRadius: 20,
    marginTop: 530,
  },
});
export default CustomDrawer;

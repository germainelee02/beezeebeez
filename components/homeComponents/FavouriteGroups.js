import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import GroupItem from "../homeComponents/items/GroupItem";

const FavouriteGroups = (props) => {
  const groups = [
    {
      groupname: "Family",
      imageUrl: require("../../assets/images/group/blank-profile-picture.png"),
    },
    {
      groupname: "Work pals",
      imageUrl: require("../../assets/images/group/blank-profile-picture.png"),
    },
    {
      groupname: "JC classmates",
      imageUrl: require("../../assets/images/group/blank-profile-picture.png"),
    },
    {
      groupname: "Random group",
      imageUrl: require("../../assets/images/group/blank-profile-picture.png"),
    },
  ];
  return (
    <View style={[{ height: 150 }, props.style]}>
      <Text style={styles.header}>Your Favourite Groups</Text>
      <FlatList
        data={groups}
        renderItem={({ item, index }) => {
          return (
            <GroupItem
              groupname={item.groupname}
              imageUrl={item.imageUrl}
              index={item.index}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginTop: 15,
  },
  header: {
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: -1,
    fontSize: 20,
    marginLeft: 0,
  },
});

export default FavouriteGroups;

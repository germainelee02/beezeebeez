import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";

export default function GroupItem({ groupname, imageUrl, index }) {
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          index === 0 ? { marginLeft: 0 } : { marginLeft: 15 },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.imageContainer} />
        </View>
        <Text style={styles.header}>{groupname}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    color: "gray",
    marginTop: 5,
    flexWrap: "wrap",
    textAlign: "center",
  },
  container: {
    width: 100,
    height: 130,
    borderRadius: 25,
    marginVertical: 15,
    backgroundColor: "#f6e6bb",
    alignItems: "center", //center horizontal
    justifyContent: "center", //center vert
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 5,
  },
});

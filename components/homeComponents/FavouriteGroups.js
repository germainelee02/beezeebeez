import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { authentication, db } from "../../firebase/firebase-config";
import GroupItem from "./items/GroupItem";
const { height, width } = Dimensions.get("screen");

const FavouriteGroups = (props) => {
  const navigation = useNavigation();

  const [favouriteChats, setFavouriteChats] = useState([]);

  const enterChat = (groupId, friend, img) => {
    navigation.navigate("chat", {
      id: groupId,
      friend,
      img: img,
    });
  };

  useEffect(() => {
    // fetch favourite chats

    const unsubscribe = async () => {
      const q = query(
        collection(db, "friends: " + authentication.currentUser.uid),
        where("isFavourite", "==", true)
      );
      onSnapshot(q, (snapshot) => {
        let temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({
            groupname: doc.data().fName + " " + doc.data().lName,
            imageUrl: doc.data().imgUrl,
            friendId: doc.data().id,
            groupId: doc.data().groupId,
          });
        });
        setFavouriteChats(temp);
      });
    };
    unsubscribe();
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <GroupItem
        key={item.groupId}
        group={item}
        index={favouriteChats.indexOf(item)}
        length={favouriteChats.length}
        enterChat={enterChat}
        favouriteChats={favouriteChats}
      />
    );
  };

  return (
    <View
      style={[favouriteChats.length === 0 ? {} : { height: 180 }, props.style]}
    >
      <Text style={styles.header}>Your Favourite Chats</Text>
      {favouriteChats.length !== 0 ? (
        <View>
          <FlatList
            data={favouriteChats}
            renderItem={renderItem}
            keyExtractor={(item) => item.groupId}
            horizontal
            showsHorizontalScrollIndicator={true}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#f6e6bb",
            width: width - 40,
            borderRadius: 25,
            alignItems: "center",
            marginTop: 15,
            paddingBottom: 15,
            height: 75,
            justifyContent: "center",
          }}
        >
          <Text>You have no favourite chats</Text>
        </View>
      )}
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

import React, {
  Component,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { authentication, db } from "../firebase/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import ContactsFloatingIcon from "../components/FriendsComponents/ContactsFloatingIcon";
import FriendItem from "../components/FriendsComponents/item/FriendItem";
const { height, width } = Dimensions.get("window");

const FriendsScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const friendsCol = query(
      collection(db, "friends: " + authentication.currentUser.uid)
    );

    onSnapshot(friendsCol, (snapshot) => {
      let tempFriends = [];
      snapshot.docs.forEach((doc) => {
        tempFriends.push(doc.data());
      });
      setFriends(tempFriends);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const enterChat = (groupId, friend, img) => {
    navigation.navigate("chat", {
      id: groupId,
      friend,
      img: img,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Friends</Text>
      </View>

      <ScrollView style={{ height: height - 300 }}>
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} enterChat={enterChat} />
        ))}
      </ScrollView>
      <View
        style={{ position: "absolute", top: height - 90, left: width - 60 }}
      >
        <ContactsFloatingIcon />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  headerContainer: {
    height: 50,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -1,
  },
});

export default FriendsScreen;

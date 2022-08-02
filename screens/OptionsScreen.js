import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, authentication } from "../firebase/firebase-config";

const OptionsScreen = ({ navigation, route }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const groupId = route.params.id;
  const friend = route.params.friend;

  useEffect(() => {
    // checks if chat is favourited from firebase
    let abortController = new AbortController();
    const docRef = doc(
      db,
      "friends: " + authentication.currentUser.uid,
      friend.id
    );
    onSnapshot(docRef, (doc) => {
      setIsFavourite(doc.data().isFavourite);
    });
    return () => {
      abortController.abort();
    };
  }, [isFavourite]);

  const toggleFavourite = async () => {
    if (isFavourite) {
      // unfavourite it
      const docRef = doc(
        db,
        "friends: " + authentication.currentUser.uid,
        friend.id
      );
      await updateDoc(docRef, {
        isFavourite: false,
      });
    } else {
      // favourite it
      const docRef = doc(
        db,
        "friends: " + authentication.currentUser.uid,
        friend.id
      );
      await updateDoc(docRef, {
        isFavourite: true,
      });
    }
  };

  const deleteChatAlert = () => {
    Alert.alert(
      "Are you sure you want to delete all messages?",
      "You cannot undo this change",
      [
        { text: "Cancel", onPress: () => console.log("alert closed") },
        { text: "Confirm", onPress: () => deleteChat() },
      ]
    );
  };

  const removeFriendAlert = () => {
    Alert.alert(
      "Are you sure you want to remove " +
        friend.fName +
        " " +
        friend.lName +
        " as a friend ?",
      "You cannot undo this change",
      [
        { text: "Cancel", onPress: () => console.log("alert closed") },
        { text: "Confirm", onPress: () => removeFriend() },
      ]
    );
  };

  const deleteChat = async () => {
    try {
      const messagesRef = collection(db, "groups", groupId, "messages");
      const snapshot = await getDocs(messagesRef);
      snapshot.forEach((d) => {
        deleteDoc(doc(db, "groups", groupId, "messages", d.id));
      });
      Alert.alert("All chats deleted");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const removeFriend = async () => {
    // remove both users and remove doc in groups collection
    try {
      await deleteDoc(
        doc(db, "friends: " + authentication.currentUser.uid, friend.id)
      );
      await deleteDoc(
        doc(db, "friends: " + friend.id, authentication.currentUser.uid)
      );
      const messagesRef = collection(db, "groups", groupId, "messages");
      const snapshot = await getDocs(messagesRef);
      snapshot.forEach((d) => {
        deleteDoc(doc(db, "groups", groupId, "messages", d.id));
      });
      navigation.goBack();
      Alert.alert("You removed " + friend.fName + " " + friend.lName);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.Container}>
        <Text style={styles.header}>Chat Options</Text>

        {/* if alr favourited, colour is deep yellow, else pale yellow */}
        <TouchableOpacity
          onPress={toggleFavourite}
          style={[
            styles.btnContainer,
            {
              backgroundColor: isFavourite ? "#feba07" : "#f5e8bb",
              flexDirection: "row",
            },
          ]}
        >
          <Text>{isFavourite ? "Remove Favourite" : "Favourite Chat"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={deleteChatAlert}
          style={[
            styles.btnContainer,
            { backgroundColor: "#ea897b", flexDirection: "row" },
          ]}
        >
          <Text>Delete Chat</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={removeFriendAlert}
          style={[styles.btnContainer, { backgroundColor: "#ea897b" }]}
        >
          <Text>Remove Friend</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={navigation.goBack}
          style={[styles.btnContainer, { backgroundColor: "lightgrey" }]}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
  Container: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
  },
  btnContainer: {
    width: 250,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});

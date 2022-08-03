import { useNavigation } from "@react-navigation/native";
import { fr } from "date-fns/locale";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { Component, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import { db } from "../../../firebase/firebase-config";

const GroupItem = ({ group, index, length, enterChat, favouriteChats }) => {
  const [img, setImg] = useState("");
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    // get friend from user collection
    const getFriend = async () => {
      const docRef = doc(db, "users", group.friendId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFriend(docSnap.data());
      } else {
        console.log("No such friend exists!");
      }
    };
    const getImg = () => {
      try {
        const storage = getStorage();
        if (group.imageUrl) {
          const pathRef = ref(storage, group.imageUrl);
          if (pathRef) {
            getDownloadURL(pathRef).then((url) => setImg(url));
          } else {
            setImg("");
          }
        } else {
          // no profile picture
          setImg("");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFriend();
    getImg();
  }, [favouriteChats]);

  return (
    <TouchableOpacity
      key={group}
      onPress={() => enterChat(group.groupId, friend, img)}
    >
      <View
        style={[
          styles.container,
          index == 0 ? { marginLeft: 10 } : { marginLeft: 15 },
        ]}
        key={index}
      >
        <View style={styles.imageContainer}>
          {img ? (
            <Image source={{ uri: img }} style={styles.imageContainer} />
          ) : (
            <Image
              source={require("../../../assets/images/group/blank-profile-picture.png")}
              style={styles.imageContainer}
            />
          )}
        </View>
        <Text style={styles.header}>{group.groupname}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    color: "gray",
    marginTop: 5,
    flexWrap: "wrap",
    textAlign: "center",
    width: "80%",
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
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 5,
  },
});

export default GroupItem;

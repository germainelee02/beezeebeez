import { StyleSheet, Text, View, Image, TextComponent } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { authentication, db } from "../../../firebase/firebase-config";
import {
  getDoc,
  doc,
  onSnapshot,
  query,
  collection,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { querystring } from "@firebase/util";

const FriendItem = ({ friend, enterChat }) => {
  const fullName = friend.fName + " " + friend.lName;
  const [img, setImg] = useState("");
  const [groupId, setGroupId] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getImg = () => {
      try {
        const storage = getStorage();
        const filePath = friend.imgUrl;
        if (filePath) {
          const pathRef = ref(storage, filePath);
          if (pathRef) {
            getDownloadURL(pathRef).then((url) => setImg(url));
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getGroupId = async () => {
      // get groupid
      // look into curr users friends collection for friend
      // then get group id
      try {
        const docRef = doc(
          db,
          "friends: " + authentication.currentUser.uid,
          friend.id
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGroupId(docSnap.data().groupId);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const checkIsFavourite = () => {
      try {
        const docRef = doc(
          db,
          "friends: " + authentication.currentUser.uid,
          friend.id
        );
        onSnapshot(docRef, (doc) => {
          setIsFavourite(doc.data().isFavourite);
        });
      } catch (e) {
        console.log(e);
      }
    };

    getImg();
    getGroupId();
    checkIsFavourite();
  }, [img]);

  return (
    <ListItem
      key={friend.id}
      bottomDivider
      onPress={() => enterChat(groupId, friend, img)}
    >
      {img ? (
        <Avatar rounded source={{ uri: img }} />
      ) : (
        <Avatar
          rounded
          source={require("../../../assets/images/group/blank-profile-picture.png")}
        />
      )}
      <ListItem.Content style={{ flexDirection: "row", marginBottom: 20 }}>
        <ListItem.Title
          style={{
            fontWeight: "600",
            fontSize: 16,
            position: "absolute",
            left: 0,
          }}
        >
          {fullName}
        </ListItem.Title>

        {isFavourite && (
          <AntDesign
            name="star"
            size={20}
            color="#feba07"
            style={{ left: 230, position: "absolute" }}
          />
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default FriendItem;

const styles = StyleSheet.create({});

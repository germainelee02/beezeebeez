import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
const { height, width } = Dimensions.get("window");
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, authentication } from "../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { fr } from "date-fns/locale";

const InviteFriendsScreen = ({ navigation }) => {
  const [friendEmail, setFriendEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [friend, setFriend] = useState(null);
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    const unsubscribe = async () => {
      const docRef = doc(db, "users", authentication.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentUser(docSnap.data());
      } else {
        console.log("No such current user!");
      }
    };
    unsubscribe();
  }, []);

  const addFriend = async (friend) => {
    // create a unique id for chat between friend and curr user, add doc to groups collection
    const docRef = doc(collection(db, "groups"));
    await setDoc(docRef, {
      id: docRef.id,
      timeCreated: serverTimestamp(),
    });

    // adds friend to current user's friends collection
    await setDoc(
      doc(db, "friends: " + authentication.currentUser.uid, friend.id),
      {
        id: friend.id,
        email: friend.email,
        fName: friend.fName,
        lName: friend.lName,
        imgUrl: friend.imgUrl,
        phoneNum: friend.phoneNum,
        groupId: docRef.id,
        isFavourite: false,
      }
    );

    // adds friend to friend's friends collection
    await setDoc(
      doc(db, "friends: " + friend.id, authentication.currentUser.uid),
      {
        id: authentication.currentUser.uid,
        email: authentication.currentUser.email,
        fName: currentUser.fName,
        lName: currentUser.lName,
        imgUrl: currentUser.imgUrl,
        phoneNum: currentUser.phoneNum,
        groupId: docRef.id,
        isFavourite: false,
      }
    );
  };

  const validate = async () => {
    try {
      let newFriend = true;
      let exists = false;
      let friendUid = "";
      let friend = null;
      let isSame = false;

      // checks if input is same as user's email
      if (friendEmail !== authentication.currentUser.email) {
        // finds friend's email in db
        const q = query(
          collection(db, "users"),
          where("email", "==", friendEmail)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.data().email == friendEmail) {
            exists = true;
            friend = { ...doc.data(), id: doc.id };
          }
        });
        // check if friend is alr friends w user
        const docRef = doc(
          db,
          "friends: " + authentication.currentUser.uid,
          friend.id
        );
        console.log("hi");

        const docSnap = await getDoc(docRef);
        console.log("hi");
        if (docSnap.exists()) {
          newFriend = false;
        } else {
          newFriend = true;
        }
      } else {
        isSame = true;
      }

      if (exists && newFriend) {
        setFriend(friend);
        // enter friend email in user's friends collection

        addFriend(friend);
        Alert.alert("Success", "Started a chat with " + friend.fName);

        navigation.goBack();
      } else if (!newFriend) {
        Alert.alert("You are already friends with " + friend.fName + " !");
      } else if (isSame) {
        Alert.alert("Invalid Email", "You cannot enter your own email");
      } else if (!isSame) {
        Alert.alert("Invalid Email", "User does not exist!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: width }}>
          <View style={{ height: 40, padding: 10, justifyContent: "center" }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor={"#f5e8bb"}
              onChangeText={(text) => setFriendEmail(text)}
              placeholder={"Enter your friend's email"}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.inviteBtn,
              { backgroundColor: !friendEmail ? "lightgrey" : "#f5e8bb" },
            ]}
            disabled={!friendEmail}
            onPress={validate}
          >
            <Text style={{ fontWeight: "500" }}>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default InviteFriendsScreen;

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 0.5,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  inviteBtn: {
    width: width - 20,
    height: 35,
    backgroundColor: "#f5e8bb",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
});

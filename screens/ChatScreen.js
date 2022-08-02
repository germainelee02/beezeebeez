import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Avatar } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { authentication, db, storageRef } from "../firebase/firebase-config";
import moment from "moment";
import OptionsIcon from "../components/FriendsComponents/OptionsIcon";
const { height, width } = Dimensions.get("window");
import { useKeyboard } from "@react-native-community/hooks";

const ChatScreen = ({ navigation, route }) => {
  const keyboard = useKeyboard();
  const friendfullName =
    route.params.friend.fName + " " + route.params.friend.lName;
  const [currentUser, setCurrentUser] = useState(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  // enter options screen and pass in params : id, friend
  const enterOptions = (groupId, friend) => {
    navigation.navigate("options", {
      id: groupId,
      friend: friend,
    });
  };

  // header design
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#feba07",
      },
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {route.params.img ? (
            <Avatar rounded source={{ uri: route.params.img }} />
          ) : (
            <Avatar
              rounded
              source={require(".././assets/images/group/blank-profile-picture.png")}
            />
          )}
          <Text style={{ fontWeight: "700", marginLeft: 10 }}>
            {friendfullName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginBottom: 5 }}
          onPress={navigation.goBack}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <OptionsIcon
          groupId={route.params.id}
          friend={route.params.friend}
          enterOptions={enterOptions}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // get current user info
    const unsubscribe = () => {
      const getCurrentUser = async () => {
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser(docSnap.data());
        } else {
          console.log("No such current user!");
        }
      };

      // get all messages with friend
      const getMessages = () => {
        const messagesCol = query(
          collection(db, "groups", route.params.id, "messages"),
          orderBy("timestamp", "asc")
        );

        onSnapshot(messagesCol, (snapshot) => {
          let tempMessages = [];
          snapshot.docs.forEach((doc) => {
            tempMessages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(tempMessages);
        });
      };
      getCurrentUser();
      getMessages();
    };

    unsubscribe();
  }, [route]);

  // send message when button pressed
  const sendMessage = async () => {
    Keyboard.dismiss;
    // // add doc to message collection in groups collection
    let img = "";
    try {
      const now = moment();
      addDoc(collection(db, "groups", route.params.id, "messages"), {
        timestamp: serverTimestamp(),
        date: now.format("DD-MM-YYYY"),
        time: now.format("h:mm a"),
        message: input,
        sentBy: currentUser.fName + " " + currentUser.lName,
        email: currentUser.email,
      });
    } catch (e) {
      console.log(e);
    }
    setInput("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={60}
      >
        {/* messages scrollview */}
        <ScrollView
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: 20,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: false })
          }
          onTouchEnd={() => setIsScrollEnd(true)}
        >
          {messages.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                top: height / 2 - 120,
              }}
            >
              <Text style={{ fontStyle: "italic", color: "grey" }}>
                You have no messages with {route.params.friend.fName}
              </Text>
            </View>
          ) : (
            messages.map((message) =>
              //   if message is sent by this user
              message.email === authentication.currentUser.email ? (
                <View style={styles.receiver} key={message.id}>
                  <Text>{message.message}</Text>
                  <Text style={styles.time}>{message.time}</Text>
                </View>
              ) : (
                // message sent by friend
                <View style={styles.sender} key={message.id}>
                  <Text>{message.message}</Text>
                  <Text style={styles.time}>{message.time}</Text>
                </View>
              )
            )
          )}
        </ScrollView>

        {/* textinput */}
        <View style={styles.footer}>
          {/* button to scroll all the way down */}
          {messages.length > 8 ||
          (keyboard.keyboardShown && messages.length > 4) ? (
            <TouchableOpacity
              onPress={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
              style={[styles.downBtn]}
            >
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Your Message"
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.5}
            disabled={!input}
          >
            <Ionicons
              name="send"
              size={24}
              color={input ? "#feba07" : "lightgrey"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginBottom: 25,
    bottom: 10,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#f5e8bb",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 15,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative",
  },
  time: {
    fontSize: 10,
    color: "grey",
    marginTop: 5,
  },
  downBtn: {
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "#feba07",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: width - 50,
    bottom: 70,
  },
});

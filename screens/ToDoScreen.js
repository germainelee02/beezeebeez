import react, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import Task from "../components/TaskComponents.js/Task";
import ImportantTask from "../components/TaskComponents.js/ImportantTask";
import { db, authentication } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  orderBy,
  doc,
  query,
  updateDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

const ToDoListScreen = () => {
  const [task, setTask] = useState();

  const [pinned, setPinned] = useState(false);

  const [taskItems, setTaskItems] = useState([]);

  const [importantTaskItems, setImportantTaskItems] = useState([]);

  const [pendingNumber, setPendingNumber] = useState(0);

  const [completedNumber, setCompletedNumber] = useState(0);

  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(true);

  const setNormalTask = (text) => {
    setTask(text);
    setPinned(false);
  };

  // toggles the boolean refresh to trigger useEffect()
  const refreshPage = () => {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  };

  // collects data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const todoCol = query(
          collection(db, "to do: " + authentication.currentUser.uid),
          orderBy("timeSent", "desc")
        );

        const todoSnapshot = await getDocs(todoCol);
        let tempNormalArray = [];
        let tempImportantArray = [];
        let tempCompleted = 0;
        let tempPending = 0;
        todoSnapshot.forEach((doc) => {
          const { pinned, complete } = doc.data();
          if (complete) {
            tempCompleted++;
          } else if (!complete) {
            tempPending++;
          }
          if (!pinned) {
            tempNormalArray.push(doc.data());
          } else {
            tempImportantArray.push(doc.data());
          }
        });
        setTaskItems(tempNormalArray);
        setImportantTaskItems(tempImportantArray);
        setLoading(false);
        setCompletedNumber(tempCompleted);
        setPendingNumber(tempPending);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [refresh]);

  const handleAddTask = async () => {
    Keyboard.dismiss();
    // check that the input string is not empty or contains only whitespaces
    if (task) {
      //  setTaskItems([...taskItems, task]);
      const docRef = await addDoc(
        collection(db, "to do: " + authentication.currentUser.uid),
        {
          task: task,
          pinned: pinned,
          complete: false,
          timeSent: serverTimestamp(),
        }
      );
      await updateDoc(docRef, {
        id: docRef.id,
      });
      setTask("");
      setPinned(false);
      refreshPage();
    } else {
      Alert.alert("Please write a task before pressing the add button!");
    }
  };

  const pinTask = async (index) => {
    let pinnedItem = taskItems[index];
    const docRef = doc(
      db,
      "to do: " + authentication.currentUser.uid,
      pinnedItem.id
    );
    await updateDoc(docRef, { pinned: true });
    refreshPage();
  };

  const unpinTask = async (index) => {
    let unpinnedItem = importantTaskItems[index];
    const docRef = doc(
      db,
      "to do: " + authentication.currentUser.uid,
      unpinnedItem.id
    );
    await updateDoc(docRef, { pinned: false });
    refreshPage();
  };

  const toggleTask = async (index) => {
    let item = taskItems[index];
    const docRef = doc(db, "to do: " + authentication.currentUser.uid, item.id);
    if (!item.complete) {
      await updateDoc(docRef, { complete: true });
    } else {
      await updateDoc(docRef, { complete: false });
    }
    refreshPage();
  };

  const toggleImportantTask = async (index) => {
    let item = importantTaskItems[index];
    const docRef = doc(db, "to do: " + authentication.currentUser.uid, item.id);
    if (!item.complete) {
      await updateDoc(docRef, { complete: true });
    } else {
      await updateDoc(docRef, { complete: false });
    }
    refreshPage();
  };

  const deleteTask = async (index) => {
    const item = taskItems[index];
    await deleteDoc(
      doc(db, "to do: " + authentication.currentUser.uid, item.id)
    );
    refreshPage();
  };

  const deleteImportantTask = async (index) => {
    const item = importantTaskItems[index];
    await deleteDoc(
      doc(db, "to do: " + authentication.currentUser.uid, item.id)
    );
    refreshPage();
  };

  const HandleOutsideTouches = () => {
    Keyboard.dismiss();
    return false;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView
        style={styles.handleOutside}
        onStartShouldSetResponder={() => HandleOutsideTouches()}
      >
        <View style={styles.container}>
          <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={{ marginTop: 10, marginBottom: 0 }}>
              <Text style={styles.statusText}>
                {" "}
                Total: {pendingNumber + completedNumber}
              </Text>
              <Text style={styles.statusText}> Pending: {pendingNumber}</Text>
              <Text style={styles.statusText}>
                {" "}
                Completed: {completedNumber}
              </Text>
            </View>
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <ScrollView style={styles.items}>
                {importantTaskItems.map((item, index) => {
                  return (
                    <ImportantTask
                      text={item.task}
                      index={index}
                      key={index}
                      deleteImportantTask={deleteImportantTask}
                      unpinTask={unpinTask}
                      toggleImportantTask={toggleImportantTask}
                      complete={item.complete}
                    />
                  );
                })}
                {taskItems.map((item, index) => {
                  return (
                    <Task
                      text={item.task}
                      index={index}
                      key={index}
                      deleteTask={deleteTask}
                      pinTask={pinTask}
                      toggleTask={toggleTask}
                      complete={item.complete}
                    />
                  );
                })}
                {/* <ImportantTask text={"hi"} /> */}
              </ScrollView>
            )}
          </View>

          {/* write a task section here */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder={"Add a task..."}
              value={task}
              onChangeText={(text) => setNormalTask(text)}
            />
            <TouchableOpacity onPress={() => handleAddTask()}>
              <Image
                source={require("../assets/images/bee/cute-bee.png")}
                resizeMode="contain"
                style={styles.addWrapper}
              />
              {/* </View> */}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  handleOutside: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    marginLeft: "42.5%",
    marginTop: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    marginTop: 20,
    marginBottom: 160,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 80,
    height: 80,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "grey",
    fontWeight: "bold",
  },
});
export default ToDoListScreen;

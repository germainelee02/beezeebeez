import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { db, authentication } from "../firebase/firebase-config";
import { Auth, getAuth } from "firebase/auth";
import { getDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { userConverter } from "../configs/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/profileComponents/Input";
import ProfilePictureModal from "../components/profileComponents/ProfilePictureModal";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const { height, width } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userImgUrl, setUserImgUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDataValid, setIsDataValid] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    fName: "",
    lName: "",
    phoneNum: "",
    userImgUrl: "",
  });

  // pull down to refresh photo
  const wait = (timeout) => {
    try {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    } catch (e) {
      console.log(e);
    }
  };

  const getUserPhotoOnRefresh = useCallback(() => {
    setRefreshing(true);
    getUserPhoto();
    wait(2000).then(() => setRefreshing(false));
  });

  // to open edit photo modal
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  // fetch user data
  const getUser = async () => {
    try {
      setLoading(true);
      const ref = doc(db, "users", getAuth().currentUser.uid).withConverter(
        userConverter
      );
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const user = await docSnap.data();
        setUser(user);
        setInputs({
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          phoneNum: user.phoneNum,
          userImgUrl: user.imgUrl,
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // retrieve user photo
  const getUserPhoto = async () => {
    try {
      setLoading(true);
      const storage = getStorage();
      const fileName = getAuth().currentUser.uid;
      const pathRef = ref(storage, `images/${fileName}.jpg`);
      if (!pathRef) {
        setUserImgUrl(null);
      }
      getDownloadURL(pathRef).then((url) => setUserImgUrl(url));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // form validation
  const validate = () => {
    let isValid = true;
    if (!inputs.fName) {
      handleError("Please enter your first name", "fName");
      isValid = false;
      setIsDataValid(false);
    }

    if (!inputs.lName) {
      handleError("Please enter your last name", "lName");
      isValid = false;
      setIsDataValid(false);
    }

    if (!inputs.email) {
      handleError("Please enter your email", "email");
      isValid = false;
      setIsDataValid(false);
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email", "email");
      isValid = false;
      setIsDataValid(false);
    }

    if (inputs.phoneNum.length > 8) {
      handleError("Please enter a valid 8 digit phone number", "phoneNum");
      isValid = false;
      setIsDataValid(false);
    }

    if (isValid) {
      handleError(null, "fName");
      handleError(null, "lName");
      handleError(null, "email");
      handleError(null, "phoneNum");
      setIsDataValid(true);
      setIsSaved(true);
      handleUpdate();
    }
  };

  // when user updates info
  const handleUpdate = async () => {
    try {
      const ref = doc(db, "users", getAuth().currentUser.uid);
      await updateDoc(ref, {
        email: inputs.email,
        fName: inputs.fName,
        lName: inputs.lName,
        phoneNum: inputs.phoneNum,
      }).then(() => {
        console.log("User updated!");
        Alert.alert(
          "Profile updated!",
          "Your profile has been updated successfully."
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnchange = (text, input) => {
    setIsSaved(false);
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    {
      getUser();
      getUserPhoto();
    }
  }, []);

  useEffect(() => {
    isFocused && getUserPhoto();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
        <RefreshControl
          onRefresh={getUserPhotoOnRefresh}
          refreshing={refreshing}
        />
        <View style={{ height: height }}>
          {loading ? (
            <View
              style={{
                position: "absolute",
                marginLeft: width / 2 - 15,
                marginTop: height / 2 - 60,
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={{ backgroundColor: "white", height: "100%" }}>
              <ScrollView
                style={styles.container}
                refreshControl={
                  <RefreshControl
                    onRefresh={getUserPhotoOnRefresh}
                    refreshing={refreshing}
                  />
                }
              >
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      isDataValid
                        ? isSaved
                          ? navigation.openDrawer()
                          : Alert.alert(
                              "Please save your changes before exiting to Home!"
                            )
                        : Alert.alert(
                            "You cannot exit!",
                            "Check that you have entered valid information and have saved your changes by updating them."
                          );
                    }}
                  >
                    <Image
                      source={require("../assets/icons/menuRight.png")}
                      style={{ tintColor: "gray" }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View>
                    <Text style={styles.header}>Profile</Text>
                  </View>
                  {/* profile picture on profile screen */}
                  <View style={styles.profileImgContainer}>
                    {/* displays profile picture if any is stored in firebase DB, else default photo */}
                    {userImgUrl ? (
                      <Image
                        source={{ uri: userImgUrl }}
                        style={styles.profileImg}
                      />
                    ) : (
                      <Image
                        source={require("../assets/images/group/blank-profile-picture.png")}
                        style={styles.profileImg}
                      />
                    )}
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>
                      {user ? inputs.fName : ""} {user ? inputs.lName : ""}
                    </Text>
                    <TouchableOpacity onPress={() => changeModalVisible(true)}>
                      <Text style={styles.editPP}>
                        Edit your profile picture
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Input
                      onChangeText={(txt) => handleOnchange(txt, "fName")}
                      onFocus={() => handleError(null, "fName")}
                      defaultValue={user ? user.fName : ""}
                      label="First Name"
                      imgSource={require("../assets/icons/profileIcons/user.png")}
                      error={errors.fName}
                    />
                    <Input
                      onChangeText={(txt) => handleOnchange(txt, "lName")}
                      onFocus={() => handleError(null, "lName")}
                      defaultValue={user ? user.lName : ""}
                      label="Last Name"
                      imgSource={require("../assets/icons/profileIcons/user.png")}
                      error={errors.lName}
                    />
                    <Input
                      onChangeText={(txt) => handleOnchange(txt, "email")}
                      onFocus={() => handleError(null, "email")}
                      defaultValue={user ? user.email : ""}
                      label="Email Address"
                      imgSource={require("../assets/icons/profileIcons/email.png")}
                      error={errors.email}
                    />

                    <Input
                      onChangeText={(txt) => handleOnchange(txt, "phoneNum")}
                      onFocus={() => handleError(null, "phoneNum")}
                      defaultValue={user ? user.phoneNum : ""}
                      label="Phone Number"
                      imgSource={require("../assets/icons/profileIcons/phone.png")}
                      keyboardType={"phone-pad"}
                      error={errors.phoneNum}
                    />
                  </View>
                  <View style={styles.updateBtnContainer}>
                    <TouchableOpacity onPress={validate}>
                      <Text>Update Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <ProfilePictureModal changeModalVisible={changeModalVisible} />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    // padding: 20,
    backgroundColor: "white",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    marginTop: 5,
    shadowOffset: { width: 0, height: -3 },
    elevation: 3,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    height: height,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },

  container: {
    height: "100%",
    marginLeft: 20,
    marginRight: 20,
  },

  inputHeader: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 20,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  profileImgContainer: {
    paddingTop: 25,
    alignItems: "center",
    paddingBottom: 0,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
  },
  updateBtnContainer: {
    height: 50,
    width: 192,
    backgroundColor: "#f5e8bb",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: width / 5,
    marginTop: 10,
  },
  editBtn: {
    color: "#f5e8bb",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    marginTop: 5,

    width: width - 40,
    padding: 10,
    alignItems: "center",
  },

  nameText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 12,
    paddingTop: 5,
  },
  menuContainer: {
    alignItems: "flex-end",
    flex: 1,
    marginRight: 0,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textInputContainer: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    borderRadius: 0.5,
    borderColor: "black",
    borderWidth: 0.5,
  },
  editPP: {
    color: "blue",
    opacity: 0.5,
  },
});

export default ProfileScreen;

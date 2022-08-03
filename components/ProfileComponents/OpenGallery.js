import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Button,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  getStorage,
  ref,
  uploadBytes,
  file,
  uploadBytesResumable,
} from "firebase/storage";
import { storageRef } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import { doc, updateDoc, waitForPendingWrites } from "firebase/firestore";
import LoadingScreen from "../../screens/LoadingScreen";

const OpenGallery = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showingGallery, setShowingGallery] = useState(true);

  const closeGallery = (bool) => {
    props.changeGalleryVisible(false);
  };

  // to open loading screen
  const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false);
  const changeLoadingVisible = (bool) => {
    setIsLoadingScreenOpen(bool);
  };

  // wait for 3000 (to upload img to DB) then close camera modal
  const waitAndClose = () => {
    setTimeout(() => {
      closeGallery(false);
    }, 3000);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setResult(result);
      setShowingGallery(false);
    } else {
      closeGallery(false);
      setShowingGallery(false);
    }
  };

  const uploadPhoto = async (result) => {
    const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);
    // each user stores only 1 file in cloud storage
    const fileName = getAuth().currentUser.uid + "." + ext;
    const reference = ref(storageRef, "images/" + fileName);
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    try {
      // upload photo to firestore cloud storage
      uploadBytesResumable(reference, bytes).then((snapshot) => {
        console.log("Uploaded a file to cloud storage");
      });
      // update imgUrl field in user collection in firestore DB
      const ref = doc(db, "users", getAuth().currentUser.uid);
      await updateDoc(ref, {
        imgUrl: "images/" + fileName,
      }).then(() => console.log("User dp updated"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
      pickImage();
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!showingGallery ? (
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, borderRadius: 250 }}
          />
          <View style={{ flexDirection: "row", margin: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setImage(null);
                setShowingGallery(false);
                closeGallery(false);
              }}
              style={{ paddingRight: 50 }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                uploadPhoto(result);
                setIsLoadingScreenOpen(true);
                waitAndClose();
              }}
              style={{ paddingLeft: 50 }}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={isLoadingScreenOpen}>
            <LoadingScreen changeLoadingVisible={changeLoadingVisible} />
          </Modal>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default OpenGallery;

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
  Modal,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
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
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, authentication } from "../../firebase/firebase-config";
import LoadingScreen from "../../screens/LoadingScreen";
import { FontAwesome } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

const OpenCamera = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const cameraRef = useRef(null);
  const [result, setResult] = useState(null);

  // to open loading screen
  const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false);
  const changeLoadingVisible = (bool) => {
    setIsLoadingScreenOpen(bool);
  };

  const closeCameraModal = (bool) => {
    props.changeCameraVisible(bool);
  };

  // wait for 3000 (to upload img to DB) then close camera modal
  const waitAndClose = () => {
    setTimeout(() => {
      closeCameraModal(false);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // called to take the photo
  const takePhoto = async () => {
    if (cameraRef) {
      console.log("in take picture");
      try {
        let result = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
          setImage(result.uri);
          setResult(result);
          setShowCamera(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const uploadPhoto = async (result) => {
    const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);
    const fileName = getAuth().currentUser.uid + "." + ext;
    const reference = ref(storageRef, "images/" + fileName);
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    try {
      // uploads photo to firestore cloud storage
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {showCamera ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                borderColor: "rgba(255,255,255, 0.3)",
                borderWidth: 2,
                height: 380,
                width: 380,
                justifyContent: "center",
                alignContent: "center",
                position: "absolute",
                flex: 1,
              }}
            ></View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <Text style={{ color: "white" }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => takePhoto()}
              >
                <FontAwesome
                  name="circle"
                  color="rgba(255,255,255, 0.5)"
                  backgroundColor="white"
                  size={70}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => {
                  closeCameraModal(false);
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        // when we r done w taking the photo
        <View>
          {image && result && (
            <View
              style={{
                height: "100%",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300, borderRadius: 200 }}
              />
              <View style={{ flexDirection: "row", margin: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setImage(null);
                    setShowCamera(true);
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
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
export default OpenCamera;

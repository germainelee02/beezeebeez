import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import OpenCamera from "./OpenCamera";
import OpenGallery from "./OpenGallery";

const ProfilePictureModal = (props) => {
  // to open camera modal
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const changeCameraVisible = (bool) => {
    setIsCameraOpen(bool);
  };

  // to open gallery modal
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const changeGalleryVisible = (bool) => {
    setIsGalleryOpen(bool);
  };

  // waiting to upload file to cloud storage
  // if user clicked confirm from opengallery/camera, trigger
  // loading screen here until file is uploaded
  const [isUploading, setIsUploading] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const uploading = () => {
    if (!isCameraOpen || !isGalleryOpen) {
      setIsUploading(true);
      wait(2000);
      setIsUploading(false);
    }
  };

  // from profile screen
  const closeModal = (bool) => {
    props.changeModalVisible(bool);
  };

  return (
    <View style={styles.modalBackground}>
      {isUploading ? (
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
        <View style={[styles.modalContainer]}>
          <Text style={styles.header}>Upload Photo</Text>
          <Text style={styles.caption}>Choose Your Profile Picture</Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => setIsCameraOpen(true)}
          >
            <Text style={styles.btnTxt}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              setIsGalleryOpen(true);
            }}
          >
            <Text style={styles.btnTxt}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: "#feba07" }]}
            onPress={closeModal}
          >
            <Text style={styles.btnTxt}>Done</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isCameraOpen} animationType="fade" transparent>
        <OpenCamera changeCameraVisible={changeCameraVisible} />
      </Modal>
      <Modal visible={isGalleryOpen} animationType="fade">
        <OpenGallery changeGalleryVisible={changeGalleryVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
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
  },
  caption: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
  },
  btnContainer: {
    backgroundColor: "#f5e8bb",
    width: 250,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  btnTxt: {},
});
export default ProfilePictureModal;

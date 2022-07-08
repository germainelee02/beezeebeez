import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect } from "react";
const { height, width } = Dimensions.get("screen");

// a loading screen/modal that closes after 3s

const LoadingScreen = (props) => {
  const closeLoadingScreen = (bool) => {
    props.changeLoadingVisible(bool);
  };

  useEffect(() => {
    setTimeout(() => {
      closeLoadingScreen(false);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        marginLeft: width / 2 - 15,
        marginTop: height / 2 - 60,
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default LoadingScreen;

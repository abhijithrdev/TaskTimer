import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

type TouchableButtonProps = {
  onPress: () => void;
  text: string;
  style?: object;
};

const TouchableButton = ({ onPress, text, style }: TouchableButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TouchableButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#24c37e",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    color: "#FFF",
  },
});

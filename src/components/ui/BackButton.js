import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BorderRadii, Colors, Spacing } from "../../utils/styles";

const BackButton = ({ navigation, customBack }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        if (navigation && navigation.canGoBack()) navigation.goBack();
        if (customBack) customBack();
      }}
      style={styles.container}
    >
      <AntDesign name="arrowleft" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadii.xl,
    padding: 10,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.l,
    borderColor: Colors.primary,
    backgroundColor: Colors.bg_white,
  },
});

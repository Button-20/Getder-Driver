import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";
import BackButton from "./BackButton";

const Header = ({ heading, customBack }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <View>
        <View style={styles.topSection}>
          <BackButton customBack={customBack} />
          <Text style={styles.heading}>{heading}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: Spacing.l,
  },
  topSection: {
    flexDirection: "row",
    gap: Spacing.xl,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.s,
  },
});

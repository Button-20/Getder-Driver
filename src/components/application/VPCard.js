import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const { width } = Dimensions.get("window");

const VPCard = ({ item, setStep, step }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ paddingHorizontal: Spacing.l }}>
        <Text style={styles.heading}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => setStep(step + 1)}>
        <AntDesign name="arrowright" size={30} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default VPCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    height: 487,
    width: width / 1.1,
    marginVertical: Spacing.l,
    overflow: "hidden",
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },

  image: {
    width: "100%",
    height: 279,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginVertical: Spacing.s,
    marginTop: Spacing.l,
  },

  description: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.primary,
  },

  button: {
    position: "absolute",
    right: Spacing.m,
    bottom: Spacing.m,
    padding: Spacing.s,
  },
});

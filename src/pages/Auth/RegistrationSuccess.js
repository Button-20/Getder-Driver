import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Success from "../../../assets/images/success.svg";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const RegistrationSuccess = ({ navigation }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Success style={[styles.successImage]} width={300} height={200} />
        </Animated.View>
        <Text style={styles.heading}>
          Your application is submitted {"\n"} and is under review
        </Text>
        <Text style={styles.subHeading}>
          You will be notified with application status or {"\n"} check the
          status by going to Settings
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("PhoneScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegistrationSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: Spacing.m,
  },

  successImage: {
    alignSelf: "center",
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.s,
    textAlign: "center",
  },

  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginTop: Spacing.l,
    color: Colors.text_muted,
    textAlign: "center",
  },

  button: {
    width: "100%",
    marginBottom: Spacing.l,
    height: 60,
    backgroundColor: Colors.primary,
    padding: Spacing.s,
    borderRadius: BorderRadii.s,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    paddingHorizontal: Spacing.s,
    color: Colors.text_white,
  },
});

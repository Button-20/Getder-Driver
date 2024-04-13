import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const AdjustFareForm = ({ setAdjustFareModal, request, submitOffer }) => {
  const [amount, setAmount] = useState("");

  const [spinner, setSpinner] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        {request?.currency?.symbol}{" "}
        {Intl.NumberFormat().format(request?.suggested_price)}
      </Text>
      <Text style={styles.subHeading}>1.4km</Text>
      <Text style={styles.heading}>Adjust Fare</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="number-pad"
        placeholderTextColor="grey"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.subHeading}>Recommended fare, adjustable</Text>
      <View style={styles.ctaButtons}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.bg_success,
              borderWidth: 0,
            },
          ]}
          activeOpacity={0.5}
          onPress={async () => {
            if (!amount) return;
            setSpinner(true);
            await submitOffer({ ...request, suggested_price: amount });
            setAmount("");
            setSpinner(false);
          }}
        >
          <Text style={[styles.buttonText, { color: Colors.text_white }]}>
            {spinner ? <ActivityIndicator color={Colors.text_white} /> : "Send"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => setAdjustFareModal(false)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdjustFareForm;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "90%",
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: Spacing.m,
    marginTop: Spacing.xxl,
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.s,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
    textAlign: "center",
    marginVertical: Spacing.m,
  },

  subHeading: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    textAlign: "center",
  },

  input: {
    borderBottomColor: Colors.bg_whitesmoke,
    borderBottomWidth: 1,
    padding: Spacing.s,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    width: "100%",
    textAlign: "center",
    marginBottom: Spacing.s,
  },

  ctaButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Spacing.xl,
  },

  button: {
    backgroundColor: Colors.bg_white,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderRadius: 4,
    padding: Spacing.s,
    width: "48%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
  },
});

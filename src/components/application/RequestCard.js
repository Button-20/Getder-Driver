import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InvertedPins from "../../../assets/images/inverted-pins.svg";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";
import { useState } from "react";

const RequestCard = ({
  request,
  setAdjustFareModal,
  setRequest,
  submitOffer,
}) => {
  const [spinner, setSpinner] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={styles.heading}>Trip Details</Text>
            <View style={styles.dot} />
            <Text style={styles.subHeading}>1.4km</Text>
          </View>
          <Text style={styles.heading}>
            {request?.currency?.symbol}{" "}
            {Intl.NumberFormat().format(request?.suggested_price)}
          </Text>
        </View>
        <View style={styles.rideDetail}>
          <InvertedPins />
          <View style={styles.rideDetailTextContainer}>
            <View>
              <Text style={styles.rideDetailText}>Pick Up At</Text>
              <Text style={styles.rideDetailSubText}>
                {request?.pickup_location?.description}
              </Text>
            </View>
            <View>
              <Text style={styles.rideDetailText}>Drop Off At</Text>
              <Text style={styles.rideDetailSubText}>
                {request?.dropoff_location?.description}
              </Text>
            </View>
          </View>
        </View>
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
              setSpinner(true);
              await submitOffer(request);
              setSpinner(false);
            }}
          >
            <Text style={[styles.buttonText, { color: Colors.text_white }]}>
              {spinner ? <ActivityIndicator color="white" /> : "Accept Ride"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => {
              setRequest(request);
              setAdjustFareModal(true);
            }}
          >
            <Text style={styles.buttonText}>Adjust Price</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "100%",
    borderColor: "lightgrey",
    borderWidth: 1,
    marginBottom: Spacing.m,
  },

  container: {
    padding: Spacing.m,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.l,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.s,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
  },

  subHeading: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 360,
    backgroundColor: Colors.text_muted,
  },

  rideDetail: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: Spacing.m,
  },

  rideDetailTextContainer: {
    gap: Spacing.l,
  },

  rideDetailText: {
    textTransform: "uppercase",
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },

  rideDetailSubText: {
    fontFamily: Fonts.bold,
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

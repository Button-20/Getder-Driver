import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SemiCircleProgressBar from "../../components/ui/SemiCircleProgressBar";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";
const { width } = Dimensions.get("window");

const ChallengeCard = ({
  subHeading = "Ends on Monday",
  heading = "Complete 20 trips and get GHS 1000 extra",
  subText = "10,000 trips completed",
}) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.subHeading}>{subHeading}</Text>
        <Text style={styles.heading}>{heading}</Text>
        <Text
          style={[
            styles.subHeading,
            {
              color: Colors.text_success,
            },
          ]}
        >
          {subText}
        </Text>
      </View>
      <SemiCircleProgressBar percentage={180} exteriorCircleStyle={{}} />
    </View>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    height: 115,
    width: width / 1.1,
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: Spacing.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subHeading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xs,
    color: Colors.text_muted,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
    color: Colors.primary,
    marginVertical: Spacing.s,
    width: "85%",
  },
});

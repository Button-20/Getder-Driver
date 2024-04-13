import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const BottomSheetBackground = ({ style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderRadius: 20,
        },
        { ...style },
      ]}
    />
  );
};

const RateDriverModal = ({ bottomSheetRef4 }) => {
  const [rating, setRating] = useState(0);

  return (
    <BottomSheetModal
      ref={bottomSheetRef4}
      index={0}
      snapPoints={["43%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
      backgroundComponent={(props) => <BottomSheetBackground {...props} />}
      style={{
        borderRadius: 15,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <UserIcon width={50} height={50} /> */}
          <Image src="https://via.placeholder.com/50x50" style={styles.image} />
          <Text style={styles.headerText}>
            Rate your experience with Dennis
          </Text>
          <StarRating
            rating={rating}
            maxStars={5}
            starSize={45}
            enableHalfStar={false}
            onChange={setRating}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.ctaButton,
              {
                borderColor: "#CDCDCD",
              },
            ]}
            activeOpacity={0.5}
          >
            <Text style={[styles.buttonText]}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ctaButton,
              {
                backgroundColor: Colors.primary,
              },
            ]}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: Colors.text_white,
                },
              ]}
            >
              Rate Rider
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default RateDriverModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: "white",
    borderRadius: 15,
  },

  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.m,
    paddingTop: Spacing.xl,
  },

  headerText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },

  headerSubText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.bg_whitesmoke,
    borderBottomWidth: 1,
    padding: Spacing.l,
    paddingVertical: Spacing.m,
    justifyContent: "space-between",
  },

  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.m,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 360,
  },

  nameText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
    marginBottom: Spacing.xs,
  },

  nameSubText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },

  ctaButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    justifyContent: "flex-end",
  },

  button: {
    backgroundColor: Colors.text_muted_light,
    padding: Spacing.m,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },

  rideDetailSection: {
    padding: Spacing.l,
    borderBottomColor: Colors.bg_whitesmoke,
    borderBottomWidth: 1,
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

  rideDetailHeader: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    marginBottom: Spacing.l,
  },

  ctaButton: {
    padding: Spacing.l,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.l,
    borderRadius: 4,
    flex: 1,
    borderWidth: 1,
  },

  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },

  cancelBtn: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    justifyContent: "space-around",
    padding: Spacing.m,
    paddingVertical: Spacing.l,
    display: "none",
  },

  cancelContainer: {
    flexDirection: "row",
    gap: Spacing.s,
    justifyContent: "space-between",
  },

  cancelText: {
    fontFamily: Fonts.bold,
  },

  buttons: {
    flexDirection: "row",
    gap: Spacing.m,
    marginHorizontal: Spacing.m,
  },
});

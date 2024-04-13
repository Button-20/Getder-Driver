import { AntDesign, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InvertedPins from "../../../assets/images/inverted-pins.svg";
import Star from "../../../assets/images/star-outline-white.svg";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const RideInProgressModal = ({ bottomSheetRef3 }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetRef3}
      index={0}
      snapPoints={["30%", "50%", "70%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
      style={{
        borderRadius: 15,
      }}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading}>Ride in progress</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>16 min | 1.4 km</Text>
          <Text style={styles.headerSubText}>Dropping off Rebecca</Text>
        </View>
        <TouchableOpacity style={styles.cancelBtn} activeOpacity={1}>
          <View style={styles.cancelContainer}>
            <AntDesign
              name="exclamationcircle"
              size={20}
              color={Colors.bg_danger}
            />
            <Text
              style={[
                styles.cancelText,
                {
                  color: Colors.text_danger,
                },
              ]}
            >
              Tap here to cancel this ride, if {"\n"} passenger don’t show up.
            </Text>
          </View>
          <Feather name="chevron-right" size={24} color={Colors.text_danger} />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <View style={styles.profile}>
            {/* <UserIcon width={50} height={50} /> */}
            <Image
              src="https://via.placeholder.com/50x50"
              style={styles.image}
            />
            <View>
              <Text style={styles.nameText}>
                {"Dennis hermers".slice(0, 10) + "..."}
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Star width={15} height={15} />
            <Text style={styles.nameSubText}>4.4</Text>
          </View>
        </View>
        <View style={styles.rideDetailSection}>
          <Text style={styles.rideDetailHeader}>Ride Details</Text>
          <View style={styles.rideDetail}>
            <InvertedPins />
            <View style={styles.rideDetailTextContainer}>
              <View>
                <Text style={styles.rideDetailText}>Pick Up At</Text>
                <Text style={styles.rideDetailSubText}>
                  Lekki Palm City Estate, Ajah, Lagos
                </Text>
              </View>
              <View>
                <Text style={styles.rideDetailText}>Drop Off At</Text>
                <Text style={styles.rideDetailSubText}>
                  13A Allen , Ikeja, Lagos
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            {
              backgroundColor: Colors.primary,
              display: "none",
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
            Complete Ride <Feather name="arrow-right" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            {
              borderColor: Colors.bg_danger,
            },
          ]}
          activeOpacity={0.5}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: Colors.bg_danger,
              },
            ]}
          >
            Cancel Ride
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default RideInProgressModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    backgroundColor: Colors.bg_success_light,
    padding: Spacing.xl,
    paddingVertical: Spacing.l,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },

  heading: {
    color: "#06AC3D",
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.l,
    borderBottomColor: Colors.bg_whitesmoke,
    borderBottomWidth: 1,
  },

  headerText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
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

  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },

  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.m,
  },

  image: {
    width: 60,
    height: 60,
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
    color: Colors.text_white,
  },

  ratingContainer: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 360,
    padding: Spacing.s,
    gap: Spacing.s,
    paddingHorizontal: Spacing.xm,
    elevation: 5,
  },

  ctaButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    justifyContent: "flex-end",
  },

  ctaButton: {
    padding: Spacing.l,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.l,
    marginHorizontal: Spacing.m,
    borderRadius: 4,
    borderWidth: 1,
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

  cancelBtn: {
    backgroundColor: "#FEE2E9",
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
});

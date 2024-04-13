import { AntDesign, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ChatIcon from "../../../assets/images/chat.svg";
import InvertedPins from "../../../assets/images/inverted-pins.svg";
import Phone from "../../../assets/images/phone.svg";
import Star from "../../../assets/images/star-outline.svg";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const RideModal = ({ bottomSheetRef2, negotiation }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetRef2}
      index={0}
      snapPoints={["30%", "50%", "75%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
      style={{
        borderRadius: 15,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>4 min away</Text>
          <Text style={styles.headerSubText}>
            Picking up {negotiation?.request?.user?.firstname || "..."}
          </Text>
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
              Tap here to cancel this ride, if {"\n"} passenger doesn’t show up.
            </Text>
          </View>
          <Feather name="chevron-right" size={24} color={Colors.text_danger} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.profile}>
              {/* <UserIcon width={50} height={50} /> */}
              <Image
                src={
                  negotiation?.request?.user?.profile_picture ||
                  "https://via.placeholder.com/50x50"
                }
                style={styles.image}
              />
              <View>
                <Text style={styles.nameText}>
                  {(
                    negotiation?.request?.user?.firstname +
                    " " +
                    negotiation?.request?.user?.lastname
                  ).slice(0, 10) + "..."}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Spacing.xs,
                  }}
                >
                  <Star width={15} height={15} />
                  <Text style={styles.nameSubText}>4.4</Text>
                </View>
              </View>
            </View>
            <View style={styles.ctaButtons}>
              <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <Phone width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <ChatIcon width={20} height={20} />
              </TouchableOpacity>
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
                    {negotiation?.request?.pickup_location?.description}
                  </Text>
                </View>
                <View>
                  <Text style={styles.rideDetailText}>Drop Off At</Text>
                  <Text style={styles.rideDetailSubText}>
                    {negotiation?.request?.dropoff_location?.description}
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
              Arrived at pickup point
            </Text>
          </TouchableOpacity>
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
              Start ride <Feather name="arrow-right" size={20} />
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
        </ScrollView>
        <View style={{ marginBottom: Spacing.m }} />
      </View>
    </BottomSheetModal>
  );
};

export default RideModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: Spacing.m,
    borderRadius: 4,
    borderWidth: 1,
  },

  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },

  cancelBtn: {
    backgroundColor: "#FEE2E9",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    justifyContent: "space-around",
    padding: Spacing.m,
    paddingVertical: Spacing.l,
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

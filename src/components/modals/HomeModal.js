import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import OptionIcon from "../../../assets/images/option.svg";
import RequestCard from "../../components/application/RequestCard";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";
import ChallengeCard from "../application/ChallengeCard";
import AdjustFareForm from "../forms/AdjustFareForm";

const viewConfigRef = {
  viewAreaCoveragePercentThreshold: 95,
};

const HomeModal = ({
  bottomSheetRef,
  driver,
  adjustFareModal,
  setAdjustFareModal,
  getAllRequests,
  updateAvailability,
  requests,
  setRequests,
  setRequest,
  request,
  submitOffer,
  onViewRef,
  flatListRef,
  currentIndex,
}) => {
  const scaleX = useRef(new Animated.Value(1)).current;

  const weeklyChallenges = [
    {
      id: 1,
      component: <ChallengeCard />,
    },
    {
      id: 22,
      component: (
        <ChallengeCard
          subHeading="End of the year"
          heading="Weekly Challenge"
          subText="Complete this challenge to get your weekly cashback"
        />
      ),
    },
  ];

  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleX, {
        toValue: 0.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleX, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={["30%", "70%"]}
      enablePanDownToClose={false}
      handleComponent={() => (
        <TouchableOpacity
          style={[
            styles.onlineBtn,
            {
              backgroundColor: driver?.available
                ? Colors.bg_danger
                : Colors.bg_success,
            },
          ]}
          activeOpacity={1}
          onPress={async () => {
            setRequests([]);
            await updateAvailability(!driver?.available);
            !driver?.available === true && (await getAllRequests());
          }}
        >
          <Text style={[styles.onlineBtnText]}>
            {driver?.available ? "Go Offline" : "Go Online"}
          </Text>
        </TouchableOpacity>
      )}
      style={{
        borderRadius: 15,
      }}
    >
      {!adjustFareModal && (
        <>
          {requests?.length <= 0 && (
            <View style={styles.container}>
              {driver?.available && (
                <View style={styles.statsTable}>
                  <Text style={styles.statsTableHeader}>
                    Finding ride requests
                  </Text>
                  <View>
                    <View style={styles.statsTableDivider} />
                    <Animated.View
                      style={[
                        styles.animatedStatsTableDivider,
                        {
                          transform: [{ scaleX }],
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.statsTableRow}>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Earnings</Text>
                      <Text style={styles.statsTableColumnValue}>$100.00</Text>
                    </View>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Online</Text>
                      <Text style={styles.statsTableColumnValue}>
                        1 hr 30 mins
                      </Text>
                    </View>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Rides</Text>
                      <Text style={styles.statsTableColumnValue}>12</Text>
                    </View>
                  </View>
                </View>
              )}
              {!driver?.available && (
                <View style={styles.statsTable}>
                  <View style={styles.statsTableRow}>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Earnings</Text>
                      <Text style={styles.statsTableColumnValue}>$100.00</Text>
                    </View>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Online</Text>
                      <Text style={styles.statsTableColumnValue}>
                        1 hr 30 mins
                      </Text>
                    </View>
                    <View style={styles.statsTableColumn}>
                      <Text style={styles.statsTableColumnTitle}>Rides</Text>
                      <Text style={styles.statsTableColumnValue}>12</Text>
                    </View>
                  </View>
                </View>
              )}
              {!driver?.available && (
                <>
                  <TouchableOpacity
                    style={styles.drivingPreferenceBtn}
                    activeOpacity={0.5}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <OptionIcon />
                      <Text style={styles.drivingPreferenceBtnText}>
                        Driving Preference
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.heading}>Weekly Challenges</Text>
                  <FlatList
                    style={[
                      styles.list,
                      { marginTop: 0, paddingHorizontal: 0 },
                    ]}
                    data={weeklyChallenges}
                    renderItem={({ item }) => item.component}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    pagingEnabled
                    ref={(ref) => (flatListRef.current = ref)}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: Spacing.s }} />
                    )}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef}
                    showsHorizontalScrollIndicator={false}
                  />
                  <View style={styles.pagination}>
                    {weeklyChallenges.map((item, index) => (
                      <View
                        key={item.id}
                        style={[
                          styles.dot,
                          index === currentIndex && styles.activeDot,
                        ]}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
          )}

          {driver?.available && requests?.length > 0 && (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={[styles.list, { marginTop: 50 }]}
            >
              {requests.map((req, index) => (
                <RequestCard
                  key={index}
                  request={req}
                  setAdjustFareModal={setAdjustFareModal}
                  setRequest={setRequest}
                  submitOffer={submitOffer}
                />
              ))}
            </ScrollView>
          )}
        </>
      )}
      {adjustFareModal && (
        <AdjustFareForm
          setAdjustFareModal={setAdjustFareModal}
          request={request}
          submitOffer={submitOffer}
        />
      )}
    </BottomSheetModal>
  );
};

export default HomeModal;

const styles = StyleSheet.create({
  onlineBtn: {
    width: 150,
    height: 48,
    backgroundColor: Colors.bg_white,
    borderRadius: BorderRadii.xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: -20,
  },

  onlineBtnText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xm,
    textAlign: "center",
    color: "white",
  },

  container: {
    flex: 1,
    padding: Spacing.m,
  },

  statsTable: {
    borderWidth: 1,
    borderColor: "lightgrey",
    marginTop: Spacing.xl,
    width: "100%",
  },

  statsTableHeader: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    alignSelf: "center",
    marginVertical: Spacing.l,
  },

  statsTableDivider: {
    height: 5,
    backgroundColor: "lightgrey",
  },

  animatedStatsTableDivider: {
    height: 5,
    backgroundColor: Colors.primary,
    width: "100%",
    borderRadius: BorderRadii.xl,
    alignSelf: "center",
    position: "absolute",
    top: 0,
  },

  statsTableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.l,
  },

  statsTableColumn: {
    alignItems: "center",
  },

  statsTableColumnTitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xs,
    color: Colors.text_muted,
    marginBottom: Spacing.s,
  },

  statsTableColumnValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
    color: Colors.text_primary,
    marginBottom: Spacing.s,
  },

  drivingPreferenceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: Spacing.m,
    marginTop: Spacing.l,
    borderRadius: 4,
  },

  drivingPreferenceBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xm,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    color: Colors.primary,
    marginVertical: Spacing.l,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -90,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text_muted,
    marginHorizontal: Spacing.xs,
  },

  activeDot: {
    backgroundColor: Colors.primary,
  },

  list: {
    marginVertical: Spacing.s,
    marginTop: 20,
    paddingHorizontal: Spacing.m,
  },
});

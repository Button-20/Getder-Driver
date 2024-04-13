import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import VPCard from "../../../components/application/VPCard";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";

const viewConfigRef = {
  viewAreaCoveragePercentThreshold: 95,
};

const VehiclePreference = ({ step, setStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const preference = [
    {
      id: 1,
      name: "I have a car",
      description:
        "You own or planning to purchase a vehicle or vehicles and will drive myself but might also employ others to drive your vehicle",
      value: "has-a-car",
      image: require("../../../../assets/images/driver-carousel.jpg"),
    },
    {
      id: 2,
      name: "I need a car",
      description:
        "You own or planning to purchase a vehicle or vehicles and will drive myself but might also employ others to drive your vehicle",
      value: "needs-a-car",
      image: require("../../../../assets/images/driver-carousel-2.jpg"),
    },
  ];

  const flatListRef = useRef(null);

  const onViewRef = useRef(({ changed }) => {
    if (changed && changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  return (
    <>
      <Text style={styles.heading}>Tell us your vehicle preference</Text>
      <FlatList
        data={preference}
        style={styles.list}
        renderItem={({ item }) => <VPCard item={item} setStep={setStep} step={step} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref) => (flatListRef.current = ref)}
        viewabilityConfig={viewConfigRef}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.s }} />}
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={styles.pagination}>
        {preference.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </>
  );
};

export default VehiclePreference;

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginVertical: Spacing.s,
  },

  list: {
    marginVertical: Spacing.s,
    backgroundColor: "white",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 60,
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
});

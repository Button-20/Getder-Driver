import { AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserImage from "../../../assets/images/user.svg";
import { useDriverContext } from "../../context/DriverContext";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const CustomDrawerContent = (props) => {
  const { driver } = useDriverContext();
  // console.log(driver);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContainer}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.closeDrawer()}
          style={styles.closeDrawer}
        >
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.drawerItems}>
          {props.navigationsArray.map((navigation, index) => (
            <DrawerItem
              key={index}
              label={navigation.name}
              style={[
                styles.drawerItem,
                {
                  display: navigation.display ? "flex" : "none",
                },
              ]}
              labelStyle={{
                fontFamily: Fonts.bold,
                fontSize: FontSizes.l,
                color: "black",
              }}
              icon={() => navigation.icon}
              onPress={() => props.navigation.navigate(navigation.name)}
            />
          ))}
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.profileContainer}>
            {driver?.profile_picture ? (
              <Image src={driver?.profile_picture} style={styles.avatar} />
            ) : (
              <UserImage style={styles.avatar} />
            )}
            <View style={styles.profileDetails}>
              <Text style={styles.username}>
                {(driver?.firstname + " " + driver?.lastname).length > 10
                  ? (driver?.firstname + " " + driver?.lastname).substring(
                      0,
                      10
                    ) + "..."
                  : driver?.firstname + " " + driver?.lastname}
              </Text>
              <Text style={styles.subText}>
                {driver?.vehicle
                  ? driver?.vehicle?.brand + " " + driver?.vehicle?.model
                  : "No vehicle"}
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../../assets/images/star.png")}
              style={styles.star}
            />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  closeDrawer: {
    borderWidth: 1,
    borderRadius: BorderRadii.xl,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.l,
  },
  footerContainer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 10,
    gap: Spacing.s,
  },
  username: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
  },
  subText: {
    fontSize: FontSizes.s,
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: 25,
    height: 25,
  },
  rating: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
    marginLeft: 5,
  },
  drawerItems: {
    marginTop: 5,
  },
  drawerItem: {
    padding: 10,
    marginHorizontal: 20,
  },
});

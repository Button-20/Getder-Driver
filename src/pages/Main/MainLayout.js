import {
  DrawerToggleButton,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomDrawerContent from "../../components/ui/CustomDrawerContent.js";
import { LocationProvider } from "../../context/LocationContext";
import { NegotiationProvider } from "../../context/NegotiationContext";
import { Fonts } from "../../utils/styles";
import Earnings from "./Earnings/Earnings.js";
import Help from "./Help/Help.js";
import Home from "./Home/Home";
import Notifications from "./Notifications/Notifications.js";
import RideHistory from "./RideHistory/RideHistory.js";
import Settings from "./Settings/Settings.js";
import Wallet from "./Wallet/Wallet.js";

const Drawer = createDrawerNavigator();

const MainLayout = ({ navigations, navigation }) => {
  const navigationsArray = [
    {
      name: "Home",
      component: Home,
      headerShown: true,
      display: false,
    },
    // {
    //   name: "LocationSearch",
    //   component: LocationSearch,
    //   headerShown: false,
    //   icon: null,
    //   display: false,
    // },
    // {
    //   name: "RequestRide",
    //   component: RequestRide,
    //   headerShown: false,
    //   icon: null,
    //   display: false,
    // },
    // {
    //   name: "Chat",
    //   component: Chat,
    //   headerShown: false,
    //   icon: null,
    //   display: false,
    // },
    // {
    //   name: "RideOffers",
    //   component: RideOffers,
    //   headerShown: false,
    //   icon: null,
    //   display: false,
    // },
    // {
    //   name: "Profile",
    //   component: Profile,
    //   headerShown: false,
    //   icon: null,
    //   display: false,
    // },
    {
      name: "Ride History",
      component: RideHistory,
      headerShown: false,
      display: true,
    },
    {
      name: "Earnings",
      component: Earnings,
      headerShown: false,
      display: true,
    },
    {
      name: "Wallet",
      component: Wallet,
      headerShown: false,
      display: true,
    },
    {
      name: "Notifications",
      component: Notifications,
      headerShown: false,
      display: true,
    },
    {
      name: "Help",
      component: Help,
      headerShown: false,
      display: true,
    },
    {
      name: "Settings",
      component: Settings,
      headerShown: false,
      display: true,
    },
  ];

  useEffect(() => {
    // if (!authGuard()) {
    //   navigation.navigate("Home");
    // } else {
    //   navigation.navigate("Login");
    // }
  }, []);

  return (
    <LocationProvider>
      <NegotiationProvider>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              navigationsArray={navigationsArray}
              navigations={navigations}
            />
          )}
          screenOptions={{
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 360,
                  shadowColor: "black",
                  shadowRadius: 5,
                  shadowOpacity: 0.25,
                  padding: 10,
                  width: 50,
                  height: 50,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  elevation: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                <DrawerToggleButton />
              </TouchableOpacity>
            ),
          }}
        >
          {navigationsArray.map((navigation, index) => (
            <Drawer.Screen
              key={index}
              name={navigation.name}
              component={navigation.component}
              options={{
                headerTitle: "",
                headerShown: navigation.headerShown,
                headerTransparent: true,
                drawerIcon: navigation.icon,
                drawerLabelStyle: {
                  fontSize: 14,
                  color: "black",
                  fontFamily: Fonts.regular,
                  paddingVertical: 10,
                },
              }}
            />
          ))}
        </Drawer.Navigator>
      </NegotiationProvider>
    </LocationProvider>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { DriverProvider } from "./src/context/DriverContext";
import { PhoneAuthProvider } from "./src/context/PhoneAuthContext";
import { RegistrationProvider } from "./src/context/RegistrationContext";
import { SpinnerProvider } from "./src/context/SpinnerContext";
import DriverRegistrationLayout from "./src/pages/Auth/DriverRegistration/DriverRegistrationLayout";
import PhoneScreen from "./src/pages/Auth/PhoneScreen";
import Register from "./src/pages/Auth/Register";
import RegistrationSuccess from "./src/pages/Auth/RegistrationSuccess";
import VerifyCode from "./src/pages/Auth/VerifyCode";
import MainLayout from "./src/pages/Main/MainLayout";
import { FontSizes, Fonts } from "./src/utils/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigations = [
    {
      name: "PhoneScreen",
      component: PhoneScreen,
    },
    {
      name: "MainLayout",
      component: MainLayout,
    },
    {
      name: "Register",
      component: Register,
    },
    {
      name: "DriverRegistrationLayout",
      component: DriverRegistrationLayout,
    },
    {
      name: "VerifyCode",
      component: VerifyCode,
    },
    {
      name: "RegistrationSuccess",
      component: RegistrationSuccess,
    },
  ];

  const [fontsLoaded] = useFonts({
    Satoshi: require("./assets/fonts/Satoshi-Regular.otf"),
    "Satoshi Bold": require("./assets/fonts/Satoshi-Bold.otf"),
    "Satoshi Medium": require("./assets/fonts/Satoshi-Medium.otf"),
    "Satoshi Light": require("./assets/fonts/Satoshi-Light.otf"),
    "DM Sans": require("./assets/fonts/DMSans-Regular.ttf"),
    "DM Sans SemiBold": require("./assets/fonts/DMSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationContainer>
          <ToastProvider
            offsetTop={-1}
            textStyle={{ fontFamily: "Satoshi" }}
            duration={5000}
            renderToast={(toast) => (
              <View
                style={{
                  width: "100%",
                  backgroundColor:
                    toast.type == "success"
                      ? "#06C145"
                      : toast.type == "danger"
                      ? "#FF0000"
                      : "#868686",
                  padding: 30,
                  paddingTop: 40,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: Fonts.bold,
                    fontSize: FontSizes.xm,
                  }}
                >
                  {toast.message}
                </Text>
              </View>
            )}
          >
            <DriverProvider>
              <RegistrationProvider>
                  <SpinnerProvider>
                    <PhoneAuthProvider>
                      <Stack.Navigator>
                        {navigations.map((navigation, index) => (
                          <Stack.Screen
                            options={{
                              headerShown: false,
                            }}
                            key={index}
                            name={navigation.name}
                            component={navigation.component}
                          />
                        ))}
                      </Stack.Navigator>
                    </PhoneAuthProvider>
                  </SpinnerProvider>
              </RegistrationProvider>
            </DriverProvider>
          </ToastProvider>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

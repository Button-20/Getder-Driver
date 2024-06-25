import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import Restart from "../../../assets/images/restart.svg";
import BackButton from "../../components/ui/BackButton";
import { useDriverContext } from "../../context/DriverContext";
import { usePhoneAuthContext } from "../../context/PhoneAuthContext";
import { useSpinnerContext } from "../../context/SpinnerContext";
import { storageService } from "../../lib/storage.service";
import {
  getProfile,
  postLogin,
  sendOtp,
  verifyOtp,
} from "../../services/driver.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const VerifyCode = ({ route, navigation }) => {
  const { phoneAuth, setPhoneAuth } = usePhoneAuthContext();

  const { spinner, setSpinner } = useSpinnerContext();

  const { setDriver } = useDriverContext();

  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(30);

  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (otp) => {
    try {
      // Validate the form
      if (otp.length !== 4) return;

      setSpinner(true);
      // If there are no errors, submit the form
      const verificationResp = await verifyOtp({
        otp,
        phone: route.params.phone,
      });
      if (verificationResp.status !== 200)
        throw new Error(verificationResp.message);

      const resp = await postLogin({
        phone: route.params.phone,
        authMethod: "local",
      });

      await storageService.setAccessToken(resp.token);

      const profile = await getProfile();
      setDriver(profile.data || null);
      setOtp("");
      navigation.navigate("MainLayout");
      setSpinner(false);
    } catch (error) {
      console.log("Error: ", error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
      setSpinner(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <View>
        <BackButton navigation={navigation} />
        <Text style={styles.heading}>
          Enter the verification code {"\n"}sent to you
        </Text>
        <Text style={styles.subHeading}>
          We have sent a four digit code to {route.params.phone}
        </Text>
        <View style={styles.form}>
          <OtpInput
            numberOfDigits={4}
            focusColor={Colors.accent}
            value={otp}
            autoFocus
            onTextChange={(text) => setOtp(text)}
            onFilled={async (text) => await handleSubmit(text)}
            theme={{
              pinCodeTextStyle: {
                fontFamily: Fonts.bold,
              },
              pinCodeContainerStyle: {
                width: "20%",
              },
            }}
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={async () => {
            await sendOtp(route.params.phone);
            setTimer(30);
            setOtp("");
          }}
          style={styles.register}
          disabled={timer > 0}
        >
          <Restart style={{ width: 24, height: 24 }} />
          <Text style={styles.registerText}> Resend Code in {timer}s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={async () => {
            if (spinner) return;
            setSpinner(true);
            await handleSubmit(otp);
            setSpinner(false);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {spinner ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Next"
            )}
          </Text>
          {!spinner && <AntDesign name="arrowright" size={24} color="white" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.m,
    justifyContent: "space-between",
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.m,
  },

  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginTop: Spacing.m,
  },

  form: {
    marginTop: Spacing.xl,
  },

  formInput: {
    padding: 2,
    marginVertical: Spacing.s,
    borderWidth: 0.5,
    borderColor: Colors.text_muted,
    borderRadius: BorderRadii.s,
    fontFamily: Fonts.regular,
    width: "100%",
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.l,
  },

  register: {
    flexDirection: "row",
  },

  registerText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    paddingHorizontal: Spacing.s,
    alignItems: "center",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: Spacing.s,
    borderRadius: BorderRadii.s,
    width: 150,
    height: 60,
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    paddingHorizontal: Spacing.s,
    color: Colors.text_white,
  },
});

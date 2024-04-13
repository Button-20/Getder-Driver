import { AntDesign } from "@expo/vector-icons";

import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import BackButton from "../../components/ui/BackButton";
import { usePhoneAuthContext } from "../../context/PhoneAuthContext";
import { useSpinnerContext } from "../../context/SpinnerContext";
import { postLogin } from "../../services/driver.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";
import { phoneValidation } from "../../utils/validations";

const PhoneScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    phone: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  const { setPhoneAuth } = usePhoneAuthContext();

  const { spinner, setSpinner } = useSpinnerContext();

  const toast = useToast();

  const handleTextChange = (key, value) => {
    if (key === "phone") {
      if (phoneValidation(value)) {
        setErrors({ ...errors, phone: phoneValidation(value) });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }

    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { phone } = form;

    if (!phone) {
      setErrors({ ...errors, phone: "Phone number is required" });
      return;
    }

    setSpinner(true);

    try {
      const { status } = await postLogin({ phone, authMethod: "local" });

      if (status === 200) {
        const authCredential = await auth().signInWithPhoneNumber(phone);
        setPhoneAuth(authCredential);
        navigation.navigate("VerifyCode", { phone });
        setForm({ phone: "" });
      } else {
        toast.show("An error occurred", { type: "danger", placement: "top" });
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", placement: "top" });
    }

    setSpinner(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <View>
        <BackButton navigation={navigation} />
        <Text style={styles.heading}>Hey, tell us your mobile number</Text>
        <Text style={styles.subHeading}>
          We’ll send a verification code to this number
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>Phone Number</Text>
          <PhoneInput
            value={form.phone}
            defaultCode="GH"
            containerStyle={styles.formInput}
            textContainerStyle={{
              width: "100%",
              backgroundColor: "#fff",
            }}
            textInputStyle={{
              fontFamily: Fonts.regular,
              fontSize: FontSizes.m,
            }}
            codeTextStyle={{
              fontFamily: Fonts.regular,
              fontSize: FontSizes.m,
            }}
            placeholder="018 9384 9393"
            onChangeFormattedText={(text) => {
              handleTextChange("phone", text);
            }}
          />
          {errors.phone && (
            <Text style={styles.errorText}>
              <AntDesign name="exclamationcircleo" size={12} color="red" />
              {"  "}
              {errors.phone}
            </Text>
          )}
          {form.phone && !errors.phone && (
            <Text style={styles.validText}>
              <AntDesign
                name="checkcircleo"
                size={12}
                color={Colors.text_success}
              />
              {"  "}
              Phone number is correct
            </Text>
          )}
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.registerText}>I don't have an account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={async () => {
            await handleSubmit();
          }}
          style={
            errors.phone || spinner
              ? {
                  ...styles.button,
                  opacity: 0.5,
                }
              : styles.button
          }
          disabled={Boolean(!form.phone || errors.phone || spinner)}
        >
          <Text style={styles.buttonText}>
            {spinner ? <ActivityIndicator color="white" /> : "Next"}
          </Text>
          {!spinner && <AntDesign name="arrowright" size={24} color="white" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhoneScreen;

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
    marginTop: Spacing.s,
  },

  form: {
    marginTop: Spacing.l,
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

  errorText: {
    color: Colors.text_danger,
    fontSize: FontSizes.s,
    marginTop: Spacing.s,
    fontFamily: Fonts.medium,
  },

  validText: {
    color: Colors.text_success,
    fontSize: FontSizes.s,
    marginTop: Spacing.s,
    fontFamily: Fonts.medium,
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.l,
  },

  registerText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    paddingHorizontal: Spacing.s,
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

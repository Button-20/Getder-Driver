import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Restart from "../../../../assets/images/restart.svg";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";

const DriversLicence = ({ step, setStep }) => {
  const { registration, setRegistration } = useRegistrationContext();

  const uploadImage = async () => {
    const pickerImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!pickerImage.canceled) {
      setRegistration({
        ...registration,
        driversLicense: `data:image/jpg;base64,${pickerImage.assets[0].base64}`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>
          Take a photo of your Driver’s License
        </Text>
        <View style={styles.imageArea}>
          {registration?.driversLicense ? (
            <Image src={registration?.driversLicense} style={styles.image} />
          ) : (
            <TouchableOpacity
              style={styles.uploadBtn}
              activeOpacity={0.7}
              onPress={uploadImage}
            >
              <Feather name="upload" size={20} color="white" />
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.subHeading}>
          Make sure your driver license is no expired
        </Text>
        <Text style={styles.subHeading}>
          Please click a clear photo and avoid using flash
        </Text>
      </View>
      {registration?.driversLicense && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setRegistration({
                ...registration,
                driversLicense: null,
              });
            }}
            style={styles.register}
          >
            <Restart style={{ width: 24, height: 24 }} />
            <Text style={styles.registerText}> Re-upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setStep(step + 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DriversLicence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.s,
  },

  imageArea: {
    marginVertical: Spacing.l,
    alignItems: "center",
    justifyContent: "center",
    height: 226,
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    backgroundColor: Colors.bg_whitesmoke,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  uploadBtn: {
    backgroundColor: Colors.primary,
    padding: Spacing.m,
    paddingHorizontal: Spacing.l,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.s,
  },

  uploadBtnText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    color: Colors.text_white,
  },

  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.text_muted,
    textAlign: "center",
    marginTop: Spacing.s,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.s,
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

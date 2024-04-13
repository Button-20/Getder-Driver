import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Header from "../../../components/ui/Header";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import { useSpinnerContext } from "../../../context/SpinnerContext";
import { storageService } from "../../../lib/storage.service";
import { postRegister } from "../../../services/driver.service";
import {
  uploadToCloudinary,
  vehicleTypes,
} from "../../../services/miscellaneous.service";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";
import AddVehicle from "./AddVehicle";
import DriversLicence from "./DriversLicence";
import ProfilePhoto from "./ProfilePhoto";
import VehicleLicence from "./VehicleLicense";

const DriverRegistrationLayout = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const { spinner, setSpinner } = useSpinnerContext();

  const toast = useToast();

  const { registration, setRegistration } = useRegistrationContext();

  const customBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  const submitRegistration = async () => {
    try {
      if (
        !registration.firstname ||
        !registration.lastname ||
        !registration.email ||
        !registration.phone ||
        !registration.profile_picture ||
        !registration.driversLicense ||
        !registration.type ||
        !registration.brand ||
        !registration.model ||
        !registration.color ||
        !registration.plateNumber ||
        !registration.year
      ) {
        return;
      }

      setSpinner(true);

      let { data } = await vehicleTypes();

      const profile_picture = await uploadImage(registration.profile_picture);

      const driversLicense = await uploadImage(registration.driversLicense);

      const vehicle_license = await uploadImage(registration.vehicle_license);

      setRegistration({
        ...registration,
        profile_picture,
        driversLicense,
        vehicle_license,
        type: data.find((type) => type.type === registration.type)._id,
      });

      const resp = await postRegister(registration);

      if (resp) {
        await storageService.removeRegisterDriver();
        setRegistration(null);
        navigation.navigate("RegistrationSuccess");
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
    }
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        `${process.env.EXPO_PUBLIC_UNSIGNED_UPLOAD_PRESET}`
      );
      formData.append(
        "cloud_name",
        `${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );

      const resp = await uploadToCloudinary(formData);

      return resp.secure_url;
    } catch (error) {
      console.log(error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
      return null;
    } finally {
      setSpinner(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header heading="Driver Registration" customBack={customBack} />
      <Text style={styles.smallHeading}>Step {step} of 4</Text>
      {/* {step === 1 && <VehiclePreference setStep={setStep} step={step} />} */}
      {step === 1 && <AddVehicle setStep={setStep} step={step} />}
      {step === 2 && <DriversLicence setStep={setStep} step={step} />}
      {step === 3 && <VehicleLicence setStep={setStep} step={step} />}
      {step === 4 && (
        <ProfilePhoto
          submitRegistration={submitRegistration}
          spinner={spinner}
        />
      )}
    </SafeAreaView>
  );
};

export default DriverRegistrationLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: Spacing.m,
  },

  smallHeading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.s,
    color: Colors.primary,
  },
});

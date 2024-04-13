import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/ui/BackButton";
import FormInput from "../../components/ui/FormInput";

import { City } from "country-state-city";
import { useState } from "react";
import { useRegistrationContext } from "../../context/RegistrationContext";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";
import { emailValidation, phoneValidation } from "../../utils/validations";

const Register = ({ navigation }) => {
  const { registration, setRegistration } = useRegistrationContext();

  const [errors, setErrors] = useState({});

  const cities = City.getCitiesOfCountry("GH").map((city) => {
    return city.name;
  });

  const [citiesInGhana, setCitiesInGhana] = useState(cities);

  const handleValidation = (key, value) => {
    switch (key) {
      case "firstname":
        if (!value) {
          setErrors({
            ...errors,
            firstname: "First name is required",
          });
        } else if (value.length < 3) {
          setErrors({
            ...errors,
            firstname: "First name must be at least 3 characters",
          });
        } else {
          setErrors({
            ...errors,
            firstname: "",
          });
        }

        setRegistration({
          ...registration,
          firstname: value,
        });

        break;

      case "lastname":
        if (!value) {
          setErrors({
            ...errors,
            lastname: "Last name is required",
          });
        } else if (value.length < 3) {
          setErrors({
            ...errors,
            lastname: "Last name must be at least 3 characters",
          });
        } else {
          setErrors({
            ...errors,
            lastname: "",
          });
        }

        setRegistration({
          ...registration,
          lastname: value,
        });

        break;

      case "email":
        if (emailValidation(value)) {
          setErrors({
            ...errors,
            email: emailValidation(value),
          });
        } else {
          setErrors({
            ...errors,
            email: "",
          });
        }

        setRegistration({
          ...registration,
          email: value,
        });

        break;

      case "phone":
        if (phoneValidation(value)) {
          setErrors({
            ...errors,
            phone: phoneValidation(value),
          });
        } else {
          setErrors({
            ...errors,
            phone: "",
          });
        }

        setRegistration({
          ...registration,
          phone: value,
        });
        break;

      case "city":
        if (!value) {
          setErrors({
            ...errors,
            city: "City is required",
          });
        }

        setErrors({
          ...errors,
          city: "",
        });

        setRegistration({
          ...registration,
          city: value,
        });

        setCitiesInGhana(cities);

        break;

      default:
        break;
    }
  };

  const searchCity = (value) => {
    if (!value) {
      setCitiesInGhana(cities);
    } else {
      let filteredCities = City.getCitiesOfCountry("GH")
        .map((city) => {
          return city.name;
        })
        .filter((city) => {
          return city.toLowerCase().includes(value.toLowerCase());
        });
      setCitiesInGhana(filteredCities);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <View>
        <View style={styles.topSection}>
          <BackButton navigation={navigation} />
          <Text style={styles.heading}>Create Account</Text>
        </View>
      </View>
      <ScrollView
        style={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormInput
          label="First Name"
          placeholder="e.g. Daniel"
          value={registration?.firstname}
          onChangeText={(value) => handleValidation("firstname", value)}
          error={errors.firstname}
        />
        <FormInput
          label="Last Name"
          placeholder="e.g. Owusu"
          value={registration?.lastname}
          onChangeText={(value) => handleValidation("lastname", value)}
          error={errors.lastname}
        />
        <FormInput
          label="Email"
          placeholder="e.g. 0s9K7daniel@example.com"
          type="email"
          value={registration?.email}
          onChangeText={(value) => handleValidation("email", value)}
          error={errors.email}
        />
        <FormInput
          label="Phone number"
          placeholder="e.g. 018 9384 9393"
          type="phone"
          value={registration?.phone}
          onChangeText={(value) => handleValidation("phone", value)}
          error={errors.phone}
        />
        <FormInput
          label="City"
          placeholder="e.g. Accra"
          searchInputPlaceholder="Select your city"
          type="select"
          value={registration?.city}
          options={citiesInGhana}
          onChangeText={(value) => handleValidation("city", value)}
          onSearchInputChange={(value) => searchCity(value)}
        />
        <Text style={styles.subHeading}>
          By continuing, I agree to the{" "}
          <Text style={{ fontFamily: Fonts.bold }}>
            Terms of use & Privacy policy
          </Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("DriverRegistrationLayout");
          }}
          style={
            !registration?.firstname ||
            !registration?.lastname ||
            !registration?.email ||
            !registration?.phone ||
            !registration?.city
              ? {
                  ...styles.button,
                  opacity: 0.5,
                }
              : styles.button
          }
          disabled={
            !registration?.firstname ||
            !registration?.lastname ||
            !registration?.email ||
            !registration?.phone ||
            !registration?.city
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.m,
    justifyContent: "space-between",
  },

  topSection: {
    flexDirection: "row",
    gap: Spacing.xl,
  },

  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.s,
  },

  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: Spacing.xl,
  },

  button: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: Spacing.s,
    borderRadius: BorderRadii.s,
    height: 65,
    marginBottom: Spacing.xl,
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    paddingHorizontal: Spacing.s,
    color: Colors.text_white,
  },

  form: {
    marginTop: Spacing.l,
  },
});

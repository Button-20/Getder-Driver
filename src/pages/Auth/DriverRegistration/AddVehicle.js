import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "../../../components/ui/FormInput";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import {
  getColorsList,
  getListOfCars,
  vehicleTypes,
} from "../../../services/miscellaneous.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";

const { width } = Dimensions.get("window");

const AddVehicle = ({ setStep, step }) => {
  const { registration, setRegistration } = useRegistrationContext();

  const [cars, setCars] = useState(null);

  const [carBrands, setCarBrands] = useState([]);

  const [carModel, setCarModel] = useState([]);

  const [carTypes, setCarTypes] = useState([]);

  const [colors, setColors] = useState([]);

  useEffect(() => {
    const getCarBrands = async () => {
      const response = await getListOfCars();
      setCars(response.data);
      setCarBrands(Object.keys(response.data));
    };

    const getVehicleTypes = async () => {
      const response = await vehicleTypes();
      setCarTypes(response.data.map((type) => type.type));
    };

    const getColors = async () => {
      const response = await getColorsList();
      delete response.status;
      setColors([
        ...new Set(Object.keys(response).map((key) => toTitleCase(key))),
      ]);
    };

    getVehicleTypes();
    getCarBrands();
    getColors();
  }, []);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const searchCarBrand = (value) => {
    if (!value) {
      setCarBrands(Object.keys(cars));
    } else {
      let filteredBrands = Object.keys(cars).filter((brand) => {
        return brand.toLowerCase().includes(value.toLowerCase());
      });

      setCarBrands(filteredBrands);
    }
  };

  const searchCarModel = (value) => {
    if (!value) {
      setCarModel([
        ...new Set(
          cars[registration.brand].map((model) => {
            return model.Model;
          })
        ),
      ]);
    } else {
      let filteredModels = cars[registration.brand].filter((model) => {
        return model.Model.toLowerCase().includes(value.toLowerCase());
      });

      setCarModel([...new Set(filteredModels.map((model) => model.Model))]);
    }
  };

  const searchCarType = async (value) => {
    if (!value) {
      let resp = await vehicleTypes();
      setCarTypes(resp.data.map((type) => type.type));
    } else {
      let filteredTypes = carTypes.filter((type) => {
        return type.toLowerCase().includes(value.toLowerCase());
      });

      setCarTypes(filteredTypes);
    }
  };

  const searchCarColor = async (value) => {
    if (!value) {
      let resp = await getColorsList();
      delete resp.status;
      setColors([...new Set(Object.keys(resp).map((key) => toTitleCase(key)))]);
    } else {
      let filteredColors = colors.filter((color) => {
        return color.toLowerCase().includes(value.toLowerCase());
      });

      setColors(filteredColors);
    }
  };

  return (
    <>
      <Text style={styles.heading}>Add your vehicle</Text>
      <Text style={styles.subHeading}>
        Your vehicle must be 2005 or newer and at lease 4 doors and not slavaged
      </Text>
      <ScrollView
        style={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormInput
          label="Brand"
          placeholder="e.g. Toyota"
          searchInputPlaceholder="Search your car make"
          type="select"
          value={registration?.brand}
          options={carBrands}
          onSearchInputChange={searchCarBrand}
          onChangeText={(value) => {
            setRegistration({ ...registration, brand: value });
            setCarModel([
              ...new Set(
                cars[value].map((model) => {
                  return model.Model;
                })
              ),
            ]);
          }}
        />
        <FormInput
          label="Model"
          placeholder="e.g. Camry"
          searchInputPlaceholder="Search your car model"
          type="select"
          value={registration?.model}
          options={carModel}
          onSearchInputChange={searchCarModel}
          onChangeText={(value) => {
            setRegistration({ ...registration, model: value });
            searchCarModel();
          }}
        />
        <View style={styles.rowContainer}>
          <FormInput
            label="Year"
            placeholder="e.g. 2023"
            customStyle={{ width: width / 2 - 50 }}
            keyboardType="number-pad"
            value={registration?.year}
            onChangeText={(value) => {
              setRegistration({ ...registration, year: value });
            }}
          />
          <FormInput
            label="Color"
            placeholder="e.g. Black"
            searchInputPlaceholder="Search your car color"
            type="select"
            options={colors}
            value={registration?.color}
            onSearchInputChange={searchCarColor}
            onChangeText={async (value) => {
              setRegistration({ ...registration, color: value });
              await searchCarColor();
            }}
            customStyle={{ width: width / 2, marginTop: 0 }}
          />
        </View>
        <FormInput
          label="License plate number"
          placeholder="e.g 5WED347"
          value={registration?.plateNumber}
          onChangeText={(value) => {
            setRegistration({ ...registration, plateNumber: value });
          }}
        />
        <FormInput
          label="Vehicle type"
          placeholder="e.g. Comfort"
          searchInputPlaceholder="Search your car type"
          type="select"
          options={carTypes}
          value={registration?.type}
          onSearchInputChange={searchCarType}
          onChangeText={async (value) => {
            setRegistration({ ...registration, type: value });
            await searchCarType();
          }}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setStep(step + 1);
          }}
          style={
            !registration?.brand ||
            !registration?.model ||
            !registration?.year ||
            !registration?.color ||
            !registration?.plateNumber ||
            !registration?.type
              ? {
                  ...styles.button,
                  backgroundColor: Colors.primary,
                  opacity: 0.5,
                }
              : styles.button
          }
          disabled={
            !registration?.brand ||
            !registration?.model ||
            !registration?.year ||
            !registration?.color ||
            !registration?.plateNumber ||
            !registration?.type
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    color: Colors.primary,
    marginTop: Spacing.s,
  },

  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginTop: Spacing.s,
    color: Colors.primary,
  },

  form: {
    marginTop: Spacing.xl,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: Spacing.s,
    borderRadius: BorderRadii.s,
    height: 65,
    marginBottom: Spacing.xl,
    marginTop: Spacing.xl,
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    paddingHorizontal: Spacing.s,
    color: Colors.text_white,
  },
});

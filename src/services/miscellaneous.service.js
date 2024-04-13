import { get, post } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getListOfCars = async () => {
  return await get(`${API_URL}/miscellaneous/list_of_cars`);
};

export const vehicleTypes = async () => {
  return await get(`${API_URL}/vehicle_types`);
};

export const uploadToCloudinary = async (data) => {
  return await post(
    `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    false
  );
};

export const getColorsList = async () => {
  return await get(
    `https://cdn.jsdelivr.net/npm/css-color-names@1.0.1/css-color-names.json`
  );
};

export const getReverseGeocode = async (data) => {
  try {
    return await get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}&address=${data}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getTravelTime = async (data) => {
  try {
    return await get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${data.pickup_location}&destinations=${data.dropoff_location}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
    );
  } catch (error) {
    console.log(error);
  }
};

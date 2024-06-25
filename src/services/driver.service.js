import { get, post, put } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const postLogin = async ({ phone }) => {
  try {
    return await post(`${API_URL}/driver/login`, {
      phone,
    });
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const sendOtp = async (phone) => {
  try {
    return await post(`${API_URL}/send-otp`, { phone });
  } catch (error) {
    console.error("Error sending otp: ", error);
  }
};

export const verifyOtp = async (data) => {
  try {
    return await post(`${API_URL}/verify-otp`, {
      ...data,
    });
  } catch (error) {
    console.error("Error verifying otp: ", error);
  }
};

export const postRegister = async ({
  firstname,
  lastname,
  email,
  phone,
  profile_picture,
  driversLicense,
  type,
  brand,
  model,
  color,
  plateNumber,
  year,
  vehicle_license,
  roadWorthyCertificate,
}) => {
  try {
    console.log("registering...", {
      firstname,
      lastname,
      email,
      phone,
      profile_picture,
      driversLicense,
      type,
      brand,
      model,
      color,
      plateNumber,
      year,
      vehicle_license,
      roadWorthyCertificate,
    });
    return await post(`${API_URL}/driver`, {
      firstname,
      lastname,
      email,
      phone,
      profile_picture,
      driversLicense,
      type,
      brand,
      model,
      color,
      plateNumber,
      year,
      vehicle_license,
      roadWorthyCertificate,
    });
  } catch (error) {
    console.error("Error registering: ", error);
  }
};

export const getProfile = async () => {
  try {
    return await get(`${API_URL}/driver/profile`);
  } catch (error) {
    console.error("Error getting profile: ", error);
  }
};

export const updateProfile = async (data) => {
  try {
    return await put(`${API_URL}/driver/profile`, data);
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};

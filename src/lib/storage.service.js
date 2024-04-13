import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoES from "crypto-es";
const {
  LOCATION,
  NEGOTIATION,
  ACCESS_TOKEN,
  DRIVER,
  REGISTER_DRIVER,
} = require("../utils/variables");
const SECRET_KEY = process.env.EXPO_PUBLIC_SECRET_KEY;

const set = async (key, value) => {
  try {
    let encryptedValue = CryptoES.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();
    await AsyncStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error("Error setting storage: ", error);
  }
};

const get = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value) {
      let decryptedValue = CryptoES.AES.decrypt(value, SECRET_KEY);
      return JSON.parse(decryptedValue.toString(CryptoES.enc.Utf8));
    }
    return null;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(`Error getting storage ${key}: ${error.message}`);
    } else {
      console.error(`Error getting storage ${key}: `, error);
    }
  }
};

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing storage: ", error);
  }
};

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage: ", error);
  }
};

const setLocation = async (location) => {
  try {
    await set(LOCATION, location);
  } catch (error) {
    console.error("Error setting location: ", error);
  }
};

const getLocation = async () => {
  try {
    return await get(LOCATION);
  } catch (error) {
    console.error("Error getting location: ", error);
  }
};

const removeLocation = async () => {
  try {
    await remove(LOCATION);
  } catch (error) {
    console.error("Error removing location: ", error);
  }
};

const getNegotiation = async () => {
  try {
    return await get(NEGOTIATION);
  } catch (error) {
    console.error("Error getting request: ", error);
  }
};

const setNegotiation = async (request) => {
  try {
    await set(NEGOTIATION, request);
  } catch (error) {
    console.error("Error setting request: ", error);
  }
};

const removeNegotiation = async () => {
  try {
    await remove(NEGOTIATION);
  } catch (error) {
    console.error("Error removing request: ", error);
  }
};

const getAccessToken = async () => {
  try {
    return await get(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error getting access token: ", error);
  }
};

const setAccessToken = async (accessToken) => {
  try {
    await set(ACCESS_TOKEN, accessToken);
  } catch (error) {
    console.error("Error setting access token: ", error);
  }
};

const removeAccessToken = async () => {
  try {
    await remove(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error removing access token: ", error);
  }
};

const getDriverDetails = async () => {
  try {
    return await get(DRIVER);
  } catch (error) {
    console.error("Error getting driver details: ", error);
  }
};

const setDriverDetails = async (driver) => {
  try {
    await set(DRIVER, driver);
  } catch (error) {
    console.error("Error setting driver details: ", error);
  }
};

const removeDriverDetails = async () => {
  try {
    await remove(DRIVER);
  } catch (error) {
    console.error("Error removing driver details: ", error);
  }
};

const getRegisterDriver = async () => {
  try {
    return await get(REGISTER_DRIVER);
  } catch (error) {
    console.error("Error getting register driver: ", error);
  }
};

const setRegisterDriver = async (driver) => {
  try {
    await set(REGISTER_DRIVER, driver);
  } catch (error) {
    console.error("Error setting register driver: ", error);
  }
};

const removeRegisterDriver = async () => {
  try {
    await remove(REGISTER_DRIVER);
  } catch (error) {
    console.error("Error removing register driver: ", error);
  }
};

export const storageService = {
  set,
  get,
  remove,
  clear,
  setLocation,
  getLocation,
  removeLocation,
  getNegotiation,
  setNegotiation,
  removeNegotiation,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getDriverDetails,
  setDriverDetails,
  removeDriverDetails,
  getRegisterDriver,
  setRegisterDriver,
  removeRegisterDriver,
};

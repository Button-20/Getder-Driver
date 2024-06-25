import { get, post } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const postNegotiation = async ({
  request,
  price,
  code,
  symbol,
}) => {
  return await post(`${API_URL}/negotiation`, {
    request,
    price,
    code,
    symbol,
  });
};

export const getLatestRequests = async (data) => {
    return await get(`${API_URL}/requests/latest`, data);
}
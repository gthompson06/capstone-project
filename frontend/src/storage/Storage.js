import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTokens = async (access, refresh) => {
 try {
  console.log("tokens: " + access, refresh);
  await AsyncStorage.multiSet([
   ["accessToken", access],
   ["refreshToken", refresh],
  ]);
 } catch (error) {
  console.error("Failed to save tokens:", error);
 }
};

export const getTokens = async () => {
 try {
  const data = await AsyncStorage.multiGet(["accessToken", "refreshToken"]);
  return Object.fromEntries(data);
 } catch (error) {
  console.error("Failed to get tokens:", error);
  return {}; // fallback to avoid breaking app logic
 }
};

export const removeTokens = async () => {
 try {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
 } catch (error) {
  console.error("Failed to remove tokens:", error);
 }
};

export const saveUserId = async (userId) => {
 try {
  console.log("id: " + userId);
  await AsyncStorage.setItem("userId", userId);
 } catch (error) {
  console.error("Failed to save ID:", error);
 }
};

export const getUserId = async () => {
 try {
  const userId = await AsyncStorage.getItem("userId");
  return parseInt(userId);
 } catch (error) {
  console.error("Failed to get ID:", error);
  return {};
 }
};

export const removeUserId = async () => {
 try {
  await AsyncStorage.removeItem("userId");
 } catch (error) {
  console.error("Failed to remove ID:", error);
 }
};

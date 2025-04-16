import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
 getTokens,
 getUserId,
 saveTokens,
 saveUserId,
 removeTokens,
 removeUserId,
} from "../storage/Storage";
import { useNavigation } from "@react-navigation/native";

const Context = createContext();

export const AuthContext = ({ children }) => {
 // Variables to track during app use
 const [userId, setUserId] = useState(null);
 const [user, setUser] = useState(null);
 const [accessToken, setAccessToken] = useState(null);
 const [refreshToken, setRefreshToken] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigation = useNavigation();

 const login = async (username, password) => {
  try {
   setLoading(true);
   const url = "http://localhost:5161/worthy/user/login";
   const response = await fetch(url, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     UserName: username,
     Password: password,
    }),
   });
   console.log(response);
   if (!response.ok) {
    throw new Error("Invalid username or password");
   }

   const data = await response.json();
   if (
    data.message === "Login successful" &&
    data.user &&
    data.accessToken &&
    data.refreshToken
   ) {
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    saveTokens(data.accessToken, data.refreshToken);
    setUser(data.user);
    setUserId(data.user.userId);
    navigation.navigate("HomeScreen");
   } else {
    Alert.alert("Error", "Invalid username or password");
   }
   setLoading(false);
  } catch (error) {
   console.error("Error logging in:", error);
   Alert.alert("Error", "An error occurred while signing in");
  }
 };

 const logout = async () => {
  setLoading(true);
  removeTokens();
  setAccessToken(null);
  setRefreshToken(null);
  setUser(null);
  setUserId(null);
  setLoading(false);
  navigation.navigate("SignIn");
 };

 const refreshAccessToken = async () => {
  console.log("Refreshing access token...");
  try {
   setLoading(true);
   const url = "http://localhost:5161/worthy/auth/getNewAccessToken";
   const response = await fetch(url, {
    method: "GET",
   });
   if (!response.ok) {
    throw new Error("Error refreshing token");
   }

   const data = await response.json();
   setAccessToken(data.token);
   setLoading(false);
  } catch (error) {
   console.error("Error logging in:", error);
   Alert.alert("Error", "An error occurred while signing in");
  }
 };

 useEffect(() => {
  const initializeApp = async () => {
   const tokens = await getTokens();
   const userId = await getUserId();
   if (!tokens || !userId) {
    navigation.navigate("SignIn");
   } else {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUserId(userId);
    navigation.navigate("HomeScreen");
   }
   setLoading(false);
  };
  initializeApp();
 }, []);

 return (
  <Context.Provider
   value={{
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!accessToken && !!refreshToken,
   }}
  >
   {children}
  </Context.Provider>
 );
};

export const useAuth = () => useContext(Context);

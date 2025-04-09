// import React, { createContext, useContext, useState, useEffect } from 'react';
// import storage from "../storage/Storage";

// const AuthContext = createContext();

// export const Authenticator = ({ children }) => {

//     // variables to track during app use
//     const [userId, setUserId] = useState(null);
//     const [accessToken, setAccessToken] = useState(null);
//     const [refreshToken, setRefreshToken] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // on app load, get tokens and user id if logged in
//     useEffect(() => {
//         const loadTokens = async () => {
//             const { accessToken, refreshToken, userId } = await storage.getTokens();
//             if (accessToken && refreshToken && userId) {
//                 setAccessToken(accessToken);
//                 setRefreshToken(refreshToken);
//                 setUserId(userId);
//             }
//             setLoading(false);
//         };
//         loadTokens();
//     }, []);

//     return (
//         <AuthContext.Provider value={{
//             userId,
//             accessToken,
//             refreshToken,
//             loading,
//             login,
//             logout,
//             refreshAccessToken,
//             isAuthenticated: !!accessToken,
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(Context);

import React, { createContext, useContext, useState, useEffect } from "react";
import storage from "../storage/Storage";

const AuthContext = createContext();

export const Authenticator = ({ children }) => {
 // Variables to track during app use
 const [userId, setUserId] = useState(null);
 const [accessToken, setAccessToken] = useState(null);
 const [refreshToken, setRefreshToken] = useState(null);
 const [loading, setLoading] = useState(true);

 // Function to log in a user
 const login = async (newAccessToken, newRefreshToken, newUserId) => {
  await storage.setTokens(newAccessToken, newRefreshToken, newUserId);
  setAccessToken(newAccessToken);
  setRefreshToken(newRefreshToken);
  setUserId(newUserId);
 };

 // Function to log out a user
 const logout = async () => {
  await storage.clearTokens();
  setAccessToken(null);
  setRefreshToken(null);
  setUserId(null);
 };

 // Function to refresh the access token (implementation depends on your API)
 const refreshAccessToken = async () => {
  console.log("Refreshing access token...");
  // Your refresh token logic here
 };

 // On app load, get tokens and user ID if logged in
 useEffect(() => {
  const loadTokens = async () => {
   const tokens = await storage.getTokens();
   if (tokens?.accessToken && tokens?.refreshToken && tokens?.userId) {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUserId(tokens.userId);
   }
   setLoading(false);
  };
  loadTokens();
 }, []);

 return (
  <AuthContext.Provider
   value={{
    userId,
    accessToken,
    refreshToken,
    loading,
    login, // ✅ No more "not defined" error
    logout, // ✅ No more "not defined" error
    refreshAccessToken, // ✅ No more "not defined" error
    isAuthenticated: !!accessToken,
   }}
  >
   {children}
  </AuthContext.Provider>
 );
};

// Corrected useAuth Hook
export const useAuth = () => useContext(AuthContext);

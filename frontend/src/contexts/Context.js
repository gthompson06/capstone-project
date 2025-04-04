import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from "../storage/storage";

const AuthContext = createContext();

export const Authenticator = ({ children }) => {

    // variables to track during app use
    const [userId, setUserId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // on app load, get tokens and user id if logged in
    useEffect(() => {
        const loadTokens = async () => {
            const { accessToken, refreshToken, userId } = await storage.getTokens();
            if (accessToken && refreshToken && userId) {
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setUserId(userId);
            }
            setLoading(false);
        };
        loadTokens();
    }, []);

    return (
        <AuthContext.Provider value={{
            userId,
            accessToken,
            refreshToken,
            loading,
            login,
            logout,
            refreshAccessToken,
            isAuthenticated: !!accessToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(Context);

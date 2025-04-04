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

    const login = async (userId, password) => {
        const res = await fetch('https://your-api.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
        });

        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();

        await saveTokens(data.accessToken, data.refreshToken, userId);
        setUserId(userId);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
    };

    const logout = async () => {
        await clearTokens();
        setUserId(null);
        setAccessToken(null);
        setRefreshToken(null);
    };

    const refreshAccessToken = async () => {
        const res = await fetch('https://your-api.com/api/auth/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken, userId }),
        });

        if (!res.ok) return logout();
        const data = await res.json();

        await saveTokens(data.accessToken, data.refreshToken, userId);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
    };

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

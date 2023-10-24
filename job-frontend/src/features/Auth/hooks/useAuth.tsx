import { useState, useEffect } from 'react';
import { User } from '../SignUp/SignUp';

const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
const USER_STORAGE_KEY = 'auth_user';

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [authUser, setAuthUser] = useState<User | null>(null);

    // Function to log in the user
    const login = (access: string, refresh: string, user: User) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        setAuthUser(user);
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    };

    // Function to log out the user
    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setAuthUser(null);
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
    };

    useEffect(() => {
        // Check if the user is already logged in (e.g., on page refresh)
        const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (storedAccessToken && storedRefreshToken && storedUser) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);

    return { accessToken, refreshToken, authUser, login, logout };
};


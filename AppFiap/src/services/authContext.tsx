import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    username: string;
    role: string;
}

export const AuthContext = createContext<{
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
}>({
    token: null,
    user: null,
    setToken: () => {},
    setUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadTokenAndUser = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUserString = await AsyncStorage.getItem("user"); // Get user data as a string
    
            if (storedToken && storedUserString) {
                setToken(storedToken);
                try {
                    const storedUser = JSON.parse(storedUserString); // Parse the string back into a User object
    
                    //Validate storedUser type here
                    if(storedUser && typeof storedUser === 'object' && storedUser.hasOwnProperty('username') && storedUser.hasOwnProperty('role')) {
                        setUser(storedUser);
                        console.log(storedUser);
                    }
                    else {
                        console.error("Invalid user data retrieved from AsyncStorage.");
                        setUser(null);
                        console.log(storedUser);
                    }
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    setUser(null);
                }
            }
        };
        loadTokenAndUser();
    }, []);

    const value = { token, setToken, user, setUser };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  walletAddress: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  pendingEmail: string | null;
  setPendingEmail: (email: string) => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
}

// Custom storage for secure items if needed, but for Zustand persist AsyncStorage is usually sufficient
// for non-sensitive data, and we can keep the token in SecureStore manually.
// Here we will persist the session so the user stays logged in.

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      pendingEmail: null,
      
      setPendingEmail: (email: string) => set({ pendingEmail: email }),
      
      verifyOTP: async (otp: string) => {
        // Validation will happen in the component, this just confirms state
        const email = get().pendingEmail;
        if (!email) return false;

        // Mock setting a secure token
        await SecureStore.setItemAsync('auth_token', 'mock_jwt_token_12345');

        set({
          isAuthenticated: true,
          user: {
            id: 'usr_1234567890',
            email: email,
            walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
          },
          pendingEmail: null,
        });

        return true;
      },
      
      logout: async () => {
        await SecureStore.deleteItemAsync('auth_token');
        set({ isAuthenticated: false, user: null, pendingEmail: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

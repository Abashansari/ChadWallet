import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TokenDetailScreen from '../screens/TokenDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';

// Store
import { useAuthStore } from '../store/authStore';

// Components
import AnimatedTabBar from '../components/AnimatedTabBar';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade', // Smooth transitions between screens
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      
      {!isAuthenticated ? (
        // Auth Stack
        <Stack.Group>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen 
            name="OTPVerification" 
            component={OTPVerificationScreen}
            options={{ animation: 'slide_from_right' }}
          />
        </Stack.Group>
      ) : (
        // Protected Stack
        <Stack.Group>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="TokenDetail" 
            component={TokenDetailScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuthStore } from '../store/authStore';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const opacity = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    try {
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace(isAuthenticated ? 'MainTabs' : 'Login');
      });
    } catch (e: any) {
      console.error('CRASH in useEffect:', e.message);
    }
  }, [navigation, opacity, isAuthenticated]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Splash bg is white according to asset
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
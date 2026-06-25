import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { RADIUS, SPACING } from '../constants/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingWalletButtonProps {
  onPress: () => void;
}

export default function FloatingWalletButton({ onPress }: FloatingWalletButtonProps) {
  const { colors } = useTheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Subtle breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        })
      ])
    ).start();
  }, [scale]);

  return (
    <AnimatedPressable
      style={[
        styles.container,
        { backgroundColor: colors.accent, shadowColor: colors.accent },
        { transform: [{ scale }] }
      ]}
      onPress={() => {
        onPress();
        // Feedback animation
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          })
        ]).start();
      }}
    >
      <Ionicons name="wallet-outline" size={28} color="#FFFFFF" />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

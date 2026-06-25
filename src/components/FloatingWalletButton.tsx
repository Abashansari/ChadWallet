import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { RADIUS, SPACING } from '../constants/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingWalletButtonProps {
  onPress: () => void;
}

export default function FloatingWalletButton({ onPress }: FloatingWalletButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  React.useEffect(() => {
    // Subtle breathing animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: colors.accent, shadowColor: colors.accent },
      ]}
      onPress={() => {
        onPress();
        // Feedback animation
        scale.value = withSequence(
          withTiming(0.9, { duration: 100 }),
          withSpring(1, { damping: 10, stiffness: 300 })
        );
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

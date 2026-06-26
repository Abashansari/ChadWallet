import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DEFAULT_OTP } from '@env';

import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS } from '../constants/colors';
import { RootStackParamList } from '../types';
import { useAuthStore } from '../store/authStore';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

export default function OTPVerificationScreen({ route, navigation }: Props) {
  const { email } = route.params;
  const { colors } = useTheme();
  const verifyOTP = useAuthStore(state => state.verifyOTP);
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  
  const inputRef = useRef<TextInput>(null);

  // Auto-fill logic for development demo
  useEffect(() => {
    if (DEFAULT_OTP) {
      setTimeout(() => {
        setOtp(DEFAULT_OTP);
      }, 500);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    setError('');
    
    // Simulate network latency
    setTimeout(async () => {
      // For development, we validate against DEFAULT_OTP
      if (otp === DEFAULT_OTP) {
        const success = await verifyOTP(otp);
        if (!success) {
          setError('Verification failed. Please try again.');
          setIsLoading(false);
        }
        // If success, AppNavigator will automatically swap out the Auth stack
      } else {
        setError('Invalid OTP code. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleResend = () => {
    setCountdown(60);
    setOtp('');
    setError('');
    // Focus back on input
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View>
          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>

          <View style={styles.headerContainer}>
            <View style={[styles.iconPlaceholder, { backgroundColor: colors.surfaceElevated }]}>
              <Ionicons name="mail-unread" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Verify your email</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              We sent a 6-digit code to{'\n'}
              <Text style={[styles.emailText, { color: colors.textPrimary }]}>{email}</Text>
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.inputBackground, 
                  color: colors.textPrimary,
                  borderColor: error ? colors.negative : colors.border
                }
              ]}
              value={otp}
              onChangeText={(text) => {
                setOtp(text.replace(/[^0-9]/g, '').slice(0, 6));
                setError('');
              }}
              placeholder="000000"
              placeholderTextColor={colors.textTertiary}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
            />
            {error ? (
              <Text style={[styles.errorText, { color: colors.negative }]}>{error}</Text>
            ) : null}
          </View>

          <PrimaryButton
            title="Verify & Continue"
            onPress={handleVerify}
            disabled={otp.length !== 6}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Didn't receive the code?{' '}
          </Text>
          {countdown > 0 ? (
            <Text style={[styles.countdownText, { color: colors.textTertiary }]}>
              Resend in {countdown}s
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text style={[styles.resendText, { color: colors.primary }]}>Resend OTP</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailText: {
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  input: {
    height: 64,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 8,
  },
  errorText: {
    marginTop: SPACING.sm,
    fontSize: 14,
    textAlign: 'center',
  },
  primaryButton: {
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  footerText: {
    fontSize: 14,
  },
  countdownText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DEFAULT_EMAIL } from '@env';

import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS } from '../constants/colors';
import { RootStackParamList } from '../types';
import { useAuthStore } from '../store/authStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const setPendingEmail = useAuthStore(state => state.setPendingEmail);
  
  const [email, setEmail] = useState(DEFAULT_EMAIL || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = () => {
    if (!email) return;
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setPendingEmail(email);
      setIsLoading(false);
      navigation.navigate('OTPVerification', { email });
    }, 800);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: colors.surfaceElevated }]}>
            <Ionicons name="wallet" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.textPrimary }]}>ChadWallet</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            The premium memecoin trading terminal.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Pressable style={[styles.socialButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Ionicons name="logo-google" size={20} color={colors.textPrimary} style={styles.buttonIcon} />
            <Text style={[styles.socialButtonText, { color: colors.textPrimary }]}>Continue with Google</Text>
          </Pressable>

          <Pressable style={[styles.socialButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Ionicons name="logo-apple" size={20} color={colors.textPrimary} style={styles.buttonIcon} />
            <Text style={[styles.socialButtonText, { color: colors.textPrimary }]}>Continue with Apple</Text>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textTertiary }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email address</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.inputBackground, 
                  color: colors.textPrimary,
                  borderColor: colors.border
                }
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.primaryButton, 
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 },
              !email && { opacity: 0.5 }
            ]}
            onPress={handleEmailLogin}
            disabled={!email || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Continue with Email</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            By continuing, you agree to our{' '}
            <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>.
          </Text>
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
  headerContainer: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  logoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  formContainer: {
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  buttonIcon: {
    marginRight: SPACING.sm,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
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
    marginBottom: SPACING.xl,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    fontWeight: '600',
  },
});

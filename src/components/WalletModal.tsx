import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

interface WalletModalProps {
  visible: boolean;
  onClose: () => void;
  walletAddress: string;
}

export default function WalletModal({ visible, onClose, walletAddress }: WalletModalProps) {
  const { colors, mode } = useTheme();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(walletAddress);
    // You could add a toast notification here
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <View style={styles.handleBar} />
          
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Receive Funds
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Scan this QR code or copy the address below to receive tokens on Solana.
          </Text>

          <View style={[styles.qrContainer, { backgroundColor: '#FFFFFF' }]}>
            <QRCode
              value={walletAddress}
              size={200}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
          </View>

          <View style={[styles.addressContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.addressText, { color: colors.textPrimary }]} numberOfLines={1}>
              {walletAddress}
            </Text>
            <Pressable
              style={[styles.copyButton, { backgroundColor: colors.accent + '20' }]}
              onPress={handleCopy}
            >
              <Text style={[styles.copyText, { color: colors.accent }]}>Copy</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.closeButton, { backgroundColor: colors.background }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: colors.textPrimary }]}>
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(150,150,150,0.3)',
    borderRadius: 2,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  qrContainer: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    width: '100%',
    marginBottom: SPACING.xl,
  },
  addressText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    fontFamily: 'monospace',
    marginRight: SPACING.md,
  },
  copyButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  copyText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  closeButton: {
    width: '100%',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});

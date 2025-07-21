import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/Colors';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeX,
  pixelSizeY,
} from '../../../utils/index';
import { Typography } from '../../../utils/typography';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: pixelSizeX(16),
    },
    topSpacer: {
      height: normalizeHeight(50),
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: pixelSizeY(10),
    },
    logoIcon: {
      width: normalizeWidth(64),
      height: normalizeHeight(64),
      backgroundColor: '#5719e5',
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: pixelSizeY(8),
    },
    logoEmoji: {
      fontSize: normalizeFont(32),
    },
    logoText: {
      fontSize: normalizeFont(16),
      fontWeight: '600' as const,
      color: '#5719e5',
    },
    header: {
      alignItems: 'center',
      marginBottom: pixelSizeY(32),
    },
    title: {
      fontSize: normalizeFont(28),
      fontFamily: Typography.fontfamily.jakarta.jakartaBold,
      color: Colors.black,
      textAlign: 'center',
      marginBottom: pixelSizeY(12),
      lineHeight: normalizeFont(35),
    },
    subtitle: {
      fontSize: normalizeFont(16),
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      color: Colors.black,
      textAlign: 'center',
      lineHeight: normalizeFont(24),
      paddingHorizontal: pixelSizeX(8),
    },
    form: {
      marginBottom: pixelSizeY(24),
    },
    inputContainer: {
      marginBottom: pixelSizeY(12),
    },
    input: {
      height: normalizeHeight(64),
      color: Colors.black,
      backgroundColor: Colors.background,
      borderColor: Colors.inputBorder,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      borderWidth: 1,
      borderRadius: pixelSizeX(12),
      paddingHorizontal: pixelSizeX(16),
      fontSize: normalizeFont(16),
    },
    getCodeButton: {
      height: normalizeHeight(48),
      backgroundColor: Colors.primary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: pixelSizeY(10),
    },
    getCodeButtonText: {
      fontSize: normalizeFont(16),
      color: Colors.background,
      fontFamily: Typography.fontfamily.jakarta.jakartaBold,
    },
    backToLoginContainer: {
      alignItems: 'center',
      marginTop: pixelSizeY(16),
    },
    backToLoginText: {
      fontSize: normalizeFont(14),
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      color: Colors.grey,
      textAlign: 'center',
      lineHeight: normalizeFont(21),
    },
    error: {
      fontSize: normalizeFont(13),
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      color: Colors.error,
    },
  });
};

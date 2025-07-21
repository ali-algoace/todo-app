import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeX,
  pixelSizeY,
} from '../../../utils/index';
import { Spacing } from '../../../utils/spacing';
import { Typography } from '../../../utils/typography';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    header: {
      paddingHorizontal: pixelSizeX(Spacing.lg),
      paddingTop: pixelSizeY(Spacing.xxl),
      alignItems: 'center',
      marginBottom: pixelSizeY(Spacing.xl),
    },
    logoContainer: {
      marginBottom: pixelSizeY(Spacing.md),
    },
    logo: {
      width: normalizeWidth(60),
      height: normalizeHeight(60),
      backgroundColor: Colors.primary,
      borderRadius: 30,
    },
    title: {
      fontSize: normalizeFont(Typography.fontSize.xxxl),
      fontFamily: Typography.fontfamily.jakarta.jakartaBold,
      color: Colors.black,
      marginBottom: pixelSizeY(Spacing.md),
    },
    subtitle: {
      fontSize: normalizeFont(Typography.fontSize.md),
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      color: Colors.black,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: pixelSizeY(25),
    },
    input: {
      height: normalizeHeight(64),
      backgroundColor: Colors.background,
      color: Colors.black,
      borderColor: Colors.inputBorder,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      borderWidth: 1,
      borderRadius: pixelSizeX(12),
      paddingHorizontal: pixelSizeX(16),
      fontSize: normalizeFont(16),
    },
    form: {
      paddingHorizontal: pixelSizeX(Spacing.lg),
      marginBottom: pixelSizeY(Spacing.xl),
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: pixelSizeY(Spacing.xl),
    },
    forgotPasswordText: {
      fontSize: normalizeFont(Typography.fontSize.sm),
      color: Colors.grey,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      paddingTop: pixelSizeY(5),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: pixelSizeX(Spacing.lg),
      marginTop: 'auto',
      marginBottom: pixelSizeY(Spacing.xl),
    },
    footerText: {
      fontSize: normalizeFont(Typography.fontSize.md),
      color: Colors.grey,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
    },
    signUpText: {
      fontSize: normalizeFont(Typography.fontSize.md),
      color: Colors.primary,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      textDecorationLine: 'underline',
    },
    quickSignInContainer: {
      paddingTop: pixelSizeY(Spacing.lg),
      borderTopColor: Colors.stroke,
    },
    quickSignInLabel: {
      fontSize: normalizeFont(Typography.fontSize.sm),
      color: Colors.grey,
      textAlign: 'center',
      marginBottom: pixelSizeY(Spacing.xl),
    },
    testButton: {
      backgroundColor: Colors.secondaryGrey,
      paddingVertical: pixelSizeY(Spacing.sm),
      borderRadius: 8,
      marginBottom: pixelSizeY(Spacing.sm),
      alignItems: 'center',
    },
    testButtonText: {
      fontSize: normalizeFont(Typography.fontSize.sm),
      color: Colors.black,
      fontWeight: Typography.fontWeight.medium,
    },
    quickSignInButton: {
      backgroundColor: Colors.primary,
      paddingVertical: pixelSizeY(Spacing.sm),
      borderRadius: 8,
      alignItems: 'center',
    },
    quickSignInButtonText: {
      fontSize: normalizeFont(Typography.fontSize.sm),
      color: Colors.white,
      fontWeight: Typography.fontWeight.medium,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: pixelSizeY(10),
      backgroundColor: Colors.background,
      borderRadius: pixelSizeX(12),
    },
    passwordInput: {
      flex: 1,
      height: normalizeHeight(64),
      borderWidth: 1,
      borderTopLeftRadius: pixelSizeX(12),
      borderBottomLeftRadius: pixelSizeX(12),
      borderRightWidth: 0,
      paddingHorizontal: pixelSizeX(16),
      fontSize: normalizeFont(16),
      color: Colors.black,
      backgroundColor: Colors.background,
      borderColor: Colors.inputBorder,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
    },
    eyeButton: {
      height: normalizeHeight(64),
      width: normalizeWidth(56),
      backgroundColor: Colors.background,
      borderColor: Colors.inputBorder,
      borderWidth: 1,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      borderLeftWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    eyeIcon: {
      fontSize: normalizeFont(18),
    },
    loginButton: {
      height: normalizeHeight(52),
      backgroundColor: Colors.primary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: pixelSizeY(9),
    },
    loginButtonText: {
      fontSize: normalizeFont(16),
      fontFamily: Typography.fontfamily.jakarta.jakartaBold,
      color: Colors.white,
    },
    error: {
      fontSize: normalizeFont(13),
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
      color: Colors.error,
    },
  });
};

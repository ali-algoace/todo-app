import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import z from 'zod';
import { Logo } from '../../../assests/images';
import { SVG } from '../../../assests/svg';
import { NavigationProps } from '../../../types/NavigationTypes.';
import { formatTime } from '../../../utils';
import { Colors } from '../../../utils/Colors';
import { verificationSchema } from '../../../validation/Validation';
import { useStyles } from './Style';

interface VerificationCodeScreenProps {
  email?: string;
  onVerify?: (code: string) => void;
  onResendCode?: () => void;
  onSavePassword?: (password: string, confirmPassword: string) => void;
}

type VerificationFormData = z.infer<typeof verificationSchema>;

type VerificationRouteParams = {
  verificationType: 'emailVerification' | 'confirmPasswordVerification';
};

export const VerificationCodeScreen: React.FC<
  VerificationCodeScreenProps
> = () => {
  // timer
  const [timer, setTimer] = useState(60);

  // handle resend button
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  // handle password input
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //
  const [value, setValue] = useState('');

  // otp input
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // use params
  const route =
    useRoute<RouteProp<{ params: VerificationRouteParams }, 'params'>>();
  const { verificationType } = route.params;

  // navifation
  const navigation = useNavigation<NavigationProps>();

  // language
  const { t } = useTranslation();

  // component styles
  const styles = useStyles();

  // handle this for show timer
  useEffect(() => {
    setTimer(60);
    setIsResendDisabled(true);
  }, []);

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      type: verificationType,
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Timer countdown effect
  useEffect(() => {
    if (!isResendDisabled) return;

    const intervalId = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isResendDisabled]);

  // handle resend button
  const handleResend = () => {
    setTimer(60);
    setIsResendDisabled(true);
  };

  // handle verification using this function
  const handleVerification = (data: VerificationFormData) => {
    console.log('working', data);
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.content}>
        {/* Top Spacer */}
        <View style={styles.topSpacer} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={Logo.logo} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('verification.enterVerificationCode')}
          </Text>
          <Text style={styles.subtitle}>{t('verification.weSentACode')}</Text>
        </View>

        {/* Code Input */}
        <View style={styles.otpContainer}>
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <CodeField
                {...props}
                ref={ref}
                value={value}
                onChangeText={value => {
                  setValue(value);
                  field.onChange(value);
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            )}
          />
        </View>
        {errors.otp && (
          <Text style={styles.error}> {t(`errors.${errors.otp.message}`)}</Text>
        )}

        {/* Verify Button */}
        {verificationType === 'emailVerification' && (
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleSubmit(handleVerification)}
          >
            <Text style={styles.verifyButtonText}>{t('button.verify')}</Text>
          </TouchableOpacity>
        )}

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
          <Text style={styles.secondsText}>{t('verification.seconds')}</Text>
        </View>

        {/* Resend */}
        <View
          style={
            verificationType === 'emailVerification'
              ? styles.resendContainer
              : styles.resendContainerVerificationPassword
          }
        >
          <Text style={styles.resendText}>
            {t('verification.didnotreceiveACode')}{' '}
            <Text
              style={[
                styles.resendText,
                isResendDisabled && styles.resendTextDisabled,
              ]}
              onPress={isResendDisabled ? undefined : handleResend}
            >
              {t('button.resend')}
            </Text>
          </Text>
        </View>

        {/* Password Reset Section */}
        {verificationType && verificationType !== 'emailVerification' && (
          <View style={styles.passwordSection}>
            <Text style={styles.passwordSectionTitle}>
              {t('verification.setANewPasswordForYourAccount')}
            </Text>

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder={t('placeholder.enterYourPassword')}
                      placeholderTextColor={Colors.placeholder}
                      onChangeText={e => field.onChange(e)}
                      {...field}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eyeIcon}>
                        {showPassword ? (
                          <SVG.ShowPassword />
                        ) : (
                          <SVG.eyeClosed />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {verificationType === 'confirmPasswordVerification' &&
              'password' in errors &&
              errors.password && (
                <Text style={styles.error}>
                  {t(`errors.${errors.password.message}`)}
                </Text>
              )}

            {/* Confirm Password Input */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <View>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder={t('placeholder.confirmYourPassword')}
                      placeholderTextColor={Colors.placeholder}
                      onChangeText={e => field.onChange(e)}
                      {...field}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.eyeButton}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Text style={styles.eyeIcon}>
                        {showConfirmPassword ? (
                          <SVG.ShowPassword />
                        ) : (
                          <SVG.eyeClosed />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {verificationType === 'confirmPasswordVerification' &&
              'confirmPassword' in errors &&
              errors.confirmPassword && (
                <Text style={styles.error}>
                  {t(`errors.${errors.confirmPassword.message}`)}
                </Text>
              )}

            {/* Save Password Button */}
            <TouchableOpacity
              onPress={handleSubmit(handleVerification)}
              style={styles.savePasswordButton}
            >
              <Text style={styles.savePasswordButtonText}>
                {t('button.savePassword')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;

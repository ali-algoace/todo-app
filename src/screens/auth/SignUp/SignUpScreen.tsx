import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import z from 'zod';
import { Logo } from '../../../assests/images';
import { SVG } from '../../../assests/svg';
import { NavigationProps } from '../../../types/NavigationTypes.';
import { Colors } from '../../../utils/Colors';
import { signUpSchema } from '../../../validation/Validation';
import { useStyles } from './Style';

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpScreen: React.FC = () => {
  // handle password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  // styles
  const styles = useStyles();

  // language
  const { t } = useTranslation();

  // forms
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  // handle signup using this function
  const handleSignUp = (data: SignUpFormData) => {
    console.log('working', data);
    navigation.navigate('VerificationCode', {
      verificationType: 'emailVerification',
    });
  };

  // handle login navigation button
  const handleLoginNaviagtion = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Main Content - Scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={Logo.logo} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('signUp.createAnAccount')}</Text>
          <Text style={styles.subtitle}>{t('signUp.signUpText')}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Input */}
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('placeholder.fullName')}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={e => field.onChange(e)}
                  {...field}
                />
                {errors.fullName && (
                  <Text style={styles.error}>
                    {t(`errors.${errors.fullName.message}`)}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('placeholder.email')}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={e => field.onChange(e)}
                  {...field}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.error}>
                    {t(`errors.${errors.email.message}`)}
                  </Text>
                )}
              </View>
            )}
          />

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
                      {showPassword ? <SVG.ShowPassword /> : <SVG.eyeClosed />}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.error}>
                    {t(`errors.${errors.password.message}`)}
                  </Text>
                )}
              </View>
            )}
          />

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
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {errors.confirmPassword && (
                  <Text style={styles.error}>
                    {t(`errors.${errors.confirmPassword.message}`)}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Terms and Conditions */}
          <Controller
            control={control}
            name="agreeToTerms"
            render={({ field: { value, onChange } }) => (
              <View>
                <View style={styles.termsContainer}>
                  <TouchableOpacity onPress={() => onChange(!value)}>
                    <View
                      style={[styles.checkbox, value && styles.checkboxChecked]}
                    >
                      {value && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    {t('signUp.iAgreeToTheTermsAndConditions')}
                  </Text>
                </View>
                {errors.agreeToTerms && (
                  <Text style={styles.error}>
                    {' '}
                    {t(`errors.${errors.agreeToTerms.message}`)}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSubmit(handleSignUp)}
          >
            <Text style={styles.signUpButtonText}>{t('button.signUp')}</Text>
          </TouchableOpacity>

          {/* Or sign up with */}
          <Text style={styles.orText}>{t('labels.orSignUpWith')}</Text>
        </View>
      </ScrollView>

      {/* Footer - Always visible at bottom */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('labels.alreadyHaveAnAccount')}
          <Text style={styles.signInText} onPress={handleLoginNaviagtion}>
            {t('button.login')}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

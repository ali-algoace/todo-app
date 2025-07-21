import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import z from 'zod';
import { Logo } from '../../../assests/images';
import { SVG } from '../../../assests/svg';
import { useAuthStore } from '../../../Store/authStore';
import { NavigationProps } from '../../../types/NavigationTypes.';
import { Colors } from '../../../utils/colors';
import { signInSchema } from '../../../validation/Validation';
import { useStyles } from './Style';

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInScreen: React.FC = () => {
  // language
  const { t } = useTranslation();

  // handle password toggle
  const [showPassword, setShowPassword] = useState(false);

  const setAuthenticated = useAuthStore(state => state.setAuthenticate);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  // component styles
  const styles = useStyles();

  // forms
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // logo

  // handle signIn using this function
  const handleSignIn = (data: SignInFormData) => {
    console.log('working', data);
    setAuthenticated(true);
    // navigation.navigate('main');
  };

  // handle Forgot password navigation using this function
  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  // handle signup navigation using this function
  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={Logo.logo} />
        </View>
        <Text style={styles.title}>{t('signIn.welcomeBack')}</Text>
        <Text style={styles.subtitle}>{t('signIn.loginText')}</Text>
      </View>

      <View style={styles.form}>
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

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={onForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>
            {t('labels.forgotPassword')}
          </Text>
        </TouchableOpacity>

        {/* login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text style={styles.loginButtonText}>{t('button.login')}</Text>
        </TouchableOpacity>

        <View style={styles.quickSignInContainer}>
          <Text style={styles.quickSignInLabel}>{t('labels.OrLoginWith')}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('labels.DontHaveAnAccount')}</Text>
        <TouchableOpacity onPress={onSignUp}>
          <Text style={styles.signUpText}>{t('button.signUp')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

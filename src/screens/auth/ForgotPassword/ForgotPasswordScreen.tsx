import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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
import { NavigationProps } from '../../../types/NavigationTypes.';
import { Colors } from '../../../utils/Colors';
import { forgotPasswordSchema } from '../../../validation/Validation';
import { useStyles } from './Style';
import { Logo } from '../../../assests/images';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordScreen: React.FC = () => {
  // language
  const { t } = useTranslation();

  // component styles
  const styles = useStyles();

  // navigation
  const navigation = useNavigation<NavigationProps>();

  // forms
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // handle forgot password using this function using this function
  const handleGetCode = (data: ForgotPasswordFormData) => {
    console.log('working', data);
    navigation.navigate('VerificationCode', {
      verificationType: 'confirmPasswordVerification',
    });
  };

  // handle login back navigation using this function
  const onBackToLogin = () => {
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
          <View style={styles.logoContainer}>
            <Image source={Logo.logo} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('labels.forgotPassword')}</Text>
          <Text style={styles.subtitle}>
            {t('labels.noWorriesEnterYourEmail')}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('placeholder.forgotEmail')}
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

          {/* Get Code Button */}
          <TouchableOpacity
            style={styles.getCodeButton}
            onPress={handleSubmit(handleGetCode)}
          >
            <Text style={styles.getCodeButtonText}>{t('button.getCode')}</Text>
          </TouchableOpacity>

          {/* Back to Login - Positioned right after Get Code button */}
          <TouchableOpacity
            style={styles.backToLoginContainer}
            onPress={onBackToLogin}
          >
            <Text style={styles.backToLoginText}>
              {t('labels.backToLogin')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

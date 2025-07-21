import z from 'zod';
import { REGEX } from '../utils/regex';

// sign in schema
export const signInSchema = z.object({
  email: z.string().min(1, 'emailReq').email('invalidEmail'),
  password: z
    .string()
    .trim()
    .refine(value => value.trim().length > 0, {
      message: 'passReq',
    }),
});

// sign up schema
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'fullNameReq')
      .max(50, 'fullNameMax')
      .refine(val => val.length >= 2, { message: 'fullNameMin' })
      .refine(val => REGEX.firstName.test(val), {
        message: 'fullNameValid',
      }),

    email: z.string().min(1, 'emailReq').email('invalidEmail'),
    agreeToTerms: z.boolean().refine(val => val, {
      message: 'youMustAgreeToTheTerms',
    }),
    password: z
      .string()
      .trim()
      .max(256, { message: 'maxPassword' })
      .refine(value => value.trim().length > 0, {
        message: 'passReq',
      })
      .refine(value => REGEX.password.test(value), {
        message: 'validPassword',
      }),
    confirmPassword: z
      .string()
      .trim()
      .refine(value => value.trim().length > 0, {
        message: 'confirmPassReq',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'confrimPasswordNotMatch',
    path: ['confirmPassword'],
  });

// forogt password schema
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'emailReq').email('invalidEmail'),
});

// verification screen schema
const fields = {
  otp: z
    .string()
    .min(1, { message: 'enterOtp' })
    .length(6, { message: 'otp6Digits' }),
  newPassword: z
    .string()
    .trim()
    .max(256, { message: 'maxPassword' })
    .refine(value => value.trim().length > 0, {
      message: 'passReq',
    })
    .refine(value => REGEX.password.test(value), {
      message: 'validPassword',
    }),
  confirmPassword: z
    .string()
    .trim()
    .refine(value => value.trim().length > 0, {
      message: 'confirmPassReq',
    }),
};

const typeEnum = z.enum(['emailVerification', 'confirmPasswordVerification']);

const emailVerification = z.object({
  type: z.literal(typeEnum.enum.emailVerification),
  otp: fields.otp,
});

const confirmPasswordVerification = z.object({
  type: z.literal(typeEnum.enum.confirmPasswordVerification),
  otp: fields.otp,
  password: fields.newPassword,
  confirmPassword: fields.confirmPassword,
});

export const baseVerificationSchema = z.discriminatedUnion('type', [
  emailVerification,
  confirmPasswordVerification,
]);

export const verificationSchema = baseVerificationSchema.refine(
  data => {
    if (data.type === 'confirmPasswordVerification') {
      return data.password === data.confirmPassword;
    }
    return true;
  },
  {
    message: 'newPassConfirmPassNotMatch',
    path: ['confirmPassword'],
  },
);

// change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .refine(value => value.trim().length > 0, {
        message: 'currentPassReq',
      }),

    newPassword: z
      .string()
      .trim()
      .max(256, { message: 'maxPassword' })
      .refine(value => value.trim().length > 0, {
        message: 'newPassReq',
      })
      .refine(value => REGEX.password.test(value), {
        message: 'validPassword',
      }),
    confirmPassword: z
      .string()
      .trim()
      .refine(value => value.trim().length > 0, {
        message: 'confirmPassReq',
      }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'newPassConfirmPassNotMatch',
    path: ['confirmPassword'],
  });

// delete account schema
export const deleteAccountSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .refine(value => value.trim().length > 0, {
        message: 'currentPassReq',
      }),
    confirmPassword: z
      .string()
      .trim()
      .refine(value => value.trim().length > 0, {
        message: 'confirmPassReq',
      }),
  })
  .refine(data => data.currentPassword === data.confirmPassword, {
    message: 'confrimPasswordNotMatch',
    path: ['confirmPassword'],
  });

// edit profile schema
export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, 'fullNameReq')
    .max(25, 'firstNameReq')
    .refine(val => val.length >= 2, { message: 'fullNameMax' })
    .refine(val => REGEX.firstName.test(val), {
      message: 'fullNameValid',
    }),
  email: z.string().min(1, 'emailReq').email('invalidEmail'),
  profileImg: z.string().min(1, 'profilePicReq'),
});

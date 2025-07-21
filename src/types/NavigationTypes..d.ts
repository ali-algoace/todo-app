import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Product } from './types';

export type StackParamList = {
  SignIn: undefined;
  main: undefined;
  SignUp: undefined;
  Cart: undefined;
  ForgotPassword: undefined;
  VerificationCode: {
    verificationType: string;
  };
  ProductDetail: { product: Product };
};
export type NavigationProps = NativeStackNavigationProp<StackParamList>;

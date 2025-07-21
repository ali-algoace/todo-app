/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SVG } from '../assests/svg';
import { DrawerContent } from '../components/common/DrawerContent/DrawerContent';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword/ForgotPasswordScreen';
import SignInScreen from '../screens/auth/SignIn/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUp/SignUpScreen';
import VerificationCodeScreen from '../screens/auth/Verification/VerificationCodeScreen';
import MainScreen from '../screens/main/MainScreen';
import { useAuthStore } from '../Store/authStore';
import { normalizeFont } from '../utils';
import { Typography } from '../utils/typography';
import { Colors } from '../utils/Colors';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerificationCode: { email?: string };
  Main: undefined;
  ProductDetail: { product: any };
  MyOrders: undefined;
  Wishlist: undefined;
  ChangePassword: undefined;
  EditProfile: undefined;
  ChangeLanguage: undefined;
  DeleteAccount: undefined;
  Category: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <SVG.eyeClosed
              {...(focused && { fill: Colors.primary })}
              {...(!focused && { stroke: Colors.grey })}
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: Typography.fontfamily.jakarta.jakartaMedium,
            fontSize: normalizeFont(12),
          },
        }}
        name="Home"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVG.eyeClosed
                strokeWidth={1}
                stroke={Colors.primary}
                fill={Colors.primary}
              />
            ) : (
              <SVG.eyeClosed />
            ),
          tabBarLabelStyle: {
            fontFamily: Typography.fontfamily.jakarta.jakartaMedium,
            fontSize: normalizeFont(12),
          },
        }}
        name="Shop"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVG.eyeClosed fill={Colors.primary} />
            ) : (
              <SVG.eyeClosed fill={Colors.primary} />
            ),
          tabBarLabelStyle: {
            fontFamily: Typography.fontfamily.jakarta.jakartaMedium,
            fontSize: normalizeFont(12),
          },
        }}
        name="Cart"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <SVG.eyeClosed
              {...(focused && { fill: Colors.primary })}
              {...(!focused && { stroke: Colors.grey })}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: Typography.fontfamily.jakarta.jakartaMedium,
            fontSize: normalizeFont(12),
          },
        }}
        name="Settings"
        component={MainScreen}
      />
    </Tab.Navigator>
  );
};

const MainDrawerNavigator = ({
  handleSignOut,
}: {
  handleSignOut: () => void;
}) => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => (
      <DrawerContent {...props} onLogout={handleSignOut} />
    )}
  >
    <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
  </Drawer.Navigator>
);

export const AppNavigator: React.FC = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuthenticated = useAuthStore(state => state.setAuthenticate);
  const isAuthenticated = useAuthStore(state => state.isAuthenticate);

  // const handleSignUp = () => setIsAuthenticated(true);
  const handleSignOut = () => setAuthenticated(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen />}
            </Stack.Screen>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="VerificationCode"
              component={VerificationCodeScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main">
              {() => <MainDrawerNavigator handleSignOut={handleSignOut} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

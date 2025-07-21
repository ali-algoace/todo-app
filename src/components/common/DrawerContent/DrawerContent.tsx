import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SVG } from '../../../assests/svg';
import { Colors } from '../../../utils/Colors';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeX,
  pixelSizeY,
} from '../../../utils/index';
import { Typography } from '../../../utils/typography';

interface DrawerMenuItem {
  id: string;
  title: string;
  icon: any;
  onPress: () => void;
}

interface DrawerContentProps {
  navigation: any;
  onLogout?: () => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  navigation,
  onLogout,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const menuItems: DrawerMenuItem[] = [
    {
      id: 'home',
      title: 'home',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => {
        navigation.navigate('MainTabs', { screen: 'Home' });
        navigation.closeDrawer();
      },
    },
    {
      id: 'category',
      title: 'category',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => {
        navigation.navigate('Category');
        navigation.closeDrawer();
      },
    },
    {
      id: 'orders',
      title: 'orders',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => {
        navigation.navigate('MyOrders');
        navigation.closeDrawer();
      },
    },
    {
      id: 'wishlist',
      title: 'wishlist',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => {
        navigation.navigate('Wishlist');
        navigation.closeDrawer();
      },
    },
    {
      id: 'refund',
      title: 'refund',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => console.log('Refund policy pressed'),
    },
    {
      id: 'terms',
      title: 'terms',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => console.log('Terms & Condition pressed'),
    },
    {
      id: 'privacy',
      title: 'privacy',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => console.log('Privacy policy pressed'),
    },
    {
      id: 'help',
      title: 'help',
      icon: <SVG.ShowPassword fill={Colors.black} />,
      onPress: () => console.log('Privacy policy pressed'),
    },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              {/* Placeholder for user image */}
              <Text style={styles.profileImageText}>AJ</Text>
            </View>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@email.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.menuText}>{t(`labels.${item.title}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    scrollView: {
      flex: 1,
    },
    profileSection: {
      paddingHorizontal: pixelSizeX(19),
      paddingTop: pixelSizeY(40),
      paddingBottom: pixelSizeY(20),
      alignItems: 'flex-start',
    },
    profileImageContainer: {
      marginBottom: pixelSizeY(5),
    },
    profileImage: {
      width: normalizeWidth(60),
      height: normalizeHeight(60),
      borderRadius: 8,
      backgroundColor: '#ffb4a3',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImageText: {
      fontSize: normalizeFont(24),
      fontWeight: 'bold',
      color: '#1c1921',
    },
    userName: {
      fontSize: normalizeFont(16),
      fontWeight: 'bold',
      color: Colors.black,
      lineHeight: 20,
      marginBottom: pixelSizeY(5),
      fontFamily: Typography.fontfamily.jakarta.jakartaBold,
    },
    userEmail: {
      fontSize: normalizeFont(14),
      fontWeight: '400',
      color: Colors.grey,
      lineHeight: 21,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
    },
    menuSection: {
      paddingHorizontal: 0,
      // gap: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: pixelSizeX(16),
      paddingVertical: pixelSizeY(10),
      minHeight: normalizeHeight(56),
      // backgroundColor: '#fafafa',
    },
    menuIconContainer: {
      width: normalizeWidth(40),
      height: normalizeHeight(40),
      borderRadius: 8,
      backgroundColor: Colors.secondaryGrey,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: pixelSizeX(16),
    },
    menuIcon: {
      fontSize: normalizeFont(18),
      color: '#1c1921',
    },
    menuText: {
      fontSize: normalizeFont(16),
      fontWeight: '400',
      color: Colors.black,
      lineHeight: 24,
      flex: 1,
      fontFamily: Typography.fontfamily.jakarta.jakartaRegular,
    },
    logoutSection: {
      paddingHorizontal: pixelSizeX(16),
      paddingVertical: pixelSizeY(20),
      alignItems: 'center',
    },
    logoutButton: {
      paddingVertical: pixelSizeY(12),
    },
    logoutText: {
      fontSize: normalizeFont(16),
      fontWeight: '600',
      color: Colors.grey,
      textDecorationLine: 'underline',
    },
  });
};

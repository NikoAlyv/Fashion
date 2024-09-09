import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';
import {Routes} from '../routes/routes';
import {SvgImage} from '../components/SvgImages';
import {Text, View} from 'react-native';
import {CommonStyles} from '../theme/common.styles';
import {TypographyStyles} from '../theme/typography';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  contentStyle: {
    backgroundColor: colors.white.default,
  },
};
const tabIconConfig: {[key: string]: NodeRequire} = {
  [Routes.home]: require('../assets/vector/home.svg'),
  [Routes.shopping]: require('../assets/vector/shop.svg'),
  [Routes.notification]: require('../assets/vector/notification.svg'),
  [Routes.user]: require('../assets/vector/user.svg'),
};

const tabLabelConfig: {[key: string]: string} = {
  [Routes.home]: 'Home',
  [Routes.shopping]: 'Shop',
  [Routes.notification]: 'Note',
  [Routes.user]: 'User',
};
export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: colors.white.default,
    paddingHorizontal: normalize('horizontal', 20),
  },
};
export const tabBarScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: colors.white.default,
  tabBarInactiveTintColor: colors.black.default,
  tabBarShowLabel: true,
};

const renderTabIcon =
  (routeName: Routes) =>
  ({color, focused}: {color: string; focused: boolean}) => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          ...CommonStyles.alignJustifyCenter,
          backgroundColor: focused ? 'black' : 'transparent',
        }}>
        <SvgImage source={tabIconConfig[routeName]} color={color} />
      </View>
    );
  };

const renderTabLabel =
  (routeName: Routes) =>
  ({focused}: {focused: boolean}) => {
    if (!focused) return null;

    return (
      <View
        style={{
          borderRadius: 30,
          position: 'absolute',
          bottom: 19,
          width: 76,
          height: 30,
          left: 40,
          zIndex: -1,
          paddingLeft: 25,
          ...CommonStyles.alignJustifyCenter,
          backgroundColor: colors.gray.primary,
        }}>
        <Text
          style={{
            color: focused ? colors.white.default : colors.black.default,
            ...TypographyStyles.title2Poppins11,
          }}>
          {tabLabelConfig[routeName]}
        </Text>
      </View>
    );
  };

export const tabBarOption = {
  [Routes.home]: {
    tabBarIcon: renderTabIcon(Routes.home),
    tabBarLabel: renderTabLabel(Routes.home),
  },
  [Routes.shopping]: {
    tabBarIcon: renderTabIcon(Routes.shopping),
    tabBarLabel: renderTabLabel(Routes.shopping),
  },
  [Routes.notification]: {
    tabBarIcon: renderTabIcon(Routes.notification),
    tabBarLabel: renderTabLabel(Routes.notification),
  },
  [Routes.user]: {
    tabBarIcon: renderTabIcon(Routes.user),
    tabBarLabel: renderTabLabel(Routes.user),
  },
};

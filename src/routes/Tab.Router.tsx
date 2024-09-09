import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from './routes';
import {ShoppingScreen} from '../screens/tab/Shopping.Screen';
import {NotificationScreen} from '../screens/tab/Notification.Screen';
import {UserScreen} from '../screens/tab/User.Screen';
import {NavigationParamList} from '../types/navigation.types';
import React from 'react';
import {tabBarOption, tabBarScreenOptions} from '../configs/navigation.configs';
import {MainRouter} from './Main.Router';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator<NavigationParamList>();

export const TabRouter: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const isTabBarVisible = routeName !== Routes.productDetail;

        return {
          ...tabBarScreenOptions,
          tabBarStyle: {
            display: isTabBarVisible ? 'flex' : 'none',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 70,
            shadowColor: colors.black.default,
          },
        };
      }}>
      <Tab.Screen
        name={Routes.mainRouter}
        component={MainRouter}
        options={tabBarOption[Routes.home]}
      />
      <Tab.Screen
        name={Routes.shopping}
        component={ShoppingScreen}
        options={tabBarOption[Routes.shopping]}
      />
      <Tab.Screen
        name={Routes.notification}
        component={NotificationScreen}
        options={tabBarOption[Routes.notification]}
      />
      <Tab.Screen
        name={Routes.user}
        component={UserScreen}
        options={tabBarOption[Routes.user]}
      />
    </Tab.Navigator>
  );
};

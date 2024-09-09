import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from '../types/navigation.types';
import {Routes} from './routes';
import {ProductDetailScreen} from '../screens/main/ProductDetail.Screen';
import {ProductListScreen} from '../screens/main/ProductList.Screen';
import {HomeScreen} from '../screens/tab/Home.Screen';
import {defaultScreenOptions} from '../configs/navigation.configs';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.home}
      screenOptions={defaultScreenOptions}>
      <MainStack.Screen name={Routes.home} component={HomeScreen} />
      <MainStack.Screen
        name={Routes.productDetail}
        component={ProductDetailScreen}
      />
      <MainStack.Screen
        name={Routes.productList}
        component={ProductListScreen}
      />
    </MainStack.Navigator>
  );
};

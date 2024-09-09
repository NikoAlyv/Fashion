import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from '../types/navigation.types';
import {Routes} from './routes';
import {RegisterScreen} from '../screens/auth/Register.Screen';
import {authStackScreenOption} from '../configs/navigation.configs';
import {CommonStyles} from '../theme/common.styles';
import {SafeAreaView} from 'react-native';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flexJustifyCenter}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.register}>
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};

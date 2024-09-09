import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';

export const ShoppingScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.shopping>
> = ({navigation}) => {
  return (
    <View>
      <Text>Shopping.Screen</Text>
    </View>
  );
};

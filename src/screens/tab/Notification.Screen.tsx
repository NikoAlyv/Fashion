import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';

export const NotificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.notification>
> = ({navigation}) => {
  return (
    <View>
      <Text>Notification.Screen</Text>
    </View>
  );
};

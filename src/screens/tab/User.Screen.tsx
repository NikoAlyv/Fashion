import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';
import {colors} from '../../theme/colors';
import {ColorChanger} from '../../components/ColorChanger';
import {CommonStyles} from '../../theme/common.styles';
import {Button} from '../../components/Button';
import {useUserStoreActions} from '../../store/user';
import {Indicator} from '../../components/Indicator';

export const UserScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.user>
> = ({navigation}) => {
  const {logout} = useUserStoreActions();

  return (
    <View style={CommonStyles.flex}>
      <Text>User.Screen</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

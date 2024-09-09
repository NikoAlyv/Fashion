import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {InputControlled} from '../../components/InputControlled';
import {useForm} from 'react-hook-form';
import {FormRules} from '../../constants/formRules';
import {normalize} from '../../theme/metrics';
import {Button} from '../../components/Button';
import {TypographyStyles} from '../../theme/typography';
import {CheckBox} from '../../components/CheckBox';
import {colors} from '../../theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';
import {useToast} from '../../store/toast';
import {useUserStoreActions} from '../../store/user';
import {Endpoints} from '../../services/Endpoints';
import axios from 'axios';
import {CommonStyles} from '../../theme/common.styles';
import {Table} from '../../components/Table';

export interface IRegister {
  userName: string;
  password: string;
  comfirmPassword: string;
  email?: string;
}

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
    watch,
  } = useForm<IRegister>({
    defaultValues: {
      userName: 'Nihad',
      email: __DEV__ ? 'enihad801@gmail.com' : '',
      password: 'qwe45678!',
      comfirmPassword: 'qwe45678!',
    },
  });
  const {initUser} = useUserStoreActions();
  const showToast = useToast();
  const [check, setCheck] = useState<boolean>(false);
  const handleCheckPress = () => {
    setCheck(res => !res);
    console.log(check);
  };
  const onSubmit = async (data: IRegister) => {
    try {
      const res = await axios({
        url: Endpoints.auth.register,
        method: 'POST',
        data: {
          email: data.email,
          password: data.password,
          name: data.userName,
        },
      });
      console.log({Rres: res.data});

      if (res.status === 201) {
        if (check === true) {
          showToast('success', 'Register successfully');
          initUser(data);
        } else {
          showToast('info', 'Please accept the terms.');
        }
      } else {
        showToast('error', 'Register failed');
      }
    } catch (error) {
      showToast('error', 'An error occurred');
      console.error('Error details', error);
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}>
      <View style={[CommonStyles.alignJustifyCenter, styles.container]}>
        <Text style={[TypographyStyles.title1GreatVibes50, styles.title]}>
          Fashions
        </Text>
        <Text style={[TypographyStyles.title2Poppins11, styles.subTitle]}>
          My Life My Style
        </Text>
      </View>

      <Table
        style={styles.table}
        title="Sign Up"
        subTitle="Create an new account"
      />
      <InputControlled
        control={control}
        errorMessage={errors.userName?.message}
        rules={FormRules.fullName}
        label="User Name"
        style={styles.space}
        placeholder="Enter your name"
        name="name"
        type="user"
      />

      <InputControlled
        keyboardType="email-address"
        control={control}
        errorMessage={errors.email?.message}
        rules={FormRules.email}
        label="Email"
        name="email"
        style={styles.space}
        type="text"
        placeholder="Enter your email"
      />
      <InputControlled
        control={control}
        placeholder="Enter your password"
        name="password"
        label="Password"
        style={styles.space}
        errorMessage={errors.password?.message}
        type="password"
        rules={FormRules.password}
      />
      <InputControlled
        control={control}
        placeholder="Enter your confirm password"
        name="comfirmPassword"
        label="Confirm Password"
        style={styles.space}
        errorMessage={errors.comfirmPassword?.message}
        type="password"
        rules={FormRules.confirmPassword(watch)}
      />

      <View style={styles.row}>
        <CheckBox onPress={handleCheckPress} setCheck={check} />
        <Text
          style={[
            TypographyStyles.title1Poppins15,
            styles.privacy,
            check && styles.checkPrivacy,
          ]}>
          By creating an account you have to agree with our them & condication
        </Text>
      </View>
      <Button
        style={styles.button}
        title="Create an account"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
  },
  subTitle: {
    marginTop: 40,
    marginLeft: 40,
  },
  table: {
    paddingVertical: normalize('vertical', 40),
  },
  space: {
    padding: 8,
  },
  button: {
    marginVertical: normalize('vertical', 25),
  },
  container: {
    marginVertical: normalize('vertical', 60),
  },
  row: {
    bottom: -10,
    flexDirection: 'row',
    gap: 10,
  },
  privacy: {
    paddingRight: 25,
    color: colors.gray.light,
  },
  checkPrivacy: {
    color: colors.black.default,
  },
});

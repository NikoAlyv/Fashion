import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {SvgImage} from './SvgImages';
import {colors} from '../theme/colors';
interface ICheckBox {
  setCheck?: boolean;
  types?: 'circle' | 'square';
  onPress?: () => void;
}
export const CheckBox: React.FC<ICheckBox> = ({
  setCheck,
  types = 'square',
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.root, types === 'circle' && styles.circle]}>
      <SvgImage
        color={setCheck ? colors.black.default : colors.white.default}
        source={require('../assets/vector/check.svg')}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderWidth: 1,
    borderRadius: 4,
    width: 16,
    height: 16,
    borderColor: colors.gray.light,
  },
  circle: {
    borderRadius: 10,
    backgroundColor: colors.black.default,
  },
});

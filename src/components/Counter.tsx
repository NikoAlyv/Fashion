import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SvgImage} from './SvgImages';
import {colors} from '../theme/colors';
import {CommonStyles} from '../theme/common.styles';
import {TypographyStyles} from '../theme/typography';
interface ICounter {
  count?: number;
  minusPress?: () => void;
  plusPress?: () => void;
}
export const Counter: React.FC<ICounter> = ({
  count = 1,
  minusPress,
  plusPress,
}) => {
  return (
    <View style={[styles.root, CommonStyles.alignJustifyCenterRow]}>
      <SvgImage
        onPress={minusPress}
        isPressable
        source={require('../assets/vector/minus.svg')}
      />
      <Text style={TypographyStyles.title1Poppins14}>{count}</Text>
      <SvgImage
        onPress={plusPress}
        isPressable
        source={require('../assets/vector/plus.svg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.gray.primary,
    borderRadius: 30,
    width: 70,
    gap: 5,
    height: 30,
  },
});

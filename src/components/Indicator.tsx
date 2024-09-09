import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {CommonStyles} from '../theme/common.styles';
import {colors} from '../theme/colors';

interface IProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
  indicate?: number;
}

export const Indicator: React.FC<IProps> = ({
  color = colors.white.default,
  style,
  indicate,
}) => {
  return (
    <View style={[CommonStyles.flexAlignJustifyCenterRow, styles.root, style]}>
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={
            index === indicate
              ? [
                  CommonStyles.alignJustifyCenter,
                  styles.border,
                  {borderColor: color},
                ]
              : styles.indicate
          }>
          <View style={[styles.circle, {backgroundColor: color}]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 10,
    position: 'absolute',
  },
  border: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 7,
  },
  indicate: {},
});

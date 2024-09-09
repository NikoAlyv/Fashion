import {View, StyleSheet, StyleProp, ViewStyle, Pressable} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import {CommonStyles} from '../theme/common.styles';
import {SvgImage} from './SvgImages';

interface IColor {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  style?: StyleProp<ViewStyle>;
}

export const ColorChanger: React.FC<IColor> = ({
  color1,
  color2,
  color3,
  color4,
  style,
}) => {
  const colorsArray = [color1, color2, color3, color4].filter(Boolean);
  const [selectedColor, setSelectedColor] = useState<string>();

  return (
    <View style={[styles.root, CommonStyles.alignJustifyCenter, style]}>
      {colorsArray.map((color, index) => (
        <Pressable
          key={index}
          style={[
            CommonStyles.alignJustifyCenter,
            styles.circle,
            {backgroundColor: color},
          ]}
          onPress={() => setSelectedColor(color)}>
          {selectedColor === color && (
            <SvgImage
              source={require('../assets/vector/check.svg')}
              width={15}
              height={15}
              color={
                selectedColor === colors.black.default
                  ? colors.white.default
                  : colors.black.default
              }
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 132,
    gap: 10,
    borderRadius: 30,
    backgroundColor: colors.white.default,
    shadowColor: colors.black.default,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

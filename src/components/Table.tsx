import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {CommonStyles} from '../theme/common.styles';
import {TypographyStyles} from '../theme/typography';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';

interface ITable {
  title?: string;
  subTitle?: string;
  Right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subStyle?: StyleProp<TextStyle>;
}

export const Table: React.FC<ITable> = ({
  title,
  subTitle,
  Right,
  style,
  subStyle,
  titleStyle,
}) => {
  return (
    <View style={[CommonStyles.justifyBetweenRow, styles.root, style]}>
      <View style={[styles.titleContainer]}>
        <Text style={[TypographyStyles.title2Poppins18, titleStyle]}>
          {title}
        </Text>
        {subTitle ? (
          <Text
            style={[
              TypographyStyles.title1Poppins11,
              styles.subTitle,
              subStyle,
            ]}>
            {subTitle}
          </Text>
        ) : null}
      </View>
      {Right}
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 8),
  },
  titleContainer: {
    gap: 10,
  },
  subTitle: {
    color: colors.gray.default,
  },
});

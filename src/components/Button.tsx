import {
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../theme/metrics';
import {SvgImage} from './SvgImages';
import {colors} from '../theme/colors';
import {TypographyStyles} from '../theme/typography';

interface IButton {
  title: string;
  icon?: NodeRequire;
  onPress?: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<IButton> = ({
  title,
  style,
  icon,
  loading,
  textStyle,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const renderLoading = () => {
    return loading ? (
      <ActivityIndicator
        size={'small'}
        color={colors.gray.light}
        style={StyleSheet.absoluteFillObject}
      />
    ) : null;
  };
  return (
    <Pressable
      style={[styles.root, isPressed && styles.pressed, style]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}>
      {icon ? <SvgImage source={icon} /> : null}

      <Text style={[styles.title, textStyle]}>{title}</Text>
      {renderLoading()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.black.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize('vertical', 17),
    borderWidth: 1.5,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    ...TypographyStyles.title2Poppins16,
    color: colors.white.default,
  },
  pressed: {
    backgroundColor: colors.gray.default,
  },
  image: {
    width: 24,
    height: 24,
  },
});

import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TypographyStyles} from '../theme/typography';
import {CommonStyles} from '../theme/common.styles';
import {SvgImage} from '../components/SvgImages';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';

type TIcon = {
  icon: NodeRequire;
  text?: string;
  width?: number;
  height?: number;
  color?: string;
};
type NavbarActions = 'icon' | 'text' | 'image' | 'none';
type NavbarSide =
  | NodeRequire
  | TIcon
  | string
  | ImageSourcePropType
  | undefined;

interface INavBar {
  left?: NavbarSide;
  right?: NavbarSide;
  righAddition?: NavbarSide;
  style?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onAdditionPress?: () => void;
  favorite?: boolean;
  rightActionTypeAddition?: NavbarActions;
  leftActionType?: NavbarActions;
  rightActionType?: NavbarActions;
  leftTextStyle?: StyleProp<TextStyle>;
  rightTextStyle?: StyleProp<TextStyle>;
}

export const Navbar: React.FC<INavBar> = ({
  leftActionType,
  rightActionType,
  rightActionTypeAddition,
  left,
  right,
  favorite = false,
  righAddition,
  leftTextStyle,
  rightTextStyle,
  onLeftPress,
  onRightPress,
  onAdditionPress,
  style,
}) => {
  const renderActions = (
    actionType: NavbarActions | undefined,
    data: NavbarSide,
    side: 'left' | 'right' | 'rightAddition' = 'left',
  ) => {
    const hasIcon = data && typeof data === 'object' && 'icon' in data;
    const onPressAction = side === 'left' ? onLeftPress : onRightPress;

    switch (actionType) {
      case 'image':
        return (
          <View style={styles.image}>
            <Image source={data as ImageSourcePropType} />
          </View>
        );

      case 'text':
        return (
          <Text
            numberOfLines={2}
            style={[
              styles.textType,
              side == 'left' ? leftTextStyle : rightTextStyle,
            ]}>
            {data as string}
          </Text>
        );

      case 'icon':
        if (hasIcon) {
          const {icon, ...restOfIcon} = data as TIcon;
          return <SvgImage source={icon} {...restOfIcon} />;
        }

        return (
          <SvgImage
            color={
              righAddition && favorite
                ? colors.black.default
                : colors.white.default
            }
            source={data as NodeRequire}
          />
        );
    }
  };

  return (
    <View style={[styles.root, style]}>
      <Pressable
        onPress={onLeftPress}
        style={[styles.action, !leftActionType && styles.hide]}>
        {renderActions(leftActionType, left, 'left')}
      </Pressable>
      <View style={CommonStyles.row}>
        <Pressable
          onPress={onAdditionPress}
          style={[styles.actionRight, !rightActionTypeAddition && styles.hide]}>
          {renderActions(
            rightActionTypeAddition,
            righAddition,
            'rightAddition',
          )}
        </Pressable>
        <Pressable
          onPress={onRightPress}
          style={[styles.actionRight, !rightActionType && styles.hide]}>
          {renderActions(rightActionType, right, 'right')}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingVertical: normalize('vertical', 12),
    paddingHorizontal: normalize('horizontal', 25),
  },
  large: {
    paddingVertical: normalize('vertical', 16),
  },
  action: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionRight: {
    alignItems: 'flex-end',
  },
  textType: {
    ...TypographyStyles.title3Poppins18,
  },
  hide: {
    opacity: 0,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.gray.primary,
  },
});

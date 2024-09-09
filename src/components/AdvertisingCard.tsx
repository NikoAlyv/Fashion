import {
  View,
  Text,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Button} from './Button';
import {TypographyStyles} from '../theme/typography';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';
import {CommonStyles} from '../theme/common.styles';

interface IAdvertisingCard {
  discount: string;
  text?: string;
  passCode?: string;
  buttonPress?: () => void;
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

export const AdvertisingCard: React.FC<IAdvertisingCard> = ({
  discount,
  text,
  passCode,
  buttonPress,
  image,
  style,
}) => {
  return (
    <ImageBackground
      source={image}
      style={[styles.image, CommonStyles.flexJustifyCenter]}
      imageStyle={styles.imageBorder}
      resizeMode="stretch">
      <View>
        <Text style={TypographyStyles.title3Poppins25}>{discount}</Text>
        <Text style={TypographyStyles.title1Poppins16}>{text}</Text>
        <Text style={[TypographyStyles.title2Poppins11, styles.passcode]}>
          {passCode}
        </Text>
        <Button
          textStyle={TypographyStyles.title3Poppins10}
          style={styles.button}
          onPress={buttonPress}
          title="Get now"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 260,
    paddingLeft: 15,
  },
  imageBorder: {
    borderRadius: 20,
    backgroundColor: colors.gray.primary,
  },
  passcode: {
    paddingTop: 10,
    color: colors.gray.default,
    paddingBottom: 15,
  },
  button: {
    width: 70,
    paddingVertical: normalize('vertical', 5),
  },
});

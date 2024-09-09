import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {SvgImage} from './SvgImages';
import {TypographyStyles} from '../theme/typography';
import {colors} from '../theme/colors';
import {CommonStyles} from '../theme/common.styles';

export interface IProductCart {
  id?: number;
  image: string;
  price?: any;
  title?: string;
  category?: string;
  onPress?: () => void;
  iconPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ProductCart: React.FC<IProductCart> = ({
  image,
  iconPress,
  category,
  title,
  style,
  onPress,
  price,
  id,
}) => {
  const [favorite, setFavorite] = useState(false);

  const handleIconPress = () => {
    setFavorite(res => !res);
  };
  return (
    <Pressable key={id} style={[styles.root, style]} onPress={onPress}>
      <Image style={styles.image} source={{uri: image}} />
      <Pressable
        onPress={handleIconPress}
        style={[styles.iconBorder, CommonStyles.alignJustifyCenter]}>
        <SvgImage
          color={favorite ? colors.white.default : colors.black.default}
          source={require('../assets/vector/love.svg')}
        />
      </Pressable>
      <View />
      <View style={CommonStyles.alignJustifyCenter}>
        <Text style={TypographyStyles.title2Poppins14}>{title}</Text>
        <Text style={[TypographyStyles.title1Poppins11, styles.category]}>
          {category}
        </Text>
        <Text style={TypographyStyles.title2Poppins14}>{price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 160,
  },
  image: {
    height: 170,
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  category: {
    color: colors.gray.default,
  },
  iconBorder: {
    position: 'absolute',
    backgroundColor: colors.black.default,
    padding: 6,
    width: 20,
    right: 15,
    top: 15,
    borderRadius: 12,
  },
});

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {SvgImage} from './SvgImages';
import {colors} from '../theme/colors';
import {CommonStyles} from '../theme/common.styles';
import {TypographyStyles} from '../theme/typography';

interface RatingProps {
  rating: number;
  numberOfRates?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  fixRating?: boolean;
  onRateChange?: (rateLength: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating = 0,
  numberOfRates = '0',
  size = 11,
  style,
  starStyle,
  fixRating = false,
  onRateChange,
}) => {
  const totalStars = 5;
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [hoveredStars, setHoveredStars] = useState<number>(-1);

  const handleRatingChange = (newRating: number) => {
    if (!fixRating) {
      setHoveredStars(newRating);
      onRateChange?.(newRating + 1);
    }
  };

  const confirmRating = (newRating: number) => {
    if (!fixRating) {
      setCurrentRating(newRating + 1);
      setHoveredStars(-1);
    }
  };

  const getStarFillColor = (index: number): string => {
    return index <= (hoveredStars !== -1 ? hoveredStars : currentRating - 1)
      ? colors.yellow.base
      : colors.gray.light;
  };

  return (
    <View style={[CommonStyles.alignCenterRow, styles.root, style]}>
      <View style={[CommonStyles.alignCenterRow, starStyle]}>
        {Array.from({length: totalStars}, (_, index) => (
          <Pressable
            key={index}
            onPressIn={() => handleRatingChange(index)}
            onPressOut={() => confirmRating(index)}>
            <SvgImage
              fill={getStarFillColor(index)}
              width={size}
              height={size}
              source={require('../assets/vector/star.svg')}
            />
          </Pressable>
        ))}
      </View>
      {numberOfRates && <Text style={styles.text}>({numberOfRates})</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    color: colors.gray.light,
    ...TypographyStyles.title1Poppins11,
  },
  root: {
    paddingLeft: 7,
    paddingTop: 5,
  },
});

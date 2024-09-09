import {StyleSheet, TextStyle} from 'react-native';
import {colors} from './colors';
import {normalize} from './metrics';
export const greatVibeFonts = {
  400: 'GreatVibes-Regular',
};
export const poppinFonts = {
  400: 'Poppins-Regular',
  600: 'Poppins-SemiBold',
  700: 'Poppins-Bold',
};

const fontSize9 = normalize('font', 9);
const fontSize10 = normalize('font', 10);
const fontSize11 = normalize('font', 11);
const fontSize12 = normalize('font', 12);
const fontSize14 = normalize('font', 14);
const fontSize15 = normalize('font', 15);
const fontSize16 = normalize('font', 16);
const fontSize18 = normalize('font', 18);
const fontSize20 = normalize('font', 20);
const fontSize25 = normalize('font', 25);
const fontSize50 = normalize('font', 46);

// const lineHeight12 = fontSize12
// const lineHeight14 = fontSize14
// const lineHeight16 = fontSize16
// const lineHeight18 = fontSize18
// const lineHeight20 = normalize('font', 20)
// const lineHeight24 = fontSize24
// const lineHeight32 = fontSize32
// const lineHeight36 = normalize('font', 36)
// const lineHeight56 = normalize('font', 56)

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  color: colors.black.default,
};

export const TypographyStyles = StyleSheet.create({
  title1Poppins9: {
    fontSize: fontSize9,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
    color: colors.gray.light,
  },
  title1Poppins11: {
    fontSize: fontSize11,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
  },
  title1Poppins12: {
    fontSize: fontSize12,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
  },
  title1Poppins14: {
    fontSize: fontSize14,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
  },
  title1Poppins15: {
    fontSize: fontSize15,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
  },

  title1Poppins16: {
    fontSize: fontSize16,
    fontFamily: poppinFonts[400],
    ...commonFontStyling,
  },

  title1GreatVibes12: {
    fontSize: fontSize12,
    fontFamily: greatVibeFonts[400],
    ...commonFontStyling,
  },
  title1GreatVibes50: {
    fontSize: fontSize50,
    fontFamily: greatVibeFonts[400],
    ...commonFontStyling,
  },

  title2Poppins11: {
    fontSize: fontSize11,
    fontFamily: poppinFonts[600],
    ...commonFontStyling,
  },
  title2Poppins14: {
    fontSize: fontSize14,
    fontFamily: poppinFonts[600],
    ...commonFontStyling,
  },
  title2Poppins16: {
    fontSize: fontSize16,
    fontFamily: poppinFonts[600],
    ...commonFontStyling,
  },
  title2Poppins18: {
    fontSize: fontSize18,
    fontFamily: poppinFonts[600],
    ...commonFontStyling,
  },
  title2Poppins20: {
    fontSize: fontSize20,
    fontFamily: poppinFonts[600],
    ...commonFontStyling,
  },
  title3Poppins10: {
    fontSize: fontSize10,
    fontFamily: poppinFonts[700],
    ...commonFontStyling,
    color: colors.white.default,
  },
  title3Poppins16: {
    fontSize: fontSize16,
    fontFamily: poppinFonts[700],
    ...commonFontStyling,
  },

  title3Poppins18: {
    fontSize: fontSize18,
    fontFamily: poppinFonts[700],
    ...commonFontStyling,
  },

  title3Poppins25: {
    fontSize: fontSize25,
    fontFamily: poppinFonts[700],
    ...commonFontStyling,
  },
});

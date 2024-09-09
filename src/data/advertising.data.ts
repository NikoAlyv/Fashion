import {ImageSourcePropType} from 'react-native';

export interface IAdvertising {
  discount: string;
  text?: string;
  passCode?: string;
  image: ImageSourcePropType;
}

export const advertising: Array<IAdvertising> = [
  {
    image: require('../assets/image/advertis.png'),
    discount: '50% Off',
    text: 'On everything today',
    passCode: 'With code:FSCREATION',
  },
  {
    image: require('../assets/image/advertis1.png'),
    discount: '70% Off',
    text: 'On everything today',
    passCode: 'With code:NOTFRSXCJK',
  },
];

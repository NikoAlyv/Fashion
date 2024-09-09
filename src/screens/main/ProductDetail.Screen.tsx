import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';
import {IProductCart} from '../../components/ProductCart';
import {Navbar} from '../../components/Navbar';
import {CommonStyles} from '../../theme/common.styles';
import {BottomSheet} from '../../components/BottomSheet';
import {colors} from '../../theme/colors';
import {Counter} from '../../components/Counter';
import {Category} from '../../components/Category';
import {normalize} from '../../theme/metrics';
import {TypographyStyles} from '../../theme/typography';
import {Button} from '../../components/Button';
import {useToast} from '../../store/toast';
import {ColorChanger} from '../../components/ColorChanger';
import {Indicator} from '../../components/Indicator';

const size: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const ProductDetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productDetail>
> = ({navigation, route}) => {
  const item: IProductCart = route.params.product;
  const showToast = useToast();
  const images = [
    {image: item.image, id: 0},
    {
      image: item.image,
      id: 1,
    },
    {
      image: item.image,
      id: 2,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [count, setCount] = useState<number>(1);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [press, setPress] = useState<boolean>(false);
  const handleSubmit = () => {
    setPress(res => !res);
    console.log(press);
    showToast('success', 'Added successfully!');
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    const activeItemId = images[index]?.id;
    setActiveIndex(activeItemId);
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View>
            <Image
              key={item.id}
              style={styles.image}
              source={{uri: item.image}}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
      />
      <Indicator
        color={colors.white.default}
        indicate={activeIndex}
        style={styles.indicate}
      />
      <Navbar
        style={styles.header}
        leftActionType="icon"
        onAdditionPress={() => setFavorite(res => !res)}
        favorite={favorite}
        onLeftPress={() => navigation.goBack()}
        left={require('../../assets/vector/arrow-left.svg')}
        rightActionType="icon"
        right={require('../../assets/vector/cart.svg')}
        rightActionTypeAddition="icon"
        righAddition={require('../../assets/vector/heart.svg')}
      />

      <BottomSheet
        title={item.title?.split(' ').slice(0, 3).join(' ') ?? ''}
        subTitle={item.category}
        rightTable={
          <Counter
            count={count}
            minusPress={
              count <= 1
                ? () => console.log("Don't minus")
                : () => setCount(num => num - 1)
            }
            plusPress={() => setCount(num => num + 1)}
          />
        }
        Children={
          <View>
            <Text style={[TypographyStyles.title2Poppins16, styles.title]}>
              Size
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={size}
              contentContainerStyle={styles.content}
              renderItem={({item}) => (
                <Category
                  item={item}
                  style={[TypographyStyles.title2Poppins14, styles.size]}
                  backgroundColor={colors.black.default}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              horizontal={true}
              keyExtractor={item => item}
            />
            <ColorChanger
              style={{position: 'absolute', right: 10}}
              color1={colors.black.default}
              color2={colors.yellow.base}
              color3={colors.white.dark}
              color4={colors.gray.lighter}
            />
            <Text style={TypographyStyles.title2Poppins16}>Description</Text>
            <Text style={[TypographyStyles.title1Poppins11, styles.text]}>
              Get a little lift from these Sam Edelman sandals featuring ruched
              straps and leather lace-up ties, while a braided jute sole makes a
              fresh statement for summer.
            </Text>
            <View style={CommonStyles.alignCenterJustifyBetweenRow}>
              <View>
                <Text style={TypographyStyles.title1Poppins9}>Total Price</Text>
                {item ? (
                  <Text style={TypographyStyles.title3Poppins18}>
                    {item.price * count}
                  </Text>
                ) : null}
              </View>
              <Button
                style={styles.button}
                onPress={handleSubmit}
                icon={require('../../assets/vector/shopping.svg')}
                title="Add to cart"
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray.lighter,
  },
  image: {
    width: 395,
    height: 430,
    resizeMode: 'stretch',
  },
  header: {position: 'absolute', gap: 280},
  content: {
    paddingHorizontal: normalize('horizontal', 25),
  },
  size: {
    height: 40,
    paddingHorizontal: normalize('horizontal', 2),
    width: 40,
    borderRadius: 30,
    borderWidth: 1,
    left: -30,
    color: colors.gray.dark,
    borderColor: colors.white.dark,
  },
  button: {
    paddingHorizontal: normalize('horizontal', 40),
  },
  text: {
    color: colors.gray.default,
    marginBottom: 32,
    marginTop: 15,
  },
  title: {
    marginTop: 23,
    marginBottom: 12,
  },
  indicate: {
    top: 320,
    left: 180,
  },
});

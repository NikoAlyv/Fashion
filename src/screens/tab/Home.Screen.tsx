import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useUserStoreActions} from '../../store/user';
import {SvgImage} from '../../components/SvgImages';
import {colors} from '../../theme/colors';
import {Table} from '../../components/Table';
import {TypographyStyles} from '../../theme/typography';
import {Input} from '../../components/Input';
import {normalize} from '../../theme/metrics';
import {CommonStyles} from '../../theme/common.styles';
import {Navbar} from '../../components/Navbar';
import {advertising} from '../../data/advertising.data';
import {AdvertisingCard} from '../../components/AdvertisingCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';
import {IProductCart, ProductCart} from '../../components/ProductCart';
import axios from 'axios';
import {Endpoints} from '../../services/Endpoints';

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const {logout} = useUserStoreActions();
  const [products, setProducts] = useState<IProductCart[]>([]);
  const [loading, setLoading] = useState(true);
  const product = Endpoints.main.product;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(product);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({item}: {item: IProductCart}) => {
      return (
        <ProductCart
          title={item.title?.split(' ').slice(0, 2).join(' ') ?? ''}
          category={item.category}
          image={item.image}
          price={`$${item.price}`}
          onPress={() =>
            navigation.navigate(Routes.productDetail, {product: item})
          }
          id={item.id}
        />
      );
    },
    [navigation],
  );
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        navigation.getParent()?.setOptions({tabBarVisible: false});
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        navigation.getParent()?.setOptions({tabBarVisible: true});
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Navbar
        leftActionType="icon"
        onLeftPress={() => console.log('menu')}
        left={require('../../assets/vector/menu.svg')}
        rightActionType="image"
        onRightPress={() => console.log('person')}
        right={require('../../assets/image/person.png')}
      />

      <Table
        title="Welcome"
        style={styles.table}
        titleStyle={TypographyStyles.title3Poppins25}
        subTitle="Our Fashions App"
        subStyle={styles.subTitle}
      />

      <View style={[CommonStyles.row, styles.container]}>
        <Input
          placeholder="Search..."
          icon={require('../../assets/vector/search.svg')}
          inputStyle={[styles.search]}
        />
        <SvgImage
          isPressable={true}
          onPress={() => console.log('filter')}
          source={require('../../assets/vector/filter.svg')}
        />
      </View>

      <FlatList
        data={advertising}
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <AdvertisingCard
            buttonPress={logout}
            discount={item.discount}
            text={item.text}
            passCode={item.passCode}
            image={item.image}
          />
        )}
      />
      {loading ? (
        <ActivityIndicator
          style={[CommonStyles.flexAlignJustifyCenter]}
          size={'large'}
          color={colors.gray.light}
        />
      ) : (
        <FlatList
          data={products.slice(1, 9)}
          renderItem={renderItem}
          numColumns={2}
          ListHeaderComponent={
            <Navbar
              rightActionType="text"
              left="New Arrivals"
              leftActionType="text"
              right="View All"
              rightTextStyle={styles.text}
              onRightPress={() => navigation.navigate(Routes.productList)}
            />
          }
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.wrapper}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: colors.white.default,
  },
  root: {
    ...CommonStyles.flexJustifyCenter,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.gray.primary,
  },
  subTitle: {
    ...TypographyStyles.title2Poppins20,
    color: colors.gray.default,
  },
  container: {
    gap: 13,
    paddingHorizontal: normalize('horizontal', 25),
    paddingBottom: 40,
  },
  search: {
    paddingHorizontal: normalize('horizontal', 26),
    backgroundColor: colors.gray.lighter,
    borderRadius: 30,
    borderWidth: 0,
    width: 272,
    borderColor: colors.gray.lighter,
  },
  table: {
    paddingVertical: normalize('vertical', 20),
    paddingHorizontal: normalize('horizontal', 25),
  },
  text: {
    ...TypographyStyles.title2Poppins11,
    color: colors.gray.default,
  },
  content: {
    gap: 15,
    paddingHorizontal: normalize('horizontal', 25),
  },
  wrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: normalize('horizontal', 25),
  },
});

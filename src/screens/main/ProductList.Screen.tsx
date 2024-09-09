import {View, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Navbar} from '../../components/Navbar';
import {Input} from '../../components/Input';
import {SvgImage} from '../../components/SvgImages';
import {CommonStyles} from '../../theme/common.styles';
import {normalize} from '../../theme/metrics';
import {colors} from '../../theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from '../../types/navigation.types';
import {Routes} from '../../routes/routes';
import {FlatList} from 'react-native-gesture-handler';
import {Category} from '../../components/Category';
import {IProductCart, ProductCart} from '../../components/ProductCart';
import axios from 'axios';
import {Endpoints} from '../../services/Endpoints';

const categories: string[] = ['All', 'Women', 'Men', 'Jewelery'];
export const ProductListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productList>
> = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
    fetchProducts();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Navbar
        leftActionType="icon"
        onLeftPress={() => navigation.goBack()}
        left={require('../../assets/vector/arrow-left.svg')}
        rightActionType="image"
        right={require('../../assets/image/person.png')}
      />
      <View style={[CommonStyles.row, styles.container]}>
        <Input
          placeholder="Search..."
          icon={require('../../assets/vector/search.svg')}
          inputStyle={[styles.search]}
        />
        <SvgImage source={require('../../assets/vector/filter.svg')} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <Category
            item={item}
            backgroundColor={colors.black.default}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        horizontal={true}
        keyExtractor={item => item}
      />
      {loading ? (
        <ActivityIndicator
          style={[CommonStyles.flexAlignJustifyCenter]}
          size={'large'}
          color={colors.gray.light}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          numColumns={2}
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
  content: {
    paddingHorizontal: normalize('horizontal', 25),
  },
  wrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: normalize('horizontal', 25),
  },
});

import {Routes} from '../routes/routes';
import {IProductCart} from '../components/ProductCart';

export type NavigationParamList = {
  [Routes.home]: undefined;
  [Routes.register]: undefined;
  [Routes.productList]: undefined;
  [Routes.productDetail]: {product: IProductCart};
  [Routes.authRouther]: undefined;
  [Routes.mainRouter]: undefined;
  [Routes.tabRouter]: undefined;
  [Routes.user]: undefined;
  [Routes.shopping]: undefined;
  [Routes.notification]: undefined;
};

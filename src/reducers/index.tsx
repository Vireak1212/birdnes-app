import { combineReducers } from 'redux';
import Store from "./Store";
import ProductSlider from "./ProductSlider";
import Category from "./Category";
import { NewProduct, Product, ProductCategory, TopProduct } from "./Product";
import Client from './Client';
import { Cart, OrderHistory } from './Cart';

const isLoadingHome = (state = true, action: { type: any; }) => {
    switch (action.type) {
        case 'HOME_LOAD_COMPLETE':
            return false
        case 'HOME_RELOAD':
            return true
    }
    return state;
}

const LoadingStyles = (state = [], action: { type: any; style: any; error: any; }) => {
    switch (action.type) {
        case 'LOAD_STYLES':
            return action.style
        case 'LOAD_STYLES_ERROR':
            return action.error;
        default:
            break;
    }
    return state;
}

const rootReducers = combineReducers({
    isLoadingHome,
    style: LoadingStyles,
    slide_shows: ProductSlider,
    clients: Client,
    products: Product,
    new_products: NewProduct,
    top_products: TopProduct,
    categories: Category,
    store: Store,
    carts: Cart,
    order_history: OrderHistory,
    product_category: ProductCategory
});

export default rootReducers;
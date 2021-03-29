import { combineReducers } from 'redux';
import Store from "./Store";
import ProductSlider from "./ProductSlider";
import Category from "./Category";
import { NewProduct, Product, ProductCategory, TopProduct } from "./Product";
import Client from './Client';
import { Cart, OrderHistory } from './Cart';
import { Setting } from './Setting';

const isLoadingHome = (state = true, action: { type: any; }) => {
    switch (action.type) {
        case 'HOME_LOAD_COMPLETE':
            return false
        case 'HOME_RELOAD':
            return true
    }
    return state;
}

const noConnection = (state = false, action: { type: any; value: any; error: any; }) => {
    switch (action.type) {
        case 'LOAD_NO_CONNECTION':
            return action.value
        case 'LOAD__NO_CONNECTION_ERROR':
            return action.error;
        default:
            break;
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
    no_connection: noConnection,
    slide_shows: ProductSlider,
    client: Client,
    products: Product,
    new_products: NewProduct,
    top_products: TopProduct,
    categories: Category,
    store: Store,
    cart: Cart,
    order_history: OrderHistory,
    product_category: ProductCategory,
    settings: Setting,
});

export default rootReducers;
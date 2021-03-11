import Customer from "./Customer";
import { combineReducers } from 'redux';
import Product from "./Product";
import Store from "./Store";
import ProductSlider from "./ProductSlider";
import Category from "./Category";

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
    customer: Customer,
    products: Product,
    categories: Category,
    store: Store,

});

export default rootReducers;
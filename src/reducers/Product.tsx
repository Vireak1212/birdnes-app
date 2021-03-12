export const Product = (state = [], action: { type: any; products: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_PRODUCT':
            return action.products;
        case 'PRODUCT_ERROR':
            return action.error;
        default:
            return state;
    }
}

export const NewProduct = (state = [], action: { type: any; new_products: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_NEW_PRODUCT':
            return action.new_products;
        case 'PRODUCT_ERROR':
            return action.error;
        default:
            return state;
    }
}

export const TopProduct = (state = [], action: { type: any; top_products: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_TOP_PRODUCT':
            return action.top_products;
        case 'PRODUCT_ERROR':
            return action.error;
        default:
            return state;
    }
}



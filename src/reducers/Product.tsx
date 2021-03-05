const Product = (state = [], action: { type: any; products: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_PRODUCT':
            return action.products;
        case 'PRODUCT_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Product;

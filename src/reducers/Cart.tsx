const Cart = (state = [], action: { type: any; carts: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.carts.length === 0 ? [] : action.carts[0];
        case 'CART_ERROR':
            return action.error;
        default:
            return state;
    }
}

export default Cart;
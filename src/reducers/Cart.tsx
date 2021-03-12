const Cart = (state = [], action: { type: any; carts: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.carts;
        case 'CART_ERROR':
            return action.error;
        default:
            return state;
    }
}

export default Cart;
export const Cart = (state = [], action: { type: any; cart: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.cart.length === 0 ? [] : action.cart[0];
        case 'CART_ERROR':
            return action.error;
        default:
            return state;
    }
}

export const OrderHistory = (state = [], action: { type: any; order_history: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_ORDER':
            return action.order_history;
        case 'ORDER_ERROR':
            return action.error;
        default:
            return state;
    }
}
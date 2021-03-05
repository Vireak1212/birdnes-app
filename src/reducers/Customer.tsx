const Customer = (state = [], action: { type: any; customer: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CUSTOMER':
            return action.customer.length > 0 ? action.customer[0] : action.customer;
        case 'CUSTOMER_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Customer;
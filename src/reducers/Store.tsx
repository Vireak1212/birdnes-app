const Store = (state = [], action: { type: any; store: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_STORE':
            return action.store;
        case 'STORE_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Store;
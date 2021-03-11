const Category = (state = [], action: { type: any; categories: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CATEGORY':
            return action.categories;
        case 'CATEGORY_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Category;
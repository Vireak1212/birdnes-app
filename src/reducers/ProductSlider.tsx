const ProductSlider = (state = [], action: { type: any; slide_shows: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_SLIDER':
            return action.slide_shows;
        case 'SLIDER_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default ProductSlider;
const ProductSlider = (state = [], action: { type: any; slides: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_SLIDER':
            return action.slides;
        case 'SLIDER_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default ProductSlider;
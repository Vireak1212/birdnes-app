import { loadCart } from "../actions/Cart";
import { loadCategory } from "../actions/Category";
import { loadClient } from "../actions/Client";
import { loadNewProduct, loadProduct, loadTopProduct } from "../actions/Product";
import { loadSlider } from "../actions/ProductSlider";
import { loadStore } from "../actions/Store";

export function loadData(dispatch) {
    dispatch(loadClient());
    dispatch(loadProduct());
    dispatch(loadNewProduct());
    dispatch(loadTopProduct())
    dispatch(loadSlider())
    dispatch(loadProduct());
    dispatch(loadCategory());
    dispatch(loadStore());
    dispatch(loadCart());
}
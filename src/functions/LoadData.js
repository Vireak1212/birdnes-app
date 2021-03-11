import { loadCategory } from "../actions/Category";
import { loadCurrentCustomer } from "../actions/Customer";
import { loadProduct } from "../actions/Product";
import { loadSlider } from "../actions/ProductSlider";
import { loadStore } from "../actions/Store";

export function loadData(dispatch) {
    dispatch(loadCurrentCustomer());
    dispatch(loadProduct());
    dispatch(loadSlider())
    dispatch(loadProduct());
    dispatch(loadCategory());
    dispatch(loadStore());
}
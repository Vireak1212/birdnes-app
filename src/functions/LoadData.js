import { loadCurrentCustomer } from "../actions/Customer";
import { loadProduct } from "../actions/Product";
import { loadSlider } from "../actions/ProductSlider";
import { loadStore } from "../actions/Store";

export function loadData(dispatch) {
    dispatch(loadCurrentCustomer())
    dispatch(loadSlider())
    dispatch(loadProduct())
    dispatch(loadStore())
}
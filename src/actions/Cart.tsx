import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

let subscribe: any = null
export const loadCart = (is_logout: any = false) => {
    return async (dispatch: (arg0: { type: string; cart: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
        if (subscribe !== null && is_logout) {
            subscribe()
            subscribe = null
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            if (uid !== null) {
                subscribe = firestore().collection("carts")
                    .where("uid", "==", uid)
                    .where("is_confirm", "==", false)
                    .onSnapshot(function (snapshot) {
                        if (snapshot.empty) {
                            dispatch({ type: 'LOAD_CART', cart: [] });
                            return;
                        }
                        snapshot.docChanges().forEach(function (data) {
                            let cart = [{
                                id: data.doc.id,
                                items: data.doc.data()
                            }];
                            dispatch({ type: 'LOAD_CART', cart });
                        })
                    });
            } else {
                dispatch({ type: 'LOAD_CART', cart: [] });
            }
        }
        if (is_logout) {
            dispatch({ type: 'LOAD_CART', cart: [] });
        }
    }
}

let subscribe_order: any = null
export const loadOrder = (is_logout: any) => {
    return async (dispatch: (arg0: { type: string; order_history: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
        if (subscribe_order !== null && is_logout) {
            subscribe_order()
            subscribe_order = null
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            if (uid !== null) {
                subscribe_order = firestore().collection("carts")
                    .where("uid", "==", uid)
                    .where("is_confirm", "==", true)
                    .onSnapshot(function (snapshot) {
                        let order_history: any = []
                        snapshot.docs.forEach(function (data) {
                            order_history.push({
                                items: data.data(),
                                id: data.id
                            })
                        })
                        dispatch({ type: 'LOAD_ORDER', order_history });
                    });
            } else {
                dispatch({ type: 'LOAD_ORDER', order_history: [] });
            }
        }
        if (is_logout) {
            dispatch({ type: 'LOAD_ORDER', order_history: [] });
        }
    }
}

export const addToCart = (cart: any) => {
    return async (dispatch: (arg0: (dispatch: any) => void) => void) => {
        const data = await firestore().collection('carts');
        data.add(
            {
                ...cart
            }
        )
    }
}

export const updateCart = (doc: string | undefined, param: { [key: string]: any; }) => {
    return async (dispatch: (arg0: { type: string; error: any; }) => void) => {
        const user = await firestore().collection('carts').doc(doc);
        user.update(
            param
        ).catch((error) => {
            dispatch({ type: 'CART_ERROR', error });
        })
    }
}

export const deleteCart = (doc: string | undefined) => {
    return async (dispatch: (arg0: { type: string; error: any; }) => void) => {
        const user = await firestore().collection('carts').doc(doc);
        user.delete()
    }
}
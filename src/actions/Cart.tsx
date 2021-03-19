import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

let subscribe: any = null

export const loadCart = () => {
    return async (dispatch: (arg0: { type: string; carts: any }) => void) => {
        if (subscribe !== null) {
            subscribe()
            subscribe = null
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            subscribe = firestore().collection("carts")
                .where("uid", "==", "")
                .where("is_confirm", "==", false)
                .onSnapshot(function (snapshot) {
                    let carts: any = []
                    snapshot.docs.forEach(function (data) {
                        carts.push({
                            items: data.data(),
                            id: data.id
                        })
                    })
                    dispatch({ type: 'LOAD_CART', carts });
                });
        }
    }
}

export const loadOrder = () => {
    return async (dispatch: (arg0: { type: string; order_history: any }) => void) => {
        if (subscribe !== null) {
            subscribe()
            subscribe = null
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            subscribe = firestore().collection("carts")
                .where("uid", "==", "")
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
        }
    }
}

export const addToCart = (carts: any) => {
    return async (dispatch: (arg0: (dispatch: any) => void) => void) => {
        const data = await firestore().collection('carts');
        data.add(
            {
                ...carts
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
        user.delete(

        )
    }
}
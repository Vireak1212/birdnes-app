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
                // .where("uid", "==", uid)
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
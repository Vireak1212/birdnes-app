import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
export const createCustomer = (customers: any) => {
    return async () => {
        const data = await firestore().collection('customer');
        data.add(
            {
                ...customers
            }
        )
    }
}

let subscribe: any = null
export const loadCurrentCustomer = (is_logout: any = false) => {
    return async (dispatch: (arg0: { type: string; customer: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
        if (subscribe !== null && is_logout) {
            subscribe()
            subscribe = null
            dispatch({ type: 'LOAD_CUSTOMER', customer: [] });
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            if (uid !== null) {
                subscribe = firestore().collection("customer")
                    .onSnapshot(function (snapshot) {
                        snapshot.docChanges().forEach(function (data) {
                            let customer = [{
                                id: data.doc.id,
                                items: data.doc.data()
                            }];
                            dispatch({ type: 'LOAD_CUSTOMER', customer });
                        })
                    });
            } else {
                dispatch({ type: 'LOAD_CUSTOMER', customer: [] });
            }
        }
    }
}
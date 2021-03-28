import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

export const createClient = (client: any) => {
    return async () => {
        const data = await firestore().collection('clients');
        data.add(
            {
                ...client
            }
        )
    }
}

let subscribe: any = null
export const loadClient = (is_logout: any = false) => {
    return async (dispatch: (arg0: { type: string; client: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
        if (subscribe !== null && is_logout) {
            subscribe()
            subscribe = null
        }
        else {
            let uid = await AsyncStorage.getItem("uid");
            if (uid !== null) {
                subscribe = firestore().collection("clients").where("uid", "==", uid)
                    .onSnapshot(function (snapshot) {
                        snapshot.docChanges().forEach(function (data) {
                            let client = [{
                                id: data.doc.id,
                                items: data.doc.data()
                            }];
                            dispatch({ type: 'LOAD_CLIENT', client });
                        })
                    });
            } else {
                dispatch({ type: 'LOAD_CLIENT', client: [] });
            }
        }
        if (is_logout) {
            dispatch({ type: 'LOAD_CLIENT', client: [] });
        }
    }
}

export const updateClient = (doc: string | undefined, param: { [key: string]: any; }) => {
    return async (dispatch: (arg0: { type: string; error: any; }) => void) => {
        const client = await firestore().collection('clients').doc(doc);
        client.update(
            param
        ).catch((error) => {
            dispatch({ type: 'CLINT_ERROR', error });
        })
    }
}



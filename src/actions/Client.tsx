import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

export const createClient = (clients: any) => {
    return async () => {
        const data = await firestore().collection('clients');
        data.add(
            {
                ...clients
            }
        )
    }
}

let subscribe: any = null

export const loadClient = (is_logout: any = false) => {
    return async (dispatch: (arg0: { type: string; clients: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
        firestore().collection("clients")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (data) {
                    let clients = [{
                        id: data.doc.id,
                        items: data.doc.data()
                    }];
                    dispatch({ type: 'LOAD_CLIENT', clients });
                })
            });
    }

}

// export const loadClient = (is_logout: any = false) => {
//     return async (dispatch: (arg0: { type: string; clients: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
//         if (subscribe !== null && is_logout) {
//             subscribe()
//             subscribe = null
//             dispatch({ type: 'LOAD_CLIENT', clients: [] });
//         }
//         else {
//             let uid = await AsyncStorage.getItem("uid");
//             if (uid !== null) {
//                 subscribe = firestore().collection("clients")
//                     .onSnapshot(function (snapshot) {
//                         snapshot.docChanges().forEach(function (data) {
//                             let clients = [{
//                                 id: data.doc.id,
//                                 items: data.doc.data()
//                             }];
//                             dispatch({ type: 'LOAD_CLIENT', clients });
//                         })
//                     });
//             } else {
//                 dispatch({ type: 'LOAD_CLIENT', clients: [] });
//             }
//         }
//     }
// }

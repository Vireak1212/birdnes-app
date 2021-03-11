import firestore from '@react-native-firebase/firestore';

export const loadStore = () => {
    return async (dispatch: (arg0: { type: string; store: any }) => void) => {
        firestore().collection("store")
            // .where("status.key", "==", 1)
            .onSnapshot(function (snapshot) {
                let store: any = []
                snapshot.docs.forEach(function (data) {
                    store.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_STORE', store });
            });
    }
}
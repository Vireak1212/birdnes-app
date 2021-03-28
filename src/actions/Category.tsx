import firestore from '@react-native-firebase/firestore';

export const loadCategory = () => {
    return async (dispatch: (arg0: { type: string; categories: any }) => void) => {
        firestore().collection("categories")
            .where('status', '==', true)
            .orderBy('sort_order')
            .onSnapshot(function (snapshot) {
                let categories: any = []
                snapshot.docs.forEach(function (data) {
                    categories.push({
                        items: data.data(),
                        id: data.id
                    })
                })
                dispatch({ type: 'LOAD_CATEGORY', categories });
            });
    }
}
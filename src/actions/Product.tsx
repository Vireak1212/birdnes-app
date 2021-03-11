import firestore from '@react-native-firebase/firestore';


export const loadProduct = () => {
    return async (dispatch: (arg0: { type: string; products: any }) => void) => {
        firestore().collection("products")
            .onSnapshot(function (snapshot) {
                let products: any = []
                snapshot.docs.forEach(function (data) {
                    products.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_PRODUCT', products });
            });
    }
}


export const createProduct = (products: any) => {
    return async (dispatch: (arg0: (dispatch: any) => void) => void) => {
        const data = await firestore().collection('products');
        data.add(
            {
                ...products
            }
        )
    }
}
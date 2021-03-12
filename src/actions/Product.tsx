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


export const loadNewProduct = () => {
    return async (dispatch: (arg0: { type: string; new_products: any }) => void) => {
        firestore().collection("products")
            .where('status', '==', true)
            .where("product_option", "==", 'new_arrival')
            .onSnapshot(function (snapshot) {
                let new_products: any = []
                snapshot.docs.forEach(function (data) {
                    new_products.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_NEW_PRODUCT', new_products });
            });
    }
}

export const loadTopProduct = () => {
    return async (dispatch: (arg0: { type: string; top_products: any }) => void) => {
        firestore().collection("products")
            .where('status', '==', true)
            .where("product_option", "==", 'top_product')
            .onSnapshot(function (snapshot) {
                let top_products: any = []
                snapshot.docs.forEach(function (data) {
                    top_products.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_TOP_PRODUCT', top_products });
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
import firestore from '@react-native-firebase/firestore';


export const loadNewProduct = () => {
    return async (dispatch: (arg0: { type: string; product_option: any }) => void) => {
        firestore().collection("products")
            .where("product_option", "==", 'New Arrival')
            .onSnapshot(function (snapshot) {
                let product_option: any = []
                snapshot.docs.forEach(function (data) {
                    product_option.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_NEW_PRODUCT', product_option });
            });
    }
}

// let subscribe: any = null

// export const loadShopProfessor = (shop_uid: any) => {
//     return async (dispatch: (arg0: { type: string; shop_professors: { id: string; items: { [key: string]: any; }; }[]; }) => void) => {
//         if (subscribe !== null) {
//             subscribe()
//         }
//         subscribe = firestore().collection("professors").where('uid', '==', shop_uid)
//             .onSnapshot(function (snapshot) {
//                 let shop_professors: any = []
//                 snapshot.docs.forEach(function (data) {
//                     shop_professors.push({
//                         id: data.id,
//                         items: data.data()
//                     });
//                 })
//                 dispatch({ type: 'LOAD_SHOP_PROFESSOR', shop_professors });
//             });
//     }
// }
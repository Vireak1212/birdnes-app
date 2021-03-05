import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

export const loadSlider = () => {
    return async (dispatch: (arg0: { type: string; slides: any }) => void) => {
        firestore().collection("slides")
            .onSnapshot(function (snapshot) {
                let slides: any = []
                snapshot.docs.forEach(function (data) {
                    slides.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_SLIDER', slides });
            });
    }
}
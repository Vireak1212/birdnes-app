import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

export const loadSlider = () => {
    return async (dispatch: (arg0: { type: string; slide_shows: any }) => void) => {
        firestore().collection("slide_shows")
            .onSnapshot(function (snapshot) {
                let slide_shows: any = []
                snapshot.docs.forEach(function (data) {
                    slide_shows.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_SLIDER', slide_shows });
            });
    }
}
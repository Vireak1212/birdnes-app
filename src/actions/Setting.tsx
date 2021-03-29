import firestore from '@react-native-firebase/firestore';


export const loadSetting = () => {
    return async (dispatch: (arg0: { type: string; settings: any }) => void) => {
        firestore().collection("settings")
            .onSnapshot(function (snapshot) {
                let settings: any = []
                snapshot.docs.forEach(function (data) {
                    settings.push({
                        id: data.id,
                        items: data.data()
                    })
                })
                dispatch({ type: 'LOAD_SETTING', settings });
            });
    }
}
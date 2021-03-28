import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Button } from 'native-base';
import React, { useState } from 'react'
import { Image, Linking, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { MAIN_BACKGROUND, MAIN_COLOR } from '../styles/index';

const UpdateScreen = () => {
    const [update, setUpdate] = useState<FirebaseFirestoreTypes.DocumentData | undefined>([])
    React.useEffect(() => {
        getUpdate()
    }, [])
    const getUpdate = async () => {
        let record = await firestore().collection("settings").doc("1").get();
        if (record.exists) {
            setUpdate(record.data())
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainerSecond}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../images/icon/logo.png')}
                    style={{ height: 80, width: 80, borderRadius: 5 }}
                />
                <Text style={styles.updateVersion}>
                    {update?.title}
                </Text>
                <Text style={{ color: MAIN_COLOR, fontSize: 16, marginTop: 5, }}>
                    {update?.description}
                </Text>
                <View style={{ width: '80%', marginTop: 30 }}>
                    <Button
                        style={styles.updateButton}
                        onPress={(() => {
                            let url = '';
                            if (Platform.OS === 'android') {
                                url = update?.playstore_link
                            }
                            else {
                                url = update?.appstore_link
                            }
                            Linking.openURL(url)
                            // if(Platform.OS === 'android')
                            //     RNExitApp.exitApp();
                        })}
                    >
                        <Text style={styles.updateButtonText}>
                            Update
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default UpdateScreen

const styles = StyleSheet.create({
    updateButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: MAIN_BACKGROUND,
        fontSize: 16,
    },
    updateButton: {
        height: 40,
        width: '100%',
        backgroundColor: MAIN_COLOR,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateVersion: {
        color: MAIN_COLOR,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10
    },
    safeAreaContainerSecond: {
        flex: 1,
        backgroundColor: MAIN_BACKGROUND
    },
})

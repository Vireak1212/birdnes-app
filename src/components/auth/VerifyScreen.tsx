import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { Text, View, TouchableOpacity, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { Button, Toast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../../functions/LoadData';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MAIN_COLOR } from '../../styles/index';
import { createClient } from '../../actions/Client';

let interval: any;
const CELL_COUNT: number = 6;
const VerifyScreen = (_props: any) => {
    const { phone_number } = _props.route.params;
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const [code, setCode] = useState('');
    const [verifiedID, setVerifiedID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [DurationCode, setDurationCode] = useState<any | number | string>(60);

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    React.useEffect(() => {
        if (DurationCode === 60) signInWithPhoneNumber(phone_number);
        return () => {
            clearInterval(interval);
        };
    }, [phone_number]);

    const lang = useSelector(
        (state: { lang: any }) => state.lang,
    );
    const style = useSelector(
        (state: { style: any }) => state.style,
    );
    async function signInWithPhoneNumber(phoneNumber: any, isResend = false) {
        setIsLoading(true)
        await auth()
            .verifyPhoneNumber(phoneNumber, isResend)
            .on('state_changed', async (phoneAuthSnapshot) => {
                setIsLoading(false)
                switch (phoneAuthSnapshot.state) {
                    case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                        const { verificationId, code } = phoneAuthSnapshot;
                        if (
                            verificationId !== '' ||
                            verificationId !== null ||
                            verificationId !== undefined
                        ) {
                            if (code !== null) {
                                setCode(code)
                                await _confirmCode(verificationId, code);
                            }
                        }
                        break;

                    case auth.PhoneAuthState.CODE_SENT: // or 'sent'
                        setVerifiedID(phoneAuthSnapshot.verificationId);
                        Toast.show({
                            text: 'Code sent!',
                            type: 'success',
                            duration: 4000,
                        });
                        let count = 0;
                        interval = setInterval(() => {
                            if (count === 60) {
                                clearInterval(interval);
                            }
                            setDurationCode((counter: number) => counter - 1);
                            count = count + 1;
                        }, 1000);
                        break;
                    case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                        break;
                    case auth.PhoneAuthState.ERROR: // or 'error'
                        break;
                }
            })
            .catch(async (error) => {
                setIsLoading(false)
                if (error.code === 'auth/too-many-requests') {
                    Toast.show({
                        text: 'Too many requests!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else if (error.code === 'auth/invalid-phone-number') {
                    Toast.show({
                        text: 'Invalid phone number!',
                        type: 'warning',
                        duration: 1000,
                    });
                } else if (error.code === 'auth/missing-phone-number') {
                    Toast.show({
                        text: 'Missing phone number!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else if (error.code === 'auth/quota-exceeded') {
                    Toast.show({
                        text: 'Quota exceeded!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else if (error.code === 'auth/operation-not-allowed') {
                    Toast.show({
                        text: 'Operation not allowed!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else if (error.code === 'auth/user-disabled') {
                    Toast.show({
                        text: 'User disabled!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else if (error.code === 'auth/retry-phone-auth') {
                    Toast.show({
                        text: 'Try again!',
                        type: 'warning',
                        duration: 4000,
                    });
                } else {
                    Toast.show({
                        text: 'System was problem!',
                        type: 'danger',
                        duration: 4000,
                    });
                }
                clearInterval(interval);
                if (auth().currentUser !== null) signInWithEmailAndPassword();
                console.log(error);
            });
    }
    async function _confirmCode(verificationId: any, code: any) {
        setIsLoading(true);
        const provider = await auth.PhoneAuthProvider;
        const authCredential = await provider.credential(verificationId, code);
        signInWithPhoneAuthCredential(authCredential);
    }
    async function signInWithPhoneAuthCredential(
        credential: FirebaseAuthTypes.AuthCredential,
    ) {
        await auth()
            .signInWithCredential(credential)
            .then(async (user) => {
                await updateClient(user);
            })
            .catch(async (error) => {
                console.log(error);
                setIsLoading(false);
                if (error.code === 'auth/invalid-verification-code') {
                    Toast.show({
                        text: 'Code is invalid!',
                        type: 'warning',
                        duration: 2000,
                    });
                    return;
                } else if (error.code === 'auth/user-disabled') {
                    Toast.show({
                        text: 'User disabled!',
                        type: 'warning',
                        duration: 2000,
                    });
                } else if (error.code === 'auth/invalid-verification-id') {
                    Toast.show({
                        text: 'Invalid verification!',
                        type: 'warning',
                        duration: 2000,
                    });
                }
                else {
                    Toast.show({
                        text: 'System was problem!',
                        type: 'danger',
                        duration: 2000,
                    });
                }
                clearInterval(interval);
                if (auth().currentUser !== null) signInWithEmailAndPassword();
            });
    }
    const addClient = async (item: any) => {
        const client = {
            allow_notification: true,
            client_info: {
                full_name: '',
                phone_number,
                photo_url: '',
                photo_url_file_name: ''
            },
            created_date: new Date(),
            is_disabled: false,
            keywords: [],
            uid: item.uid,
            shipping_address: [],
            favorite_product: []
        }
        dispatch(createClient(client))
        await AsyncStorage.setItem("uid", item.uid)
        loadData(dispatch, false)
        setTimeout(() => {
            navigate.navigate("Account");
        }, 1000);
    }
    async function updateClient(user: any) {
        clearInterval(interval);
        const item = user?.user;
        let record = await firestore()
            .collection('clients')
            .where('uid', '==', item?.uid)
            .get();
        if (record.docs.length === 0) {
            addClient(item)
            loadData(dispatch, false)
            setTimeout(() => {
                navigate.navigate("Account");
            }, 1000);
        } else {
            if (record.docs[0].data().is_disabled) {
                signInWithEmailAndPassword()
                return;
            }
            refreshToken(item)
        }
    }
    async function signInWithEmailAndPassword() {
        await auth()
            .signInWithEmailAndPassword('hel.sreyet2014b@gmail.com', 'Ph$arTech#2020')
            .then(async () => {
                dispatch({ type: 'LOAD_CLIENT', client: [] });
                loadData(dispatch, false)
                navigate.goBack();
            })
            .catch(async (error: any) => {
                console.log(error);
                setIsLoading(false)
                Toast.show({
                    text: 'System was problem!',
                    type: 'danger',
                    duration: 2000,
                });
            });
    }
    function verifyCode() {
        if (code.length !== 6) {
            Toast.show({
                text: 'System was problem!',
                type: 'warning',
                duration: 4000,
            });
            return;
        } else {
            _confirmCode(verifiedID, code);
        }
    }
    const registerForNotification = async () => {
        // await requestNotifications(['alert', 'badge', 'sound']);
        await messaging().registerDeviceForRemoteMessages();
    };
    const requestForNotificationPermission = async () => {
        const granted = await messaging().requestPermission();
        if (granted) {

            console.log('User granted messaging permissions!');
        } else {
            console.log('User declined messaging permissions :(');
        }
    };
    const refreshToken = async (item: any) => {
        const check = await messaging().isDeviceRegisteredForRemoteMessages;
        if (Platform.OS === 'ios' || !check) {
            await registerForNotification();
        }
        await requestForNotificationPermission();
        await AsyncStorage.setItem("uid", item.uid)
        loadData(dispatch, false)
        setTimeout(() => {
            navigate.navigate('Account')
        }, 1000);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Spinner visible={isLoading} />
            <TouchableOpacity
                style={styles.btnBack} activeOpacity={0.9} onPress={() => navigate.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={22} />
            </TouchableOpacity>
            <ScrollView>
                <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={
                        [style.p, {
                            color: '#314f4f',
                            fontSize: 18,
                            marginTop: 10
                        }]}>Verification Code</Text>
                    <Text style={[style.p, {
                        opacity: 0.5,
                        textAlign: 'center',
                        lineHeight: 25,
                        marginTop: 10
                    }]}>Verify code will be sent to your phone number</Text>
                    <Text style={[style.p, {
                        opacity: 0.5,
                        textAlign: 'center',
                        lineHeight: 25,
                        marginTop: 5
                    }]}>{phone_number.replace('+855', '(+855) ')}</Text>
                    {DurationCode > 0 ? (
                        <Text style={[style.p, { fontSize: 15, marginVertical: 10, marginLeft: 10, color: '#444' }]}>
                            {DurationCode >= 60 ? '1:' : '0:'}
                            {DurationCode - 60 < 10 && DurationCode >= 60 ? '0' : ''}
                            {DurationCode < 10 ? '0' : ''}
                            {DurationCode >= 60 ? DurationCode - 60 : DurationCode}
                        </Text>
                    ) : null}

                    <CodeField
                        ref={ref}
                        {...props}
                        value={code}
                        onChangeText={setCode}
                        cellCount={CELL_COUNT}
                        rootStyle={style.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }: any) => (
                            <View
                                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                onLayout={getCellOnLayoutHandler(index)}
                                key={index}
                                style={[style.cellRoot, isFocused && style.focusCell]}>
                                <Text style={style.cellText}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setDurationCode(60);
                            signInWithPhoneNumber(phone_number, true);
                        }}>
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            {DurationCode > 0 ? null : (
                                <Text
                                    style={[
                                        style.p,
                                        {
                                            fontSize: 15,
                                            marginTop: 30,
                                            textDecorationLine: 'underline',
                                            color: '#7a1a22',
                                        },
                                    ]}>
                                    Resend Code
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>

                    <Button
                        full
                        rounded
                        onPress={async () => {
                            verifyCode()
                        }}
                        style={{
                            marginHorizontal: 10,
                            marginTop: DurationCode > 0 ? 40 : 30,
                            backgroundColor: MAIN_COLOR
                        }}
                    >
                        <Text style={[style.p, {
                            color: "#fff",
                            textAlign: 'center',
                            width: '90%',
                            fontSize: 16
                        }]}>
                            Confirm
                        </Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default React.memo(VerifyScreen);
const styles = StyleSheet.create({
    btnBack: {
        height: 50,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
        marginLeft: 10
    }
})
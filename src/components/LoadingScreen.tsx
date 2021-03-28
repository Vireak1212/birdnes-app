import React from 'react'
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../functions/UserAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Swing } from 'react-native-animated-spinkit';
import { MAIN_COLOR } from '../styles/index';

messaging().setBackgroundMessageHandler(async () => {
    if (Platform.OS === 'android')
        StatusBar.setBackgroundColor('#fff', true)
});

const LoadingScreen = () => {
    const _auth = useAuth();
    const navigate = useNavigation()
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (_auth.user !== null) {
            setTimeout(async () => {
                if (_auth.isUpdate) {
                    navigate.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Update',
                            },
                        ],
                    });
                }
                else {
                    navigate.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'MainHome',
                            },
                        ],
                    });
                    onNavigate()
                }
            }, 200);
        }
    }, [_auth])

    const onNavigate = () => {
        messaging()
            .getInitialNotification()
            .then((notificationOpen: any) => {
                if (notificationOpen !== null && notificationOpen !== undefined) {
                    if (notificationOpen.data.type == 'Message') {
                        navigate.navigate('MessageDetail', {
                            client_uid: notificationOpen.data.sender_client_uid
                        })
                    }
                    else if (notificationOpen.data.type == 'Booking') {
                        firestore().collection("bookings")
                            .doc(notificationOpen.data.booking_id)
                            .get()
                            .then((snapshot) => {
                                if (snapshot.exists) {
                                    dispatch({ type: 'LOAD_CURRENT_BOOKING', current_booking: snapshot.data() })
                                    if (notificationOpen.data.is_order) {
                                        navigate.navigate('OrderDetail', {
                                            navigate_name: 'MainHome',
                                            booking_id: notificationOpen.data.booking_id,
                                            reward_info: JSON.parse(notificationOpen.data.reward_info)
                                        })
                                    }
                                    else {
                                        navigate.navigate('BookingDetail', {
                                            navigate_name: 'MainHome',
                                            booking_id: notificationOpen.data.booking_id,
                                            reward_info: JSON.parse(notificationOpen.data.reward_info)
                                        })
                                    }
                                }
                            })
                    }
                    else if (notificationOpen.data.type == 'Promotion') {
                        firestore().collection("promotions")
                            .doc(notificationOpen.data.promotion_id)
                            .get()
                            .then((snapshot) => {
                                if (snapshot.exists) {
                                    navigate.navigate('PromotionDetail', {
                                        promotion: {
                                            id: snapshot.id,
                                            items: snapshot.data()
                                        }
                                    })
                                }
                            })
                    }
                    else if (notificationOpen.data.type == 'NewShop') {
                        firestore().collection("shops")
                            .doc(notificationOpen.data.shop_id)
                            .get()
                            .then((snapshot) => {
                                if (snapshot.exists) {
                                    navigate.navigate('ShopDetail', {
                                        shop: {
                                            id: snapshot.id,
                                            items: snapshot.data()
                                        }
                                    })
                                }
                            })
                    }
                }
            })
            .catch(() => { });
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                <Image
                    style={{
                        width: 150,
                        height: 150
                    }}
                    source={require('../images/icon/logo.png')}
                />
                <Swing size={48} color={MAIN_COLOR} />
            </View>
        </SafeAreaView>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#F6F8FA'
    },
})

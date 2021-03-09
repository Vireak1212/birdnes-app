import { Row } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style, { ICON_COLOR, PRICE_COLOR } from '../styles/index'
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
            <MainHeader
                title={'Profile'}
            />
            <ScrollView>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <View style={style.backgroundImage}>
                        <Image style={style.Imagestyle}
                            source={require('../images/placeholder400x400.jpg')}
                            resizeMethod="auto"
                            resizeMode="cover"
                        />
                        <View style={{ position: 'absolute', bottom: 0, right: 2 }}>
                            <View style={style.Camera}>
                                <Entypo name='camera' size={20} color='#000' />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 5 }}>
                    <View style={style.backgroundAccountinfo}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Account Info</Text>
                            <Text style={{ opacity: 0.4, marginTop: 10 }}>
                                Information about your dransaction
                            </Text>
                            <TouchableOpacity>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View>
                                        <Fontisto name='play-list' size={25}
                                            style={{ marginTop: 15, opacity: 0.6 }}
                                            color='#000' />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 18 }}>Orders</Text>
                                        <Text style={{ marginTop: 10, opacity: 0.4 }}>
                                            View your order informations
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View>
                                        <AntDesign name='star' size={30}
                                            style={{ marginTop: 15, opacity: 0.6 }}
                                            color='#000' />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text>Wishlish</Text>
                                        <Text style={{ marginTop: 15, opacity: 0.4 }}>
                                            All your favorite wishlist
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.backgroundAccountsetting}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Account Settings
                            </Text>
                            <Text style={{ opacity: 0.4, marginTop: 10, width: '100%' }}>
                                Manage information about, your payments and your contacts,
                                and your account in general.
                            </Text>
                            <TouchableOpacity onPress={() => navigate.navigate('editProfile')}>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View>
                                        <FontAwesome5 name='user-cog' size={25}
                                            style={{ marginTop: 15, opacity: 0.6 }} color='#000' />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text>Update Information</Text>
                                        <Text style={{ marginTop: 15, opacity: 0.4 }}>
                                            Update your name, phone number and email address
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate.navigate('shippingAdress')}>
                                <View style={{ marginTop: 30, flexDirection: 'row' }}>
                                    <View>
                                        <FontAwesome5 name='car-side' size={25}
                                            style={{ marginTop: 20, opacity: 0.6 }} color='#000' />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text>
                                            Shipping Address
                                    </Text>
                                        <Text style={{ marginTop: 15, opacity: 0.4 }}>
                                            Make Update to your current address
                                    </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
<<<<<<< HEAD
                            <TouchableOpacity
                            // onPress={() => navigate.navigate('login')}
                            >
                                <View style={styles.signOut}>
=======
                            <TouchableOpacity onPress={() => navigate.navigate('login')}>
                                <View style={style.signOut}>
>>>>>>> c142e8b607db6d7cce600c55d459c62a3bf140fd
                                    <Text style={{ color: '#fff' }}>Sign Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

})

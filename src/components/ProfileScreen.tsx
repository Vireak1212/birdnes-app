import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MAIN_COLOR } from '../styles/index'
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';
import MultiImage from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker'

const ProfileScreen = () => {
    const clients = useSelector((state: { clients: any }) => state.clients);
    const [photo_url, setPhoto_url] = useState({ uri: '' });
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const selectImage = () => {
        const options = {
            title: 'Choose Image',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo...',
            chooseFromLibraryButtonTitle: 'Choose From Gallery...',
            quality: 0.8,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log(response.error)

            } else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPhoto_url(source);
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
            <MainHeader
                title={'Profile'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: '#fff',
                    marginBottom: 15,
                    flexDirection: 'row'
                }}>
                    <View style={style.backgroundImage}>
                        <Image style={style.Imagestyle}
                            source={photo_url}
                            resizeMethod="auto"
                            resizeMode="cover"
                        />

                        <TouchableOpacity style={style.Camera} onPress={selectImage}>
                            <Entypo name='camera' size={20} color='#000' />
                        </TouchableOpacity>
                    </View>

                    <Col style={{
                        marginRight: 15,
                        justifyContent: 'center'
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: MAIN_COLOR }}>
                            {clients.items.client_info.first_name} {clients.items.client_info.last_name}
                        </Text>
                        <Text style={{ color: '#aaa' }}>{'(+855)' + clients.items.client_info.phone_number}</Text>
                    </Col>
                </View>


                <View style={style.backgroundAccountinfo}>
                    <View style={{ margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Account Info</Text>
                        <Text style={{ opacity: 0.4, marginTop: 5, fontSize: 12 }}>
                            Information about your dransaction
                        </Text>

                        <TouchableOpacity style={styles.accountInfoContainer}
                            onPress={() => navigate.navigate('Order')}>

                            <Fontisto name='play-list' size={24} style={{ opacity: 0.6 }} color='#000' />
                            <Col style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 18 }}>Orders</Text>
                                <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 5, }}>
                                    View your order informations
                                </Text>
                            </Col>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.accountInfoContainer}
                            onPress={() => navigate.navigate('Favorite')}>

                            <FontAwesome name='star' size={30} style={{ opacity: 0.6 }} color='#000' />
                            <Col style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 18 }}>Wishlish</Text>
                                <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 5, }}>
                                    All your favorite wishlist
                                </Text>
                            </Col>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.backgroundAccountsetting}>
                    <View style={{ margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Account Settings
                            </Text>
                        <Text style={{ opacity: 0.4, marginTop: 5, fontSize: 12 }}>
                            Manage information about, your payments and your contacts,
                            and your account in general.
                        </Text>

                        <TouchableOpacity style={styles.accountInfoContainer}
                            onPress={() => navigate.navigate('EditProfile')}>
                            <FontAwesome5 name='user-cog' size={25} style={{ opacity: 0.6 }} color='#000' />

                            <Col style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 18 }}>Update Information</Text>
                                <Text style={{ opacity: 0.4, marginTop: 5, fontSize: 12 }} numberOfLines={1}>
                                    Update your name, phone number and email address
                                </Text>
                            </Col>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.accountInfoContainer}
                            onPress={() => navigate.navigate('ShippingAdress')}>


                            <FontAwesome5 name='car-side' size={25}
                                style={{ opacity: 0.6 }} color='#000' />
                            <Col style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 18 }}>
                                    Shipping Address
                                        </Text>
                                <Text style={{ opacity: 0.4, fontSize: 12, marginTop: 5, }}>
                                    Make Update to your current address
                                </Text>
                            </Col>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

            <TouchableOpacity style={style.signOut}
                onPress={() => navigate.navigate('Login')}>
                <Text style={{ color: '#fff' }}>Sign Out</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default ProfileScreen
const styles = StyleSheet.create({
    accountInfoContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

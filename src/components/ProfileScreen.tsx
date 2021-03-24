import { Col, Row, Toast } from 'native-base';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MAIN_COLOR } from '../styles/index'
import MainHeader from '../custom_items/MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker'
import { GetImage } from '../functions/PTFunction';
import { updateClient } from '../actions/Client';

const ProfileScreen = () => {
    const clients = useSelector((state: { clients: any }) => state.clients);
    const [photo_url, setPhoto_url] = useState({ uri: '' });
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const [isSignIn, setSignIn] = useState(false);
    const dispatch = useDispatch();

    const selectImage = () => {
        const options = {
            title: 'Choose Image',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo...',
            chooseFromLibraryButtonTitle: 'Choose From Gallery...',
            quality: 1,
            maxWidth: 800,
            maxHeight: 512,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log(response.error)
                Toast.show({
                    text: `Can't get image!`,
                    type: 'danger',
                    duration: 2000,
                });
            } else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPhoto_url(source);
                onSave(source)
            }
        });
    };

    const onSave = async (source: any) => {
        if (
            source.uri !== '' &&
            source.uri !== undefined &&
            source.uri !== null
        ) {
            const { uri } = source;
            let file_name = '';
            let file_image = '';
            let is_add_image = false;

            clients.items.client_info.photo_url !== uri
            is_add_image = true;

            if (is_add_image) {
                file_name = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const task = storage()
                    .ref('/profiles/' + file_name)
                    .putFile(uploadUri);
                try {
                    await task;
                    file_image = await GetImage(file_name, 'profiles');
                    onUpdateToDB(file_name, file_image,)
                } catch (e) {
                    console.log(e);
                    Toast.show({
                        text: 'System was problem!',
                        type: 'danger',
                        duration: 2000,
                    });
                    return;
                }
            }

        }
    }

    const onUpdateToDB = async (file_name: any, file_image: any) => {
        // (clients.items.client_info.photo_url !== '' && clients.items.client_info.photo_url_file_name)
        let _cleint: any = clients;
        _cleint.items.client_info.photo_url = file_image
        _cleint.items.items.client_info.photo_url_file_name = file_name;
        dispatch(updateClient(clients.id, _cleint.items));
    }

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
                    {photo_url.uri === '' ? (
                        <View style={style.backgroundImage}>
                            <TouchableOpacity style={style.Camera} onPress={() => selectImage()}>
                                <Entypo name='camera' size={20} color='#000' />
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <View style={style.backgroundImage}>
                            <Image style={style.Imagestyle}
                                source={photo_url}
                                resizeMethod="auto"
                                resizeMode="cover"
                            />

                        </View>
                    )}


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
                <Text style={{ color: '#fff' }}> {isSignIn ? 'Sign In' : 'Sign Out'}</Text>
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

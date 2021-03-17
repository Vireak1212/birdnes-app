import { useNavigation } from '@react-navigation/native';
import { Button, Row, Toast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateClient } from '../../actions/Client';
import MainHeader from '../../custom_items/MainHeader';
import { createKeyWords, isEmail } from '../../functions/PTFunction';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'

const EditProfile = () => {
    const clients = useSelector((state: { clients: any }) => state.clients);
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    console.log(clients)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(clients.items.client_info.email);

    const firstNameRef = React.createRef<TextInput>()
    const lastNameRef = React.createRef<TextInput>()
    const emailRef = React.createRef<TextInput>()

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (clients.length !== 0) {
            setFirstName(clients.items.client_info.first_name)
            setLastName(clients.items.client_info.last_name)
        }
    }, [clients.length])

    const _onSave = () => {
        if (firstName.trim().length === 0) {
            if (firstNameRef.current !== undefined && firstNameRef.current !== null) {
                firstNameRef.current.focus()
                Toast.show({
                    text: 'Please enter your first name!',
                    type: 'warning',
                    duration: 2000
                })
                return;
            }
        }

        if (lastName.trim().length === 0) {
            if (lastNameRef.current !== undefined && lastNameRef.current !== null) {
                lastNameRef.current.focus()
                Toast.show({
                    text: 'Please enter your last name!',
                    type: 'warning',
                    duration: 2000
                })
                return;
            }
        }

        if (email.trim().length === 0) {
            if (emailRef.current !== undefined && emailRef.current !== null) {
                emailRef.current.focus()
                Toast.show({
                    text: 'Please enter your email!',
                    type: 'warning',
                    duration: 2000
                })
                return;
            }
        }
        // if (!isEmail(email)) {
        //     if (emailRef.current !== undefined && emailRef.current !== null) {
        //         emailRef.current.focus()
        //         Toast.show({
        //             text: 'Email is incorrect!',
        //             type: 'warning',
        //             duration: 2000
        //         })
        //         return;
        //     }
        // }
        clients.items.client_info.email = email;
        clients.items.client_info.first_name = firstName;
        clients.items.client_info.last_name = lastName;
        clients.items.keywords = createKeyWords(firstName.toLocaleLowerCase())
        clients.items.keywords = createKeyWords(lastName.toLocaleLowerCase())
        dispatch(updateClient(clients.id, clients.items))
        Toast.show({
            text: 'Updated',
            type: 'success',
            duration: 2000
        })
        navigate.goBack()
    }

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Update Profile'}
                leftIcon={leftIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 30, marginTop: 30 }}>
                    <Text style={{ fontSize: 30 }}>Update Profile</Text>
                    <Text style={{ color: '#224889' }}>
                        Make change to your personal information</Text>


                    <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            ref={firstNameRef}
                            placeholder="First name"
                            onChangeText={(text) => {
                                setFirstName(text)
                            }}
                            value={firstName}
                        />
                    </View>

                    <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            ref={lastNameRef}
                            placeholder="Last name"
                            onChangeText={(text) => {
                                setLastName(text)
                            }}
                            value={lastName}
                        />
                    </View>
                    <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            ref={emailRef}
                            placeholder="Email"
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            value={email}
                        />
                    </View>
                </View>

                <View style={{ marginHorizontal: 30 }}>
<<<<<<< HEAD
                    <Button onPress={() => navigate.navigate('CheckOut')}
=======
                    <Button onPressIn={() => _onSave()}
>>>>>>> 81c1d36eebddf40fd832497105c3781fd64177aa
                        // onPress={() => onSave()}
                        full rounded style={style.ButtonUpdate}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Update</Text>
                        </Row>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default EditProfile;
const styles = StyleSheet.create({})
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
    const client = useSelector((state: { client: any }) => state.client);
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState(client.items.client_info.email);

    const fullNameRef = React.createRef<TextInput>()
    const firstNameRef = React.createRef<TextInput>()
    const lastNameRef = React.createRef<TextInput>()
    const emailRef = React.createRef<TextInput>()

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (client.length !== 0) {
            setFullName(client.items.client_info.full_name)
        }
    }, [client.length])

    const _onSave = () => {
        if (fullName.trim().length === 0) {
            if (fullNameRef.current !== undefined && fullNameRef.current !== null) {
                fullNameRef.current.focus()
                Toast.show({
                    text: 'Please enter your full name!',
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
        client.items.client_info.email = email;
        client.items.client_info.full_name = fullName;
        client.items.keywords = createKeyWords(firstName.toLocaleLowerCase())
        client.items.keywords = createKeyWords(lastName.toLocaleLowerCase())
        dispatch(updateClient(client.id, client.items))
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
                            placeholder="Full name"
                            onChangeText={(text) => {
                                setFullName(text)
                            }}
                            value={fullName}
                        />
                    </View>

                    {/* <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            ref={lastNameRef}
                            placeholder="Last name"
                            onChangeText={(text) => {
                                setLastName(text)
                            }}
                            value={lastName}
                        />
                    </View> */}
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
                    <Button onPressIn={() => _onSave()}
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
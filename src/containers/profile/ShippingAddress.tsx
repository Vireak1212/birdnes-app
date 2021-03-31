import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row, Toast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateClient } from '../../actions/Client';
import MainHeader from '../../custom_items/MainHeader';
import { makeid } from '../../functions/PTFunction';
import { MAIN_COLOR } from '../../styles';


const ShippingAddress = () => {

    const navigate = useNavigation();
    const client = useSelector((state: { client: any }) => state.client);
    const style = useSelector((state: { style: any }) => state.style)
    const dispatch = useDispatch<any>()

    const [manualAddress, setManualAddress] = useState('')
    const [address, setAddress] = useState<any>([])
    const [isManualAddress, setIsManualAddress] = useState(false)

    const addressRef = React.createRef<TextInput>()

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const onAddressPress = (item: any) => {
        setAddress(item)
        setManualAddress('')
        setIsManualAddress(false)
    }

    const _deleteAddress = (address: any) => {
        client.items.shipping_address = client.items.shipping_address.filter((r: any) => r != address)
        dispatch(updateClient(client.id, client.items))
    }

    const onSave = () => {
        let shipping_address = client.items.shipping_address;
        shipping_address.push(manualAddress)
        client.items.shipping_address = shipping_address;
        dispatch(updateClient(client.id, client.items))
        setManualAddress('')
        setIsManualAddress(false)
        setAddress(manualAddress)
        Toast.show({
            text: "Your location has been add",
            type: 'success',
            duration: 2000
        })
    }

    const onManualAddress = () => {
        return (
            <View style={style.manualLoccationContainer}>
                <Col>
                    <TextInput
                        style={{ fontSize: 15, marginLeft: 10, }}
                        multiline
                        ref={addressRef}
                        placeholder="Enter your address!"
                        onChangeText={(text: any) => {
                            setManualAddress(text)
                            setAddress('')
                        }}
                        value={manualAddress}
                    />
                </Col>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        setManualAddress('')
                        setIsManualAddress(false)
                    }}>
                        <AntDesign name="close" size={23} color={'#FF0000'} style={{ paddingHorizontal: manualAddress.trim().length === 0 ? 10 : 0 }} />
                    </TouchableOpacity>

                    {manualAddress.trim().length !== 0 &&
                        <TouchableOpacity onPress={() => onSave()}>
                            <AntDesign name='check' size={23} color={MAIN_COLOR} style={{ paddingHorizontal: 10 }} />
                        </TouchableOpacity>}

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Shipping Address'}
                leftIcon={leftIcon()}
            />
            <ScrollView>
                <View style={{ marginHorizontal: 15, paddingTop: 10 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>

                        <TouchableOpacity style={style.addAddressContainer}
                            onPress={() => {
                                setIsManualAddress(false)
                                Alert.alert(
                                    'Address',
                                    'Please set your address?',
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("No Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: 'Add frome google map',
                                            onPress: () => navigate.navigate('Map', {
                                                isCheckOut: false
                                            })

                                        },
                                        {
                                            text: 'Add manual address',
                                            onPress: () => {
                                                setIsManualAddress(true)
                                            },
                                        },

                                    ]
                                )
                            }}>
                            <Text style={{ paddingRight: 10, textDecorationLine: 'underline' }}>Add Address</Text>
                            <AntDesign name='pluscircleo' size={25} />
                        </TouchableOpacity>
                    </Row>

                    {isManualAddress && onManualAddress()}

                    {client.items.shipping_address.map((_address: any) => {
                        return (
                            <TouchableOpacity
                                key={makeid()}
                                onPress={() => {
                                    onAddressPress(_address)
                                }}
                                style={[style.shippingAddress,
                                {
                                    flexDirection: 'row',
                                    backgroundColor: _address === address ? '#eee' : '#fff'
                                }]}>

                                <Col>
                                    <Text style={{
                                        opacity: 0.5,
                                        paddingLeft: 10,
                                        textDecorationLine: _address === address ? 'underline' : 'none'
                                    }}>
                                        {_address}
                                    </Text>
                                </Col>

                                {_address !== address ? <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        "Delete Cart",
                                        "Are you sure to delete this Cart?",
                                        [
                                            {
                                                text: "No",
                                                onPress: () => console.log("No Pressed"),
                                                style: "cancel"
                                            },
                                            {
                                                text: "Yes",
                                                onPress: () => _deleteAddress(_address),
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }}>
                                    <MaterialIcons name="delete-forever" size={25} color={'#FF0000'} />
                                </TouchableOpacity> :
                                    <Ionicons name='checkmark-circle' size={25} color={MAIN_COLOR} />
                                }

                            </TouchableOpacity>
                        )
                    })}

                </View>
            </ScrollView>

        </SafeAreaView >

    );
}


export default ShippingAddress;
const styles = StyleSheet.create({})
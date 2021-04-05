import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row, Toast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator, FlatList, } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, updateCart } from '../../actions/Cart';
import { updateClient } from '../../actions/Client';
import MainHeader from '../../custom_items/MainHeader';
import { makeid, pad } from '../../functions/PTFunction';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles/index';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CheakoutScreen = (props: any) => {
    const { current_address } = props.route.params;
    const navigate = useNavigation();
    const dispatch = useDispatch<any>()

    const cart = useSelector((state: { cart: any }) => state.cart);
    const client = useSelector((state: { client: any }) => state.client);
    const style = useSelector((state: { style: any }) => state.style)
    const settings = useSelector((state: { settings: any }) => state.settings)

    const [newPhone, setNewPhone] = useState(client.items.client_info.phone_number)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [manualAddress, setManualAddress] = useState('')
    const [address, setAddress] = useState<any>([])
    const [isManualAddress, setIsManualAddress] = useState(false)

    const phoneRef = React.createRef<TextInput>()
    const addressRef = React.createRef<TextInput>()
    const manualAddressRef = React.createRef<TextInput>()

    React.useEffect(() => {
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [cart.length])

    React.useEffect(() => {
        setAddress(current_address)
    }, [current_address])


    const onCheckOut = async () => {

        const total_carts = await firestore().collection('carts').where('is_confirm', '==', true).get();
        const start_number = settings.filter((r: any) => r.id === '2')[0];
        const document = pad(parseInt(start_number.items.setting_value) + total_carts.docs.length + 1, parseInt(start_number.items.setting_digit));
        cart.items.client_info.address = address;
        cart.items.client_info.phone_number = newPhone;

        dispatch(updateCart(cart.id, {
            is_confirm: true,
            document_number: start_number.items.setting_prefix + document,
            client_info: cart.items.client_info
        }))

        Toast.show({
            text: 'your product is successful order',
            type: 'success',
            duration: 2000
        })
        dispatch(loadCart(false))
        navigate.navigate('MainHome');
    }

    const _deleteAddress = (address: any) => {
        client.items.shipping_address = client.items.shipping_address.filter((r: any) => r != address)
        dispatch(updateClient(client.id, client.items))
    }

    const onAddressPress = (item: any) => {
        setAddress(item)
        setManualAddress('')
        setIsManualAddress(false)
    }

    const onSave = () => {
        let check_location = client.items.shipping_address.filter((r: any) => r === manualAddress);
        if (check_location.length > 0) {
            Toast.show({
                text: "Your location already exists",
                type: 'warning',
                duration: 2000
            })
            return;
        }
        let shipping_address = client.items.shipping_address;
        shipping_address.push(manualAddress)
        client.items.shipping_address = shipping_address;
        dispatch(updateClient(client.id, client.items))
        setManualAddress('')
        setIsManualAddress(false)
        setAddress(manualAddress)
    }

    const onConfirm = () => {
        if (address.trim().length === 0) {
            Toast.show({
                text: 'please add your address',
                type: 'danger',
                duration: 2000,
            });
            return;
        }
        if (newPhone.trim().length === 0) {
            Alert.alert(
                'Contact Number',
                'Please enter your contact number!',
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("No Pressed"),
                        style: "cancel"
                    },
                    {
                        text: 'Add contact number',
                        onPress: () => {
                            if (phoneRef.current !== undefined && phoneRef.current !== null)
                                phoneRef.current.focus()
                        },
                    }
                ]
            )
            return;
        }

        Alert.alert(
            "Check Out",
            "Are you sure to Check Out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => onCheckOut(),
                }
            ],
            { cancelable: false }
        )

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
                        value={(manualAddress)}
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
                            <AntDesign name='check' size={23} color={MAIN_COLOR} style={{ paddingRight: 10, paddingLeft: 17 }} />
                        </TouchableOpacity>}

                </View>
            </View>
        )
    }

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Checkout'}
                leftIcon={leftIcon()}
            />
            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                :
                <>
                    {cart.length !== 0 &&
                        <>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                                    <Row style={{ justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>

                                        <TouchableOpacity onPress={() => {
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
                                                            isCheckOut: true
                                                        })

                                                    },
                                                    {
                                                        text: 'Add manual address',
                                                        onPress: () => {
                                                            if (manualAddressRef.current !== undefined && manualAddressRef.current !== null)
                                                                manualAddressRef.current.focus();
                                                            setIsManualAddress(true)

                                                        },
                                                    },

                                                ]
                                            )
                                        }} style={style.addAddressContainer}>
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
                                                    backgroundColor: _address === address ? '#eee' : '#fff',
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

                                                {_address !== address ? <TouchableOpacity style={{ borderWidth: 1, padding: 5 }}
                                                    onPress={() => {
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

                                    <View style={{ justifyContent: 'space-between', paddingTop: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Contact Number</Text>

                                        <View style={style.addNewPhoneContainer}>
                                            <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                                                ref={phoneRef}
                                                placeholder="Add contact number "
                                                onChangeText={(text) => {
                                                    setNewPhone(text)
                                                }}
                                                value={newPhone}
                                                keyboardType="phone-pad"
                                            />
                                        </View>

                                    </View>


                                    {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Payment Method</Text>
                                    <Row style={style.paymentContainer}>
                                        <FastImage
                                            source={require('../../images/icon/delevery.png')}
                                            style={{
                                                height: 45,
                                                width: 50,
                                            }} />
                                        <TouchableOpacity onPress={() => {
                                            Alert.alert('Coming Soon')
                                        }}>
                                            <Text style={{ color: '#224889', marginLeft: 15 }}>Choose on delevery</Text>
                                        </TouchableOpacity>
                                    </Row> */}

                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Items</Text>

                                    {cart.items.order_info.products.map((_product: any) => {
                                        return (
                                            <View key={makeid()}
                                                style={style.checkOutItemCotainer}>

                                                <FastImage
                                                    source={{ uri: _product.unit.photo_url }}
                                                    style={{
                                                        height: 110,
                                                        width: 110,
                                                        borderRadius: 10,
                                                        margin: 5,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                />

                                                <Col style={{ padding: 5 }}>
                                                    <Col style={{ marginLeft: 5, justifyContent: 'space-between' }}>
                                                        <View>
                                                            <Text style={{
                                                                color: '#000',
                                                                fontSize: 16
                                                            }} numberOfLines={1}>
                                                                {_product.product_name}
                                                            </Text>
                                                            <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                                                code: {_product.product_code}
                                                            </Text>

                                                            <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                                                x{_product.qty} {_product.unit.unit_name}
                                                            </Text>
                                                        </View>
                                                    </Col>

                                                    <View>
                                                        <NumberFormat
                                                            value={_product.amount}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            decimalScale={2}
                                                            fixedDecimalScale={true}
                                                            prefix={''}
                                                            renderText={value =>
                                                                <Text style={{ color: PRICE_COLOR }}
                                                                    numberOfLines={1}
                                                                >{"$ " + value}
                                                                </Text>} />
                                                    </View>
                                                </Col>
                                            </View>
                                        )
                                    })}

                                </View>
                            </ScrollView>

                            <View style={style.checkOutContainer}>
                                <Col>
                                    <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                                    <NumberFormat
                                        value={cart.items.order_info.total_amount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        prefix={''}
                                        renderText={value =>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 20
                                            }}
                                                numberOfLines={1}
                                            >{"$ " + value}
                                            </Text>} />
                                </Col>

                                <TouchableOpacity onPress={() => {
                                    onConfirm()
                                }}
                                    style={style.styleCHACKOUT} >
                                    <Text style={{ color: '#fff' }}>CHECKOUT</Text>
                                    <AntDesign name='playcircleo' size={20}
                                        style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                                </TouchableOpacity>
                            </View>
                        </>}
                </>
            }
        </SafeAreaView>
    );
}

export default CheakoutScreen;
const styles = StyleSheet.create({})


import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row, Toast } from 'native-base';
import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../actions/Cart';
import MainHeader from '../../custom_items/MainHeader';
import { makeid } from '../../functions/PTFunction';

const CheakoutScreen = (props: any) => {
    const { data } = props.route.params;
    const navigate = useNavigation();
    const carts = useSelector((state: { carts: any }) => state.carts);
    const style = useSelector((state: { style: any }) => state.style)

    const dispatch = useDispatch()

    const onCheckOut = () => {
        dispatch(updateCart(carts.id, {
            is_confirm: true
        }))
        Toast.show({
            text: 'your product is successful order',
            type: 'warning',
            duration: 3000
        })
        navigate.navigate('Home');
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
            {carts.length !== 0 &&
                <>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>
                            <Row style={{
                                backgroundColor: '#fff',
                                height: 80,
                                width: '100%',
                                borderWidth: 0.5,
                                marginTop: 10,
                                borderColor: '#224889',
                                borderRadius: 5,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <View style={{}}>
                                    <Text>Name : Tanglim</Text>
                                    <Text style={{ opacity: 0.5, marginTop: 5 }}>N28 St 149, Phnom Penh, Cambodia</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                                    <FastImage
                                        source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_138923.png' }}
                                        style={{
                                            height: 25,
                                            width: 25,
                                            borderRadius: 20,
                                            backgroundColor: '#eee'
                                        }} />
                                </TouchableOpacity>
                            </Row>

                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Payment Method</Text>

                            <Row style={{
                                backgroundColor: '#fff',
                                height: 80,
                                width: '100%',
                                borderWidth: 0.5,
                                marginTop: 10,
                                borderColor: '#224889',
                                borderRadius: 5,
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <FastImage
                                    source={{ uri: 'https://static.thenounproject.com/png/3306801-200.png' }}
                                    style={{
                                        height: 45,
                                        width: 50,
                                    }} />
                                <TouchableOpacity onPress={() => {
                                    Alert.alert('Coming Soon')
                                }}>
                                    <Text style={{ color: '#224889', marginLeft: 15 }}>Choose on delevery</Text>
                                </TouchableOpacity>
                            </Row>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Items</Text>

                        </View>

                        {carts.items.order_info.products.map((_product: any) => {
                            return (
                                <View key={makeid()} style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    marginTop: 10,
                                    marginHorizontal: 15
                                }}>
                                    <TouchableOpacity>
                                        <FastImage
                                            source={{ uri: _product.unit.photo_url }}
                                            style={{
                                                height: 110,
                                                width: 110,
                                                borderRadius: 10,
                                                margin: 5,
                                            }} />

                                    </TouchableOpacity>
                                    <Col style={{ marginLeft: 5 }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 16
                                        }} numberOfLines={1}>
                                            {_product.product_name}
                                        </Text>
                                        <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                            code: {_product.product_code}
                                        </Text>

                                        {/* <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                            {_product.unit.unit_name}
                                        </Text> */}
                                        <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                            x{_product.qty} {_product.unit.unit_name}
                                        </Text>

                                        <NumberFormat
                                            value={_product.amount}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={''}
                                            renderText={value =>
                                                <Text style={{ color: 'red' }}
                                                    numberOfLines={1}
                                                >{"price: " + "$ " + value}
                                                </Text>} />
                                    </Col>
                                </View>
                            )
                        })}
                        <View style={{ margin: 10 }}>
                        </View>
                    </ScrollView>

                    <View style={style.checkOutContainer}>
                        <Col>
                            <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>${carts.items.order_info.total_amount}</Text>
                        </Col>

                        <TouchableOpacity onPress={() => {
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
                            );
                        }}
                            style={style.styleCHACKOUT} >
                            <Text style={{ color: '#fff' }}>CHEACKOUT</Text>
                            <AntDesign name='playcircleo' size={20}
                                style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                        </TouchableOpacity>
                    </View>
                </>}
        </SafeAreaView>
    );
}

export default CheakoutScreen;
const styles = StyleSheet.create({})


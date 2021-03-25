import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row, Toast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator, } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../actions/Cart';
import MainHeader from '../../custom_items/MainHeader';
import { makeid } from '../../functions/PTFunction';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles/index';

const CheakoutScreen = (props: any) => {
    const { data } = props.route.params;
    const navigate = useNavigation();
    const carts = useSelector((state: { carts: any }) => state.carts);
    const style = useSelector((state: { style: any }) => state.style)

    const dispatch = useDispatch()

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [carts.length])


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
            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                :
                <>
                    {carts.length !== 0 &&
                        <>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>

                                    <Row style={style.shippingAddress}>
                                        <Col>
                                            <Text>Name : Tanglim</Text>
                                            <Text style={{ opacity: 0.5, marginTop: 5 }}>
                                                N28 St 149, Phnom Penh, Cambodia
                                            </Text>
                                        </Col>

                                        <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                                            <FastImage style={style.shippingAddressIcon}
                                                source={require('../../images/icon/img_location.png')}
                                            />
                                        </TouchableOpacity>

                                    </Row>

                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Payment Method</Text>

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
                                    </Row>

                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Items</Text>
                                </View>

                                {carts.items.order_info.products.map((_product: any) => {
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
                                <View style={{ margin: 10 }}>
                                </View>
                            </ScrollView>

                            <View style={style.checkOutContainer}>
                                <Col>
                                    <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                                    <NumberFormat
                                        value={carts.items.order_info.total_amount}
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
                </>
            }


        </SafeAreaView>
    );
}

export default CheakoutScreen;
const styles = StyleSheet.create({

})


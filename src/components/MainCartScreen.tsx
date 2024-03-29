import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Alert, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import style, { PRICE_COLOR } from '../styles/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../custom_items/MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { MAIN_COLOR } from '../styles/index';
import { updateCart, deleteCart, loadCart } from '../actions/Cart';
import NumberFormat from 'react-number-format';
import { makeid } from '../functions/PTFunction';

const MainCartScreen = (props: any) => {

    const cart = useSelector((state: { cart: any }) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    React.useEffect(() => {
        getCart();
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [cart.length])

    const getCart = async () => {
        setTimeout(() => {

        }, 200);
    }

    const updateQty = (item: any, is_increase: any) => {
        let _cart: any = [];
        _cart.push(cart);
        _cart = _cart[0]

        const check = _cart.items.order_info.products.filter((r: any) => r.product_id == item.product_id && r.unit.unit_id == item.unit.unit_id);
        if (check.length > 0) {
            let product = check[0];
            let amount = 0;
            let discount = item.discount;
            if (discount.discount_percent > 0) {
                amount = product.unit.price - ((product.unit.price * discount.discount_percent) / 100)
            }
            else {
                if (discount.discount_value > 0)
                    amount = product.unit.price - discount.discount_value;
                else
                    amount = product.unit.price;
            }
            if (is_increase)
                check[0].qty += 1;
            else
                check[0].qty -= 1;
            check[0].amount = amount * product.qty
            let total_amount = 0;
            _cart.items.order_info.products.map((product: any) => {
                total_amount += product.amount;
            })
            _cart.items.order_info.total_amount = total_amount
            dispatch(updateCart(_cart.id, _cart.items))
        }
    }

    const handleIncrement = (item: any) => {
        updateQty(item, true)
    };
    const handleDecrement = (item: any) => {
        if (item.qty === 1) {
            return;
        } else {
            updateQty(item, false)
        }
    };

    const onRemoveItem = (item: any) => {
        let _cart: any = [];
        _cart.push(cart);
        _cart = _cart[0]
        _cart.items.order_info.products = _cart.items.order_info.products.filter((r: any) => (r.product_id + r.unit.unit_id) != (item.product_id + item.unit.unit_id))
        let total_amount = 0;
        _cart.items.order_info.products.map((product: any) => {
            total_amount += product.amount;
        })
        _cart.items.order_info.total_amount = total_amount
        dispatch(updateCart(_cart.id, _cart.items))
    }

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _deleteCart = () => {
        dispatch(deleteCart(cart.id))
        dispatch(loadCart(false))
    }

    const rightIcon = () => cart.length == 0 ? null : <TouchableOpacity style={style.leftRightHeader}
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
                        onPress: () => _deleteCart(),
                    }
                ],
                { cancelable: false }
            );
        }}>
        <AntDesign name="delete" size={28} color='#fff' />
    </TouchableOpacity>


    const _renderItem = ({ item, index }: any) => {
        const _cart = item;
        return (

            <View key={index} style={[styles.cartContainer, {
                marginBottom: index == cart.items.order_info.products.length - 1 ? 10 : 0,
            }]}>
                <FastImage
                    source={{ uri: _cart.unit.photo_url }}
                    style={{
                        height: 120,
                        width: 130,
                        borderRadius: 10,
                        margin: 5,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <Col style={{
                    padding: 5,
                    justifyContent: 'space-between',

                }}>
                    <Row>
                        <Col>
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#000',
                                fontSize: 15
                            }} numberOfLines={1}>
                                {_cart.product_name}
                            </Text>
                            <Text style={{ color: '#aaa', fontSize: 13 }} numberOfLines={2}>
                                Code: {_cart.product_code}
                            </Text>

                            <Text style={{ color: '#aaa', fontSize: 13 }} numberOfLines={2}>
                                x{item.qty} {_cart.unit.unit_name}
                            </Text>
                        </Col>

                        <TouchableOpacity style={styles.deleteCartContainer}
                            onPress={() => {
                                Alert.alert(
                                    "Delete Product",
                                    "Are you sure to delete this Product?",
                                    [
                                        {
                                            text: "No",
                                            onPress: () => console.log("No Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "Yes",
                                            onPress: () => onRemoveItem(item),
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                        >
                            <MaterialIcons name="delete-forever" size={25} color={'#FF4500'} />
                        </TouchableOpacity>
                    </Row>

                    <View style={styles.cartActionContainer}>

                        <NumberFormat
                            value={_cart.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{
                                    fontSize: 15,
                                    color: PRICE_COLOR,
                                }}
                                    numberOfLines={1}
                                >{"$ " + value}
                                </Text>} />

                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleDecrement(_cart)}
                                style={[styles.cartMPBotton, {
                                    marginHorizontal: 10
                                }]}>
                                <Fontisto name="minus-a" size={18} style={{ color: "#aaa" }} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 16 }}>
                                {item.qty}
                            </Text>

                            <TouchableOpacity onPress={() => handleIncrement(_cart)}
                                style={[styles.cartMPBotton, {
                                    marginLeft: 10
                                }]}>
                                <Fontisto name="plus-a" size={18} style={{ color: "#aaa" }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Col>
            </View>

        )
    }

    const noItem = () => {
        return (
            <View style={style.cartImageContainer}>
                <Image style={{
                    height: 200,
                    width: 200,
                }}
                    source={require('../images/empty-cart-rappi.png')}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{ opacity: 0.5 }}>Cart Empty</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {props.route.params !== undefined ?
                <MainHeader
                    title={'Cart'}
                    leftIcon={leftIcon()}
                    rightIcon={cart.length == 0 ? null :
                        rightIcon()
                    }
                /> :
                <MainHeader
                    title={'Cart'}
                    rightIcon={cart.length == 0 ? null :
                        rightIcon()
                    }
                />}

            <>
                {isInitialLoad ?
                    <ActivityIndicator style={{
                        marginTop: 20
                    }} size={35} color={MAIN_COLOR} />
                    : (
                        <>
                            {cart.length !== 0 ?
                                cart.items.order_info.products.length == 0 ?
                                    noItem()
                                    : (
                                        <FlatList
                                            style={{
                                                marginHorizontal: 10
                                            }}
                                            listKey={makeid()}
                                            data={cart.items.order_info.products}
                                            renderItem={_renderItem}
                                            keyExtractor={(item, index) => index.toString()}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    ) : noItem()}

                            {cart.length !== 0 ?
                                cart.items.order_info.products.length == 0 ?
                                    null
                                    : (<View style={style.checkOutContainer}>
                                        <Col>
                                            <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                                            <NumberFormat
                                                value={cart.length === 0 ? 0 : cart.items.order_info.total_amount}
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

                                        <TouchableOpacity onPress={() => navigate.navigate('CheckOut',
                                            {
                                                current_address: ''
                                            }
                                        )}
                                            style={style.styleCHACKOUT}>
                                            <Text style={{ color: '#fff' }}>CHECKOUT</Text>
                                            <AntDesign name='playcircleo' size={20}
                                                style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                                        </TouchableOpacity>
                                    </View>
                                    ) : null
                            }
                        </>
                    )}
            </>
        </SafeAreaView >
    )
}

export default MainCartScreen

const styles = StyleSheet.create({
    cartActionContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    deleteCartContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: '#FF0000'
    },
    cartContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    },
    cartMPBotton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 0.2,
        // backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

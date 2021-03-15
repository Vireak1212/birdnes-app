import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import MainHeader from '../../custom_items/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'
import { Col, Row } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { makeid } from '../../functions/PTFunction';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../../actions/Cart';

const screen = Dimensions.get('window')

const ProductDetail = (props: any) => {
    const { item } = props.route.params;
    const carts = useSelector((state: { carts: any }) => state.carts);
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const product_neme = item.items.product_info.product_name;



    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(1);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [unit, setUnit] = useState<any>([])
    let controller;

    React.useEffect(() => {
        let unit = item.items.product_info.units.sort(function (a: any, b: any) {
            return a.multiplier - b.multiplier
        });
        if (unit.length > 0) {
            setUnit(unit[0])
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, [])

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };
    const handleDecrement = () => {
        if (count === 1) {
            setCount((prevCount) => prevCount - 0)
        } else {
            setCount(prevCount => prevCount - 1);
        }
    };

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const rightIcon = () => <TouchableOpacity
        onPress={() => navigate.navigate('CartDetail',
            { isBack: true }
        )}>
        <View style={styles.itemCountContainer}>
            <Text style={styles.itemCountText}>{carts.length == 0 ? '' : carts.items.order_info.products.length}</Text>
        </View>
        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
    </TouchableOpacity>;


    const onAddToCart = () => {
        if (unit.length === 0) {
            console.log('Please select unit');
            return;
        }
        if (carts.length !== 0) {
            let _carts: any = [];
            _carts.push(carts);
            _carts = _carts[0]

            const check = _carts.items.order_info.products.filter((r: any) => r.product_id == item.id && r.unit.unit_id == unit.unit_id);
            if (check.length > 0) {
                let product = check[0];
                let amount = 0;
                let discount = item.items.discount_info;
                if (discount.discount_percent > 0) {
                    amount = product.unit.price - ((product.unit.price * discount.discount_percent) / 100)
                }
                else {
                    if (discount.discount_value > 0)
                        amount = product.unit.price - discount.discount_value;
                    else
                        amount = product.unit.price;
                }

                check[0].qty += 1;
                check[0].amount = amount * product.qty
            }
            else {
                let amount = 0;
                let discount = item.items.discount_info;
                if (discount.discount_percent > 0) {
                    amount = unit.price - ((unit.price * discount.discount_percent) / 100)
                }
                else {
                    if (discount.discount_value > 0)
                        amount = unit.price - discount.discount_value;
                    else
                        amount = unit.price;
                }
                _carts.items.order_info.products.push({
                    allow_discount: item.items.allow_discount,
                    product_id: item.id,
                    product_name: item.items.product_info.product_name,
                    product_code: item.items.product_info.product_code,
                    unit,
                    discount: item.items.discount_info,
                    qty: 1,
                    amount
                })
            }
            let total_amount = 0;
            _carts.items.order_info.products.map((product: any) => {
                total_amount += product.amount;
            })
            _carts.items.order_info.total_amount = total_amount
            dispatch(updateCart(_carts.id, _carts.items))
        }
        else {
            let amount = 0;
            let discount = item.items.discount_info;
            if (discount.discount_percent > 0) {
                amount = unit.price - ((unit.price * discount.discount_percent) / 100)
            }
            else {
                if (discount.discount_value > 0)
                    amount = unit.price - discount.discount_value;
                else
                    amount = unit.price;
            }
            const _cart = {
                client_info: {
                    address: "",
                    client_id: "",
                    client_name: "",
                    phone_number: "",
                    photo_url: ""
                },
                document_number: "",
                is_confirm: false,
                order_info: {
                    products: [{
                        allow_discount: item.items.allow_discount,
                        product_id: item.id,
                        product_name: item.items.product_info.product_name,
                        product_code: item.items.product_info.product_code,
                        unit,
                        discount: item.items.discount_info,
                        qty: 1,
                        amount
                    }],
                    total_amount: amount
                },
                shop_info: {
                    phone_number: "",
                    photo_url: "",
                    shop_id: "",
                    shop_location: "",
                    shop_name: ""
                },
                shop_uid: "",
                uid: ""
            }
            dispatch(addToCart(_cart));
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={product_neme}
                leftIcon={leftIcon()}
                rightIcon={rightIcon()}
            />

            <FlatList
                removeClippedSubviews={Platform.OS == 'ios' ? false : true}
                showsVerticalScrollIndicator={false}
                data={[1]}
                listKey={makeid()}
                ListEmptyComponent={null}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                renderItem={({ }) => (
                    <View >
                        <View style={styles.detailImageContainer}>
                            <FastImage style={{
                                height: 250,
                                width: '100%',
                                borderRadius: 10,
                            }}
                                source={{ uri: item.items.product_info.photos[0].photo_url }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <Row style={styles.productDetailContainer}>
                            <Col>
                                <Text style={{
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>
                                    {item.items.product_info.product_name}
                                </Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {item.items.product_info.product_code}
                                </Text>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={16}
                                    //   onFinishRating={ratingCompleted}
                                    />
                                </View>

                            </Col>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ paddingBottom: 5 }}>
                                    <Feather name='star' size={30} />
                                </TouchableOpacity>
                                <Text style={styles.productDetailPrice}>
                                    {count * item.items.product_info.units[0].price + '$'}
                                </Text>
                            </View>
                        </Row>

                        <View style={styles.productSubDetail}>
                            <View style={{ paddingVertical: 10 }}>
                                <Text>Grade:</Text>
                                <Text style={{ fontSize: 13, paddingVertical: 5, paddingLeft: 10 }}>NONE</Text>
                                <Text >Quanity:</Text>

                                <Row style={{ alignItems: 'center', paddingTop: 10 }}>
                                    <TouchableOpacity onPress={handleDecrement}
                                        style={styles.MPBotton}>
                                        <AntDesign name="minus" size={23} style={{ color: ICON_COLOR }} />
                                    </TouchableOpacity>

                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {count * item.items.product_info.units[0].multiplier}
                                    </Text>

                                    <TouchableOpacity onPress={handleIncrement}
                                        style={styles.MPBotton}>
                                        <AntDesign name="plus" size={18} style={{ color: ICON_COLOR }} />
                                    </TouchableOpacity>
                                </Row>
                            </View>
                        </View>

                        <Row style={styles.productDetailQtyContainer}>
                            <View style={{ paddingVertical: 10 }}>
                                <Text>Free Shipping</Text>
                                {item.items.freeShipping == null ? (
                                    <Text style={{ color: '#aaa' }}>
                                        free shipping in phnom penh
                                    </Text>
                                ) : (
                                    null
                                )}
                            </View>
                            <TouchableOpacity>
                                <MaterialIcons name='navigate-next' size={23} color={ICON_COLOR} />
                            </TouchableOpacity>
                        </Row>

                        <View style={styles.productSubDetail}>
                            <Text style={{ paddingVertical: 10 }}>Product Description</Text>
                            <Text style={{ paddingBottom: 10, fontSize: 13, color: '#aaa', lineHeight: 17 }}>
                                {item.items.product_info.product_description}
                            </Text>
                        </View>
                    </View>
                )}
            />

            <View style={{
                position: 'absolute',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                bottom: 12,
            }}>
                <TouchableWithoutFeedback
                    onPress={() => onAddToCart()}
                >
                    <View style={styles.addToCartBotton}>
                        <Text style={{ paddingRight: 10, color: '#fff', fontWeight: 'bold' }}>Add to Cart</Text>
                        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    itemCountContainer: {
        position: 'absolute',
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: 'rgba(255, 99, 71, 0.8)',
        right: 20,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
    },
    itemCountText: {
        color: 'white',
        fontWeight: 'bold'
    },
    addToCartBotton: {
        height: 50,
        // marginRight: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(34,72,137,0.9)',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 2,
    },
    productDetailQtyContainer: {
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productSubDetail: {
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    detailImageContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    MPBotton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginHorizontal: 15,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    },
    productDetailContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    productDetailName: {
        fontSize: 12,
        color: '#FF6666',
        fontWeight: 'bold'
    },
    productDetailPrice: {
        fontSize: 17,
        paddingHorizontal: 10,
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },

})

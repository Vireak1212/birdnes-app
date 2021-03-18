import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import MainHeader from '../../custom_items/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'
import { Col, Row } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { makeid } from '../../functions/PTFunction';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../../actions/Cart';
import { MAIN_COLOR } from '../../styles/index';
import Swiper from 'react-native-swiper'


const screen = Dimensions.get('screen')

const ProductDetail = (props: any) => {
    const { item } = props.route.params;
    const style = useSelector((state: { style: any }) => state.style);
    const carts = useSelector((state: { carts: any }) => state.carts);
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const product_neme = item.items.product_info.product_name;

    const [isFavorite, setIsFavorite] = useState(false)
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [unit, setUnit] = useState<any>([])
    const [galleries, setGalleries] = useState([])
    let controller;

    React.useEffect(() => {
        let unit = item.items.product_info.units.sort(function (a: any, b: any) {
            return a.multiplier - b.multiplier
        });
        if (unit.length > 0) {
            setUnit(unit[0])
        }

        loadGalleries();
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, [])


    const loadGalleries = () => {
        let _gallery: any = []
        item.items.product_info.units.map((_unit: any) => {
            _gallery.push({
                photo_url: _unit.photo_url
            })
        })

        item.items.product_info.photos.map((_photo: any) => {
            _gallery.push({
                photo_url: _photo.photo_url
            })
        })
        setGalleries(_gallery)
    }


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

                check[0].qty += qty;
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
                    photo_url: item.items.product_info.units.photo_url,
                    photo_url_file_name: item.items.product_info.units.photo_url_file_name,
                    product_id: item.id,
                    product_name: item.items.product_info.product_name,
                    product_code: item.items.product_info.product_code,
                    unit,
                    discount: item.items.discount_info,
                    qty,
                    amount: qty * amount
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
                    products: [
                        {
                            allow_discount: item.items.allow_discount,
                            photo_url: item.items.product_info.units.photo_url,
                            photo_url_file_name: item.items.product_info.units.photo_url_file_name,
                            product_id: item.id,
                            product_name: item.items.product_info.product_name,
                            product_code: item.items.product_info.product_code,
                            unit,
                            discount: item.items.discount_info,
                            qty,
                            amount
                        }
                    ],
                    amount: qty * amount
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

    const handleIncrement = () => {
        setQty(qty => qty + 1)
    };
    const handleDecrement = () => {
        if (qty === 1) {
            return;
        } else {
            setQty(qty => qty - 1)
        }
    };

    const onUnitPress = (item: any) => {
        setUnit(item)
    }

    const addToFavorite = () => {
        setIsFavorite(value => !value)
    }

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    console.log(carts.length)
    const rightIcon = () => <TouchableOpacity
        onPress={() => navigate.navigate('CartDetail',
            { isBack: true }
        )}>
        {carts.length == 0 ? null :
            <View style={styles.itemCountContainer}>
                <Text style={styles.itemCountText}>{carts.length === 0 ? '' : carts.items.order_info.products.length}</Text>
            </View>
        }
        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
    </TouchableOpacity>;

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
                // disableVirtualization={true}
                data={[1]}
                listKey={makeid()}
                ListEmptyComponent={null}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                renderItem={({ index }: any) => {
                    return (
                        <>
                            {/* <View style={styles.detailImageContainer}>
                                {galleries.map((gallery: any, index: any) => (
                                    <FastImage key={index} style={{
                                        height: 250,
                                        width: '100%',
                                        borderRadius: 10,
                                    }}
                                        source={{ uri: gallery.photo_url }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                ))}


                            </View> */}

                            <View style={styles.carouselArea}>
                                <Swiper style={styles.wrapper}
                                    horizontal
                                    autoplay={false}
                                    showsButtons={false}
                                    dotStyle={{ height: 7, width: 20 }}
                                    activeDotStyle={{ height: 7, width: 20, }}
                                    activeDotColor={MAIN_COLOR}
                                    dotColor={'#ddd'}
                                    removeClippedSubviews={false}>
                                    {
                                        galleries.map((gallery: any, index: any) => {
                                            return (
                                                <View key={index} style={styles.slide1}>
                                                    <TouchableWithoutFeedback>
                                                        <FastImage style={styles.slideImage}
                                                            source={{ uri: gallery.photo_url }}
                                                            resizeMode={FastImage.resizeMode.cover}
                                                        />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            )

                                        })
                                    }
                                </Swiper>

                            </View>

                            <View style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                backgroundColor: '#fff'
                            }}>
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
                                        <TouchableOpacity onPress={() => {
                                            addToFavorite()
                                        }}
                                            style={{ paddingBottom: 5 }}>
                                            {/* <Feather name='star' size={30} /> */}
                                            <FontAwesome name={!isFavorite ? "star-o" : "star"} size={30}
                                                color={!isFavorite ? '#aaa' : '#FFD700'} />
                                        </TouchableOpacity>
                                        <Text style={styles.productDetailPrice}>
                                            {unit.price + '$'}
                                        </Text>
                                    </View>

                                </Row>
                            </View>

                            <View style={styles.productSubDetail}>
                                <View style={{
                                    paddingVertical: 10,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                }}>
                                    <View>
                                        <Text style={{ paddingTop: 7, color: '#aaa' }}>Unit :</Text>
                                        <Text style={{ paddingTop: 32, color: '#aaa' }}>Quanity :</Text>
                                    </View>

                                    <Col>
                                        <Row style={{ marginBottom: 20, height: 35, alignItems: 'center' }}>
                                            {item.items.product_info.units.map((_unit: any) => {
                                                return (
                                                    <TouchableOpacity key={_unit.unit_id} onPress={() => onUnitPress(_unit)}
                                                        style={[styles.unitButton, {
                                                            borderColor: _unit.unit_id === unit.unit_id ? '#224889' : '#000',
                                                        }]}>
                                                        <Text style={{
                                                            paddingHorizontal: 15,
                                                            color: _unit.unit_id === unit.unit_id ? '#224889' : '#000',
                                                        }}>
                                                            {_unit.unit_name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}

                                        </Row>

                                        <Row style={{ alignItems: 'center', height: 35 }}>

                                            <TouchableOpacity onPress={() => handleDecrement()}
                                                style={styles.MPBotton}>
                                                <Fontisto name="minus-a" size={18} style={{ color: "#aaa" }} />
                                            </TouchableOpacity>

                                            <Text style={{ fontSize: 16, }}>
                                                {qty}
                                            </Text>

                                            <TouchableOpacity onPress={() => handleIncrement()}
                                                style={styles.MPBotton}>
                                                <Fontisto name="plus-a" size={18} style={{ color: "#aaa" }} />
                                            </TouchableOpacity>

                                        </Row>
                                    </Col>


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

                        </>
                    )
                }}
            />

            <View style={styles.addToCartContaier}>
                <TouchableOpacity onPress={() => onAddToCart()}
                    style={styles.addToCartBotton}>
                    <Text style={{ paddingRight: 10, color: '#fff', fontWeight: 'bold' }}>Add to Cart</Text>
                    <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    carouselArea: {
        height: screen.width / 1.6,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    slideImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },


    addToCartContaier: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 12,
    },
    unitButton: {
        marginLeft: 15,
        borderWidth: 0.2,
        borderRadius: 5,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCountContainer: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 99, 71, 0.8)',
        right: 20,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // zIndex: 2000
    },
    itemCountText: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 2
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
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productSubDetail: {
        marginTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    detailImageContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    MPBotton: {
        width: 30,
        height: 30,
        marginHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2
    },
    productDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

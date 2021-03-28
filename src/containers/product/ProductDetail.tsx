import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Platform, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import MainHeader from '../../custom_items/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ICON_COLOR, PRICE_COLOR } from '../../styles/index'
import { Col, Row } from 'native-base';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { makeid } from '../../functions/PTFunction';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../../actions/Cart';
import { MAIN_COLOR } from '../../styles/index';
import Swiper from 'react-native-swiper'
import ImageView from './ImageView';
import NumberFormat from 'react-number-format';
import StarRating from 'react-native-star-rating';


const screen = Dimensions.get('screen')

const ProductDetail = (props: any) => {
    const { item } = props.route.params;
    const style = useSelector((state: { style: any }) => state.style);
    const cart = useSelector((state: { cart: any }) => state.cart);
    const client = useSelector((state: { client: any }) => state.client);
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const product_neme = item.items.product_info.product_name;

    const [isLoadCompleted, setIsLoadCompleted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [unit, setUnit] = useState<any>([])
    const [galleries, setGalleries] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isViewImage, setIsViewImage] = useState(false)
    let controller;

    useEffect(() => {
        if (item.items.product_info.units) {
            setTimeout(() => {
                setIsLoadCompleted(true)
            }, 200);
        }
    }, [item.items.product_info.units.length])

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
                photo_url: _unit.photo_url,
                id: _unit.id,
                photo_url_file_name: _unit.photo_url_file_name,
                is_selected: false,
            })
        })

        item.items.product_info.photos.map((_photo: any) => {
            _gallery.push({
                photo_url: _photo.photo_url,
                id: _photo.id,
                photo_url_file_name: _photo.photo_url_file_name,
                is_selected: false,

            })
        })
        setGalleries(_gallery)
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }


    const onAddToCart = () => {
        if (unit.length === 0) {
            console.log('Please select unit');
            return;
        }
        if (cart.length !== 0) {
            let _cart: any = [];
            _cart.push(cart);
            _cart = _cart[0]

            const check = _cart.items.order_info.products.filter((r: any) => r.product_id == item.id && r.unit.unit_id == unit.unit_id);
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
                _cart.items.order_info.products.push({
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
            _cart.items.order_info.products.map((product: any) => {
                total_amount += product.amount;
            })
            _cart.items.order_info.total_amount = total_amount
            dispatch(updateCart(_cart.id, _cart.items))
        }
        else {
            let amount = 0;
            let discount = item.items.discount_info;
            if (discount.discount_percent > 0) {
                amount = (unit.price * qty) - (((unit.price * qty) * discount.discount_percent) / 100)
            }
            else {
                if (discount.discount_value > 0)
                    amount = (unit.price * qty) - discount.discount_value;
                else
                    amount = (unit.price * qty);
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
                uid: client.items.uid,
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

    const rightIcon = () => <TouchableOpacity
        onPress={() => navigate.navigate('CartDetail',
            { isBack: true }
        )}>
        {cart.length == 0 ? null :
            <View style={style.itemCountContainer}>
                <Text style={style.itemCountText}>{cart.length === 0 ? '' : cart.items.order_info.products.length}</Text>
            </View>
        }
        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
    </TouchableOpacity>;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isViewImage ? '#000' : '#f6f6f6' }}>
            {isViewImage ? (
                <>
                    <ImageView
                        leftViewImageIcon={() => {
                            setIsViewImage(false)
                        }}
                        galleries={galleries}
                        index={currentIndex}
                    />
                </>
            ) : <>
                <MainHeader
                    title={product_neme}
                    leftIcon={leftIcon()}
                    rightIcon={rightIcon()}
                />
                {!isLoadCompleted ?
                    <ActivityIndicator style={{
                        marginTop: 20
                    }} size={35} color={MAIN_COLOR} />
                    :
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
                                    <View style={{ height: screen.width / 1.6, }}>
                                        <Swiper
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
                                                        <View key={index} style={style.productDetailSlide}>
                                                            <TouchableWithoutFeedback onPress={() => {
                                                                setCurrentIndex(index)
                                                                setIsViewImage(true)
                                                            }}>
                                                                <FastImage style={style.slideImage}
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
                                        <Row style={style.productDetailContainer}>
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
                                                    <StarRating
                                                        disabled={false}
                                                        maxStars={5}
                                                        rating={3}
                                                        fullStarColor="gold"
                                                        starSize={20}
                                                        containerStyle={{ width: 80 }}
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

                                                <NumberFormat
                                                    value={unit.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    prefix={''}
                                                    renderText={value =>
                                                        <Text style={style.productDetailPrice}
                                                            numberOfLines={1}
                                                        >{"$ " + value}
                                                        </Text>} />
                                            </View>

                                        </Row>
                                    </View>

                                    <View style={style.productSubDetail}>
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
                                                                style={[style.unitButton, {
                                                                    borderColor: _unit.unit_id === unit.unit_id ? '#aaa' : '#aaa',
                                                                    backgroundColor: _unit.unit_id === unit.unit_id ? '#eee' : '#fff'
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
                                                        style={style.MPBotton}>
                                                        <Fontisto name="minus-a" size={18} style={{ color: "#aaa" }} />
                                                    </TouchableOpacity>

                                                    <Text style={{ fontSize: 16, }}>
                                                        {qty}
                                                    </Text>

                                                    <TouchableOpacity onPress={() => handleIncrement()}
                                                        style={style.MPBotton}>
                                                        <Fontisto name="plus-a" size={18} style={{ color: "#aaa" }} />
                                                    </TouchableOpacity>

                                                </Row>
                                            </Col>


                                        </View>
                                    </View>

                                    <Row style={style.productDetailQtyContainer}>
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

                                    <View style={style.productSubDetail}>
                                        <Text style={{ paddingVertical: 10 }}>Product Description</Text>
                                        <Text style={style.productDetailDescriptions}>
                                            {item.items.product_info.product_description}
                                        </Text>
                                    </View>

                                </>
                            )
                        }}
                    />
                }
                <View style={style.addToCartContaier}>

                    <TouchableOpacity onPress={() => {
                        {
                            client.length !== 0 ?
                                onAddToCart() :
                                navigate.navigate('Login')
                        }
                    }}
                        style={style.addToCartBotton}>
                        <Text style={{ paddingRight: 10, color: '#fff', fontWeight: 'bold' }}>Add to Cart</Text>
                        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
                    </TouchableOpacity>

                </View>
            </>
            }

        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import MainHeader from '../../custom_items/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'
import { Col, Item, Row } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';


const ProductDetail = (props: any) => {
    const { item } = props.route.params;
    const navigate = useNavigation();
    const product_neme = item.items.name;


    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(1);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    let controller;

    React.useEffect(() => {
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
        onPress={() => navigate.navigate('Cart',
            { header: 'show' }
        )}>
        <View style={styles.itemCountContainer}>
            <Text style={styles.itemCountText}>0</Text>
        </View>
        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
    </TouchableOpacity>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={product_neme}
                leftIcon={leftIcon()}
                rightIcon={rightIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                            {item.items.code}
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
                            {count * item.items.price + '$'}
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

                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{count}</Text>

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
                        {item.items.description}
                    </Text>
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity
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
        marginBottom: 5,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#224889',
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
        backgroundColor: '#fff'
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

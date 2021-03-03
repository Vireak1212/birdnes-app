import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import MainHeader from '../../custom_items/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR } from '../../styles/index'
import { Col, Row } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { PRICE_COLOR } from '../../styles/index';

const ProductDetail = (props: any) => {
    const { item } = props.route.params;
    const navigate = useNavigation();

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const rightIcon = () => <TouchableOpacity
        onPress={() => navigate.navigate('Cart',
            { header: 'show' }
        )}>
        <Entypo name="shopping-cart" size={22} style={style.headerIconColor} />
    </TouchableOpacity>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Product Name'}
                leftIcon={leftIcon()}
                rightIcon={rightIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailImageContainer}>
                    <Image style={{
                        height: 250,
                        width: '100%',
                        borderRadius: 10,
                    }}
                        source={{ uri: item.image }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                </View>
                <Row style={styles.productDetailContainer}>
                    <Col>
                        <Text style={{
                            fontSize: 19,
                            fontWeight: 'bold'
                        }}>
                            Premium birdnest drink
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            MN123
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
                            $10
                        </Text>
                    </View>
                </Row>

                <View style={styles.productSubDetail}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text>Grade:</Text>
                        <Text style={{ fontSize: 13, paddingVertical: 5, paddingLeft: 10 }}>NONE</Text>
                        <Text>Quanity:</Text>
                        <Row style={{ paddingTop: 10 }}>
                            <TouchableOpacity style={styles.MPBotton}>
                                <AntDesign name="minus" size={23} style={{ color: ICON_COLOR }} />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>1</Text>

                            <TouchableOpacity style={styles.MPBotton}>
                                <AntDesign name="plus" size={18} style={{ color: ICON_COLOR }} />
                            </TouchableOpacity>
                        </Row>
                    </View>
                </View>

                <Row style={styles.productDetailQtyContainer}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text>Free Shipping</Text>
                        <Text style={{ color: '#aaa' }}>Free Shipping in phnom penh</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name='navigate-next' size={23} color={ICON_COLOR} />
                    </TouchableOpacity>
                </Row>

                <View style={styles.productSubDetail}>
                    <Text style={{ paddingVertical: 10 }}>Product Description</Text>
                    <Text style={{ paddingBottom: 10, fontSize: 13, color: '#aaa' }}>
                        Followed by that, for v3, I recreated the Airbnb ratings component and added it to this repo, in case others find this useful. It works out of the box and is quite functional.
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
        height: 25,
        width: 25,
        borderRadius: 12.5,
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

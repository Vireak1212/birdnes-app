import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList, Platform, StyleSheet, SafeAreaView, TouchableOpacity, Image, View, Dimensions, ActivityIndicator } from 'react-native';
import HomeMenu from '../containers/home/HomeMenu';
import ProductSlide from '../containers/home/ProductSlide'
import NewProduct from '../containers/product/NewProduct';
import TopProduct from '../containers/product/TopProduct';
import FeatureStores from '../containers/store/FeatureStores';
import HomeHeader from '../custom_items/HomeHeader'
import { makeid } from '../functions/PTFunction'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { createProduct } from '../actions/Product';
import AllProduct from '../containers/product/AllProduct';
import FastImage from 'react-native-fast-image';
import { Col, Text } from 'native-base';
import { MAIN_COLOR, PRICE_COLOR } from '../styles';
import { FlatGrid } from 'react-native-super-grid';


const screen = Dimensions.get('screen')

const HomeScreen = () => {
    const products = useSelector((state: { products: any }) => state.products);
    const slide_shows = useSelector((state: { slide_shows: any }) => state.slide_shows);
    const style = useSelector((state: { style: any }) => state.style)
    const [isLoadCompleted, setIsLoadCompleted] = useState(false)

    useEffect(() => {
        if (slide_shows.length) {
            setTimeout(() => {
                setIsLoadCompleted(true)
            }, 200);
        }
    }, [slide_shows.length])
    const navigate = useNavigation();
    const rightIcon = () => <TouchableOpacity onPress={() => navigate.navigate('homeSearch')}
        style={{
            alignSelf: 'flex-end',
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}>
        <AntDesign name="search1" size={23} style={style.headerIconColor} />
    </TouchableOpacity>

    const leftIcon = () => <TouchableOpacity style={{
        alignSelf: 'flex-start',
    }}>
        <Image style={{ height: '100%', width: 200, marginLeft: -5 }}
            source={require('../images/icon/icon.png')}
            resizeMode='cover'
            resizeMethod='resize'
        />
    </TouchableOpacity>

    const dispatch = useDispatch()
    const _addProudct = () => {
        const product = {
            category_info: {
                id: ''
            },

            created_date: new Date(),

            discount_info: {
                discount_percent: 0,
                discount_value: 0,
            },

            point_info: {
                point_value: 1
            },

            product_info: {
                photos: [
                    {
                        photo_url: '',
                        photo_url_file_name: ''
                    }
                ],
                product_code: '',
                product_description: '',
                product_name: '',
                product_tags: [''],
                units: [
                    {
                        multiplier: 1,
                        price: 0.5,
                        unit_id: '123',
                        unit_name: 'can'
                    },
                    {
                        multiplier: 1,
                        price: 15,
                        unit_id: '123',
                        unit_name: 'case'
                    }
                ]
            },

            product_option: '',
            rating_credit: '',
            rating_value: 0,

            ratings: {
                five_star: 0,
                four_star: 0,
                three_star: 0,
                two_star: 0,
                one_star: 0,
            },

            status: true,
            store_info: {
                store_id: '',
                store_name: '',
            },
            total_ratings: 0
        }
        dispatch(createProduct(product))
    }

    const _renderAllProduct = ({ item, index }: any) => {
        const _AllProduct = item.items;
        return (
            <TouchableOpacity key={index} style={styles.allProductContainer}
                onPress={() => navigate.navigate('ProductDetail',
                    { item }
                )}>
                <View style={{
                    margin: 5
                }}>
                    <FastImage style={{
                        height: 150,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _AllProduct.product_info.photos[0].photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                            {_AllProduct.product_info.product_name}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_AllProduct.product_info.product_description}
                        </Text>
                        <Text style={styles.allProductPrice}
                            numberOfLines={1}>
                            {'$' + _AllProduct.product_info.units[0].price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HomeHeader
                leftIcon={leftIcon()}
                rightIcon={rightIcon()}
            />
            {!isLoadCompleted ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                :
                <FlatList
                    removeClippedSubviews={Platform.OS == 'ios' ? true : false}
                    showsVerticalScrollIndicator={false}
                    // disableVirtualization={true}
                    data={[1]}
                    listKey={makeid()}
                    ListEmptyComponent={null}
                    keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                    renderItem={({ item, index }: any) => {
                        return (
                            <>
                                <ProductSlide />
                                <NewProduct />
                                <FeatureStores />
                                <TopProduct />

                                {/* <TouchableOpacity onPress={() => _addProudct()}
                        style={{
                            height: 50, width: 70, borderWidth: 1,
                            marginBottom: 20,
                            marginLeft: 20
                        }}>

                    </TouchableOpacity> */}

                                <View style={{
                                    paddingTop: 5,
                                    paddingHorizontal: 12,
                                    paddingBottom: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text>All Product</Text>
                                </View>
                                <FlatGrid
                                    scrollEnabled={true}
                                    showsVerticalScrollIndicator={false}
                                    listKey={makeid()}
                                    itemDimension={130}
                                    style={{
                                        height: 'auto',
                                        width: '100%',
                                        borderRadius: 10,
                                        marginBottom: -10,
                                        marginTop: -10,
                                    }}
                                    renderItem={_renderAllProduct}
                                    data={products}
                                // data={color.slice(0, (Math.floor((width / 80)) * 2))}
                                />
                            </>
                        )
                    }}
                />
            }

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    allProductPrice: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    allProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 8 / 17.5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    }
})



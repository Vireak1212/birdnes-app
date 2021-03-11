import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { FlatList, Platform, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
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

const HomeScreen = () => {
    const style = useSelector((state: { style: any }) => state.style)

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
                        price: 0.5,
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HomeHeader
                leftIcon={leftIcon()}
                rightIcon={rightIcon()}
            />
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
                            {/* <HomeMenu /> */}
                            <NewProduct />
                            <FeatureStores />
                            <TopProduct />


                            <TouchableOpacity onPress={() => _addProudct()}
                                style={{
                                    height: 50, width: 70, borderWidth: 1,
                                    marginBottom: 20,
                                    marginLeft: 20
                                }}>

                            </TouchableOpacity>
                        </>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default HomeScreen


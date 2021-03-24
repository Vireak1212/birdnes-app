import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Platform,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import ProductSlide from '../containers/home/ProductSlide'
import NewProduct from '../containers/product/NewProduct';
import TopProduct from '../containers/product/TopProduct';
import FeatureStores from '../containers/store/FeatureStores';
import HomeHeader from '../custom_items/HomeHeader'
import { createKeyWords, makeid } from '../functions/PTFunction'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../actions/Product';
import AllProduct from '../containers/product/AllProduct';

import { MAIN_COLOR, PRICE_COLOR } from '../styles';


const screen = Dimensions.get('screen')

const HomeScreen = () => {
    const products = useSelector((state: { products: any }) => state.products);
    const slide_shows = useSelector((state: { slide_shows: any }) => state.slide_shows);
    const style = useSelector((state: { style: any }) => state.style)

    const [isLoadCompleted, setIsLoadCompleted] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigation();

    useEffect(() => {
        if (slide_shows.length) {
            setTimeout(() => {
                setIsLoadCompleted(true)
            }, 200);
        }
    }, [slide_shows.length])

    const rightIcon = () => <TouchableOpacity onPress={() => {
        // firestore().collection('products')
        //     .get()
        //     .then((snapshot) => {
        //         snapshot.docs.forEach(async (doc) => {
        //             const client = await firestore().collection('products').doc(doc.id);
        //             let product_info = doc.data().product_info
        //             product_info.product_tags = createKeyWords(product_info.product_name.toLocaleLowerCase())
        //             client.update(
        //                 {
        //                     product_info
        //                 }
        //             )
        //         })
        //     })
        navigate.navigate('SearchProduct')
    }}
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
                    removeClippedSubviews={Platform.OS == 'ios' ? false : true}
                    showsVerticalScrollIndicator={false}
                    // disableVirtualization={true}
                    data={[1]}
                    listKey={makeid()}
                    ListEmptyComponent={null}
                    initialNumToRender={4}
                    maxToRenderPerBatch={8}
                    windowSize={8}
                    keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                    renderItem={({ item, index }: any) => {
                        return (
                            <>
                                <ProductSlide />
                                <NewProduct />
                                <FeatureStores />
                                <TopProduct />
                                <AllProduct />

                                {/* <TouchableOpacity onPress={() => _addProudct()}
                                    style={{
                                        height: 50, width: 70, borderWidth: 1,
                                        marginBottom: 20,
                                        marginLeft: 20
                                    }}>

                                </TouchableOpacity> */}



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



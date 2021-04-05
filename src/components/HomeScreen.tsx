import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Platform,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import ProductSlide from '../containers/home/ProductSlide'
import NewProduct from '../containers/product/NewProduct';
import TopProduct from '../containers/product/TopProduct';
import HomeHeader from '../custom_items/HomeHeader'
import { makeid } from '../functions/PTFunction'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import AllProduct from '../containers/product/AllProduct';
import Stores from '../containers/store/Stores';
import { MAIN_COLOR, PRICE_COLOR } from '../styles';

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
                                <Stores />
                                <TopProduct />
                                <AllProduct />
                            </>
                        )
                    }}
                />
            }

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})



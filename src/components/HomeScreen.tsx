import { useNavigation } from '@react-navigation/native';
import React from 'react'
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
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

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
                        </>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default HomeScreen


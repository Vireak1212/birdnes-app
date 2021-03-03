import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import HomeMenu from '../containers/home/HomeMenu';
import ProductSlide from '../containers/home/ProductSlide'
import NewProduct from '../containers/product/NewProduct';
import TopProduct from '../containers/product/TopProduct';
import FeatureStores from '../containers/store/FeatureStores';
import HomeHeader from '../custom_items/HomeHeader'
import { makeid } from '../functions/PTFunction'
import style, { PRICE_COLOR } from '../styles/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
    const navigate = useNavigation();

    const rightIcon = () => <TouchableOpacity onPress={() => navigate.navigate('homeSearch')}
        style={{
            alignSelf: 'flex-end',
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}>
        <Ionicons name="search" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HomeHeader
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
                            <HomeMenu />
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

const styles = StyleSheet.create({})

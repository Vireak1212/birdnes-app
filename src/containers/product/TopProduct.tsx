import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid'
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction'
import { PRICE_COLOR } from '../../styles';
const screen = Dimensions.get('screen')

const TopProduct = () => {
    const top_products = useSelector((state: { top_products: any }) => state.top_products);

    const navigate = useNavigation();

    const _renderTopProduct = ({ item, index }: any) => {
        const _product = item.items;
        return (
            <TouchableOpacity key={index} style={[styles.TopProductContainer, {
                marginLeft: index === 0 ? 10 : 0,
                marginHorizontal: 10,
                marginBottom: 10,
            }]} onPress={() => navigate.navigate('ProductDetail', { item })}>

                <View style={{
                    margin: 5,
                }}>
                    <FastImage style={{
                        height: 100,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _product.product_info.photos[0].photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 13, paddingBottom: 2, color: '#aaa' }} numberOfLines={2}>
                            {_product.product_info.product_name}
                        </Text>
                        {/* <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_product.description}
                        </Text> */}
                        <Text style={styles.topProductPrice}
                            numberOfLines={1}>
                            {'$' + _product.product_info.units[0].price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>Top Products</Text>
                {top_products.length > 8 && <TouchableOpacity onPress={() => navigate.navigate('ProductItem', {
                    title: 'Top Products'
                })}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>}

            </View>
            <FlatList
                scrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
                listKey={makeid()}
                // itemDimension={95}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    paddingTop: -5,
                }}
                renderItem={_renderTopProduct}
                data={top_products.slice(0, 8)}

            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default TopProduct

const styles = StyleSheet.create({
    topProductPrice: {
        fontSize: 14,
        paddingVertical: 3,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    TopProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 3 / 10,
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

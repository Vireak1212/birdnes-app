import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction'
const screen = Dimensions.get('screen')

const TopProduct = () => {
    const top_products = useSelector((state: { top_products: any }) => state.top_products);
    const style = useSelector((state: { style: any }) => state.style);

    const navigate = useNavigation();

    const _renderTopProduct = ({ item, index }: any) => {
        const _product = item.items;
        return (
            <View key={index} style={[style.topProductContainer, {
                marginLeft: index === 0 ? 10 : 0,
                marginHorizontal: 10,
                marginBottom: 10,
            }]}>
                <TouchableWithoutFeedback onPress={() => navigate.navigate('ProductDetail', { item })}>
                    <View style={{ margin: 5, }}>
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

                            <NumberFormat
                                value={_product.product_info.units[0].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                prefix={''}
                                renderText={value =>
                                    <Text style={style.topProductPrice}
                                        numberOfLines={1}
                                    >{"$ " + value}
                                    </Text>} />
                        </Col>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.topProductTitle}>
                <Text>Top Products</Text>
                {top_products.length > 8 && <TouchableOpacity onPress={() => navigate.navigate('ProductItem', {
                    title: 'Top Products',
                    products: top_products,
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

const styles = StyleSheet.create({})

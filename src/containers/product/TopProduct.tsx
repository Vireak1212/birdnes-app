import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid'
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction'
import { PRICE_COLOR } from '../../styles';
const screen = Dimensions.get('screen')

const TopProduct = () => {

    const products = useSelector((state: { products: any }) => state.products);

    const navigate = useNavigation();

    const _renderTopProduct = ({ item, index }: any) => {
        const _product = item.items;
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('productDetail',
                { item }
            )}
                style={{
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
                }}>
                <View style={{
                    margin: 5
                }}>
                    <Image style={{
                        height: 160,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _product.cover }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 15, paddingBottom: 2, color: '#aaa' }} numberOfLines={2}>
                            {_product.name}
                        </Text>
                        {/* <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_product.description}
                        </Text> */}
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 5,
                            fontWeight: 'bold',
                            color: PRICE_COLOR
                        }}
                            numberOfLines={1}>
                            {'$' + _product.price}
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
            }}>
                <Text>Top Products</Text>
            </View>
            <FlatGrid
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={130}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    paddingTop: -5,
                    marginBottom: -5
                }}
                renderItem={_renderTopProduct}
                data={products}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default TopProduct

const styles = StyleSheet.create({})

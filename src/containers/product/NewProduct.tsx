import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles/index';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const screen = Dimensions.get('screen')

const NewProduct = () => {
    const new_products = useSelector((state: { new_products: any }) => state.new_products);
    const navigate = useNavigation();

    // useEffect(() => {
    //     firestore().collection('clients').get().then(data => {
    //         console.log(data.docs.length, 'sssssssssssss')
    //     })
    // }, [])


    const _renderNewProduct = ({ item, index }: any) => {
        const _NewProduct = item.items;
        return (
            <TouchableOpacity key={index} style={[styles.newProductContainer, {
                marginLeft: index === 0 ? 10 : 0,
                marginHorizontal: 10,
                marginBottom: 10,
            }]}
                onPress={() => navigate.navigate('ProductDetail',
                    {
                        item
                    }
                )}>
                <View style={{
                    padding: 5,
                }}>
                    <FastImage style={{
                        height: 100,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _NewProduct.product_info.photos[0].photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 13, paddingBottom: 2, color: '#aaa' }} numberOfLines={2}>
                            {_NewProduct.product_info.product_name}
                        </Text>
                        {/* <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_NewProduct.product_info.product_description}
                        </Text> */}
                        <Text style={styles.newProductPrice}
                            numberOfLines={1}>
                            {'$' + _NewProduct.product_info.units[0].price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.newProductGrid}>
                <Text>New Products</Text>
                {new_products.length > 8 && <TouchableOpacity onPress={() => navigate.navigate('ProductItem', {
                    title: 'New Products'
                })}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
                }
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
                renderItem={_renderNewProduct}
                data={new_products.slice(0, 8)}

            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default NewProduct

const styles = StyleSheet.create({
    newProductGrid: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newProductPrice: {
        fontSize: 14,
        paddingVertical: 3,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    newProductContainer: {
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
    },
})


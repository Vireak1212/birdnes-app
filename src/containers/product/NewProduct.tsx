import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles/index';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const screen = Dimensions.get('screen')

const NewProduct = () => {
    const products = useSelector((state: { products: any }) => state.products);
    const navigate = useNavigation();
    // useEffect(() => {
    //     firestore().collection('products').get().then(data => {
    //         console.log(data.docs.length, 'sssssssssssss')
    //     })
    // }, [])


    const _renderNewProduct = ({ item, index }: any) => {
        const _NewProduct = item.items;
        return (
            <TouchableOpacity key={index} style={styles.newProductContainer}
                onPress={() => navigate.navigate('productDetail',
                    { item }
                )}>
                <View style={{
                    flexDirection: 'row',
                    padding: 5
                }}>
                    <FastImage style={{
                        height: 90,
                        width: 85,
                        borderRadius: 5,
                    }}
                        source={{ uri: _NewProduct.product_info.photos[0].photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Col style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 12, paddingBottom: 2 }} numberOfLines={2}>
                            {_NewProduct.product_info.product_name}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_NewProduct.description}
                        </Text>
                        <Text style={styles.newProductPrice}
                            numberOfLines={1}>
                            {'$' + _NewProduct.price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.newProductGrid}>
                <Text>New Product</Text>
                <TouchableOpacity onPress={() => navigate.navigate('allProduct')}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
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
                renderItem={_renderNewProduct}
                data={products.slice(0, 4)}
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
        fontSize: 13,
        paddingTop: 2,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    newProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 4 / 8.7,
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


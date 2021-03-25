import { useNavigation } from '@react-navigation/native';
import { Col, Item } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles/index';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import NumberFormat from 'react-number-format';

const screen = Dimensions.get('screen')

const NewProduct = () => {
    const new_products = useSelector((state: { new_products: any }) => state.new_products);
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    // useEffect(() => {
    //     firestore().collection('clients').get().then(data => {
    //         console.log(data.docs.length, 'sssssssssssss')
    //     })
    // }, [])


    const _renderNewProduct = ({ item, index }: any) => {
        const _NewProduct = item.items;
        return (
            <View key={index} style={[style.newProductContainer, {
                marginLeft: index === 0 ? 10 : 0,
                marginHorizontal: 10,
                marginBottom: 10,
            }]}>
                <TouchableWithoutFeedback
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

                            <NumberFormat
                                value={_NewProduct.product_info.units[0].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                prefix={''}
                                renderText={value =>
                                    <Text style={style.newProductPrice}
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

            <View style={style.newProductGrid}>
                <Text>New Products</Text>
                {new_products.length > 8 && <TouchableOpacity onPress={() => navigate.navigate('ProductItem',
                    {
                        title: 'New Products',
                        products: new_products
                    })}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
                }
            </View>

            <FlatList
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

const styles = StyleSheet.create({})


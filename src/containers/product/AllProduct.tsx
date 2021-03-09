import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
import style, { PRICE_COLOR } from '../../styles';
const screen = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';
import { useSelector } from 'react-redux';

const AllProduct = () => {
    const products = useSelector((state: { products: any }) => state.products);
    const navigate = useNavigation();

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderAllProduct = ({ item, index }: any) => {
        const _AllProduct = item.items;
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('productDetail',
                { item }
            )}
                style={styles.allProductContainer}>
                <View style={{
                    margin: 5
                }}>
                    <Image style={{
                        height: 150,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _AllProduct.cover }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                            {_AllProduct.name}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {_AllProduct.description}
                        </Text>
                        <Text style={styles.allProductPrice}
                            numberOfLines={1}>
                            {'$' + _AllProduct.price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'All Product'}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
            <FlatGrid
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={130}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    marginBottom: -5
                }}
                renderItem={_renderAllProduct}
                data={products}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default AllProduct

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

import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../custom_items/MainHeader';
import { Col, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';


const OrderHistory = (props: any) => {
    const order_history = useSelector((state: { order_history: any }) => state.order_history);
    console.log(order_history.items.order_info.products[0].unit.photo_url)

    const data = [0, 1, 2, 3, 4, 5, 6];
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderItem = ({ item, index }: any) => {
        const _order = item;
        return (
            <View key={index} style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: index == order_history.items.order_info.products.length - 1 ? 10 : 0
            }}>
                <FastImage
                    source={{ uri: _order.unit.photo_url }}
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: 10,
                        // borderTopLeftRadius: 5,
                        // borderBottomLeftRadius: 5,
                        backgroundColor: '#ddd'
                    }} />
                <Col style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: 10
                }}>
                    <View style={{
                    }}>
                        <Text style={styles.textcolor} numberOfLines={1}>
                            {_order.product_name}
                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>
                            code: {_order.product_code}
                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>
                            x{_order.amount} {_order.unit.unit_name}
                        </Text>
                    </View>
                    <Row style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ fontSize: 16, color: 'red' }}>
                            price : {_order.unit.price}
                        </Text>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            width: 90,
                            borderWidth: 1,
                            borderColor: "#aaa",
                            borderRadius: 20
                        }}>
                            <Text style={{
                                color: '#888'
                            }}>Order again</Text>
                        </TouchableOpacity>
                    </Row>
                </Col>
            </View>

        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title="Order History"
                leftIcon={leftIcon()}
            />
            {order_history.length !== 0 ?
                order_history.items.order_info.products.length == 0 ? null
                    : (
                        <FlatList
                            style={{
                                marginHorizontal: 10,
                            }}
                            data={order_history.items.order_info.products}
                            renderItem={_renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : null
            }



        </SafeAreaView>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    textcolor: {
        color: '#000',

        fontSize: 16
    },
    textDateSwiftNews: {
        fontWeight: 'bold',
        borderRightWidth: 1.5,
        height: 18,
        fontSize: 13,
        paddingTop: 1
    }


})
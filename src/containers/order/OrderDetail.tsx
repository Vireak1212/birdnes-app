import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import NumberFormat from 'react-number-format';
import { Divider } from 'react-native-elements';
import { dateDiffInNotification, makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

const screen = Dimensions.get('screen')
const OrderDetail = (props: any) => {
    const { item } = props.route.params;
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const order_history = useSelector((state: { order_history: any }) => state.order_history);

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    const RightIcon = () => <TouchableOpacity style={style.leftRightHeader}>
        <MaterialIcons name="share" size={25} style={{ color: '#000' }} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <ScrollView>
                <MainHeader
                    title={'Order Detail'}
                    leftIcon={leftIcon()}
                />


                <View style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={[style.orderDetailDate, { fontSize: 16 }]} numberOfLines={1}>
                        {'Order ID: ' + item.items.document_number}
                    </Text>

                    <Text style={{ color: '#aaa' }} numberOfLines={1}>
                        {dateDiffInNotification(item.items.order_info.order_date.toDate())}
                    </Text>
                    <Row style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                        <Entypo name='location-pin' size={30} color='#aaa' style={{ paddingRight: 5 }} />
                        <Text style={{ color: '#aaa' }}>{item.items.client_info.address}</Text>
                    </Row>
                </View>



                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10 }}>
                    {item.items.order_info.products.map((_product: any) => {
                        return (
                            <View key={makeid()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>

                                <FastImage
                                    source={{ uri: _product.unit.photo_url }}
                                    style={{
                                        height: 90,
                                        width: 100,
                                        borderRadius: 10,
                                        margin: 5
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />

                                <Col style={{ padding: 5 }}>
                                    <Col style={{ marginLeft: 5, justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{
                                                color: '#000',
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }} numberOfLines={1}>
                                                {_product.product_name}
                                            </Text>

                                            {_product.product_code === 0 ? (
                                                <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                                    {'#' + _product.product_code}
                                                </Text>
                                            ) : null}

                                            <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                                x{_product.qty} {_product.unit.unit_name}
                                            </Text>
                                        </View>
                                    </Col>

                                    <View>
                                        <NumberFormat
                                            value={_product.amount}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={''}
                                            renderText={value =>
                                                <Text style={{ color: PRICE_COLOR, fontWeight: 'bold' }}
                                                    numberOfLines={1}
                                                >{"$ " + value}
                                                </Text>} />
                                    </View>
                                </Col>
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
            <View style={{
                paddingHorizontal: 15,
                paddingBottom: 15
            }}>

                <View style={style.orderTotalContainer}>
                    <Text style={{
                        color: '#000',
                    }}>Subtotal</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <NumberFormat
                            value={item.items.order_info.total_amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{ color: 'red' }}
                                    numberOfLines={1}
                                >{"USD: " + value}
                                </Text>} />
                    </View>
                </View>

                <View style={style.orderTotalContainer}>
                    <Text style={{
                        color: '#000',
                    }}>Shipping Fee</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <NumberFormat
                            // value={ }
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{ color: 'red' }}
                                    numberOfLines={1}
                                >{"USD: " + value}
                                </Text>} />
                    </View>
                </View>

                <View style={[style.orderTotalContainer, {
                    paddingBottom: 0
                }]}>
                    <Text style={{
                        color: '#000',
                        fontWeight: 'bold'
                    }}>Total</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <NumberFormat
                            value={item.items.order_info.total_amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}
                                    numberOfLines={1}
                                >{"USD: " + value}
                                </Text>} />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default OrderDetail

const styles = StyleSheet.create({})

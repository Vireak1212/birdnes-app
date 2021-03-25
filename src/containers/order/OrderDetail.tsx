import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import { useNavigation } from '@react-navigation/native';
import { Row } from 'native-base';
import NumberFormat from 'react-number-format';
import { Divider } from 'react-native-elements';

const screen = Dimensions.get('screen')
const OrderDetail = (props: any) => {
    const { item } = props.route.params;
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const product_name = item.product_name;

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    const RightIcon = () => <TouchableOpacity style={style.leftRightHeader}>
        <MaterialIcons name="share" size={25} style={{ color: '#000' }} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title={product_name}
                leftIcon={leftIcon()}
            />
            <View style={{
                marginHorizontal: 10,
                marginVertical: 10,
            }}>
                <FastImage
                    source={{ uri: item.unit.photo_url }}
                    style={{
                        width: '100%',
                        borderRadius: 10,
                        height: screen.width / 1.8,
                    }}
                />
            </View>

            <View style={{
                paddingHorizontal: 15,
            }}>
                <Text style={style.orderDetailDate} numberOfLines={1}>
                    Order Date : 03 22 2021
                </Text>



                <View style={style.orderTotalContainer}>
                    <Text style={{
                        color: '#000',
                    }}>Subtotal</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <NumberFormat
                            value={item.amount}
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
                            value={item.unit.amount}
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
                            value={item.amount}
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

                <Divider style={{ height: 0.7, marginTop: 15 }} />

                <Text style={style.orderShipping} numberOfLines={1}>
                    Shipping Address
                </Text>

                <Text>
                    22 Baker Street London MG91 9AF
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default OrderDetail

const styles = StyleSheet.create({})

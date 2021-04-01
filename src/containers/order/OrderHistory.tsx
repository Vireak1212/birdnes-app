import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../custom_items/MainHeader';
import { Col, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles';
import { dateDiffInNotification } from '../../functions/PTFunction';

const OrderHistory = (props: any) => {
    const order_history = useSelector((state: { order_history: any }) => state.order_history);
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    React.useEffect(() => {
        getOrder();
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [order_history.length])

    const getOrder = async () => {
        setTimeout(() => {

        }, 200);
    }

    const _renderItem = ({ item, index }: any) => {
        const _order = item.items;
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('OrderDetail',
                { item }
            )}
                style={[style.orderHistoryContainer, {
                    marginBottom: index == order_history.length - 1 ? 10 : 0

                }]}>

                <Col style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: 10,
                }}>

                    <Row style={{ justifyContent: 'space-between' }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }} numberOfLines={1}>
                            {'#' + _order.document_number}
                        </Text>
                        <Text style={{ color: '#aaa' }}>
                            {dateDiffInNotification(_order.order_info.order_date.toDate())}
                        </Text>
                    </Row>

                    <Text style={{ color: '#aaa', fontSize: 13, paddingTop: 5 }} numberOfLines={2}>
                        {_order.order_info.products[0].product_name + ' etc. ' + _order.order_info.products.length + ' item'}
                    </Text>
                    <Row style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 10
                    }}>
                        <NumberFormat
                            value={_order.order_info.total_amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{
                                    color: PRICE_COLOR,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                    numberOfLines={1}
                                >{"Total " + "$" + value}
                                </Text>} />

                        <TouchableOpacity onPress={() => navigate.navigate('OrderDetail',
                            { item }
                        )}>
                            <Text style={{ color: MAIN_COLOR }}>View Detail</Text>
                        </TouchableOpacity>
                    </Row>

                </Col>
            </TouchableOpacity>

        )
    }

    const noItem = () => {
        return (
            <View style={style.cartImageContainer}>
                <Image style={{
                    height: 200,
                    width: 200,
                }}
                    source={require('../../images/empty-cart-rappi.png')}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{ opacity: 0.5 }}>Order Empty</Text>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title="Order History"
                leftIcon={leftIcon()}
            />
            <>
                {isInitialLoad ?
                    <ActivityIndicator style={{
                        marginTop: 20
                    }} size={35} color={MAIN_COLOR} />
                    : (
                        <>
                            {order_history.length === 0 ? noItem()
                                : (
                                    <FlatList
                                        style={{
                                            marginHorizontal: 10,
                                        }}
                                        data={order_history}
                                        renderItem={_renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )
                            }
                        </>
                    )
                }
            </>

        </SafeAreaView>
    )
}

export default OrderHistory

const styles = StyleSheet.create({


})
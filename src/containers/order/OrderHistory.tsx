import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../custom_items/MainHeader';
import { Col, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import NumberFormat from 'react-number-format';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles';


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
        const _order = item;
        return (
            <View key={index} style={[styles.orderHistoryContainer, {
                marginBottom: index == order_history.items.order_info.products.length - 1 ? 10 : 0
            }]}>
                <TouchableOpacity onPress={() => navigate.navigate('OrderDetail',
                    { item }
                )} >
                    <FastImage style={{
                        height: 120,
                        width: 120,
                        borderRadius: 10,
                        backgroundColor: '#ddd'
                    }}
                        source={{ uri: _order.unit.photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <Col style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: 10,
                }}>
                    <View style={{
                    }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 16
                        }} numberOfLines={1}>
                            {_order.product_name}
                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>
                            code: {_order.product_code}
                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>
                            x{_order.qty} {_order.unit.unit_name}
                        </Text>
                    </View>
                    <Row style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                        <NumberFormat
                            value={_order.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{ color: PRICE_COLOR }}
                                    numberOfLines={1}
                                >{"price: " + "$ " + value}
                                </Text>} />

                        <TouchableOpacity style={styles.orderAgainButton}>
                            <Text style={{
                                color: '#888'
                            }}>Order again</Text>
                        </TouchableOpacity>
                    </Row>
                </Col>
            </View>

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
                            {order_history.length !== 0 ?
                                order_history.items.order_info.products.length == 0 ? noItem()
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
                                    ) : noItem()
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
    orderAgainButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 90,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 20
    },
    orderHistoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textDateSwiftNews: {
        fontWeight: 'bold',
        borderRightWidth: 1.5,
        height: 18,
        fontSize: 13,
        paddingTop: 1
    },

})
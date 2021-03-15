import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR, PRICE_COLOR } from '../styles/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { MAIN_COLOR } from '../styles/index';

const MainCartScreen = (props: any) => {
    const carts = useSelector((state: { carts: any }) => state.carts);
    const data = [0, 1, 2, 3];

    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };
    const handleDecrement = () => {
        if (count === 1) {
            setCount((prevCount) => prevCount - 0)
        } else {
            setCount(prevCount => prevCount - 1);
        }
    };

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderItem = ({ item, index }: any) => {
        return (

            <View key={index} style={[styles.cartContainer, {
                marginBottom: index == data.length - 1 ? 10 : 0,
            }]}>
                <TouchableOpacity>
                    <FastImage
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Edible-birds-nest-bowl-shape.png' }}
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 10,
                            margin: 5,
                        }} />

                </TouchableOpacity>

                <Col style={{
                    padding: 5,
                    justifyContent: 'space-between',
                }}>
                    <Row>
                        <Col>
                            <Text style={{
                                color: '#000',
                                fontSize: 16
                            }} numberOfLines={1}>
                                Bird Nest
                            </Text>
                            <Text style={{ color: '#aaa' }} numberOfLines={2}>
                                Bird Nest is goods from Phum Trojeakam in Cambodia
                            </Text>
                        </Col>

                        <TouchableOpacity style={styles.deleteCartContainer}>
                            <AntDesign name="delete" size={23} color='red' />
                        </TouchableOpacity>

                    </Row>

                    <View style={styles.cartActionContainer}>
                        <Text style={{
                            fontSize: 16,
                            color: MAIN_COLOR,
                            fontWeight: 'bold',
                        }}>$15</Text>

                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={handleDecrement}
                                style={[styles.MPBotton, {
                                    marginHorizontal: 10
                                }]}>
                                <AntDesign name="minus" size={23} style={{ color: ICON_COLOR }} />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {count}
                            </Text>

                            <TouchableOpacity onPress={handleIncrement}
                                style={[styles.MPBotton, {
                                    marginLeft: 10
                                }]}>
                                <AntDesign name="plus" size={18} style={{ color: ICON_COLOR }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Col>
            </View>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                props.route.params !== undefined ?
                    props.route.params.header === 'show' ?
                        <MainHeader
                            title={'Cart'}
                            leftIcon={leftIcon()}
                        /> : null :
                    <MainHeader
                        title={'Cart'}
                    />
            }


            {data.length > 0 ? (
                <FlatList
                    style={{
                        marginHorizontal: 10
                    }}
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={style.cartImageContainer}>
                    <Image style={{
                        height: 200,
                        width: 200,
                    }}
                        source={require('../images/empty-cart-rappi.png')}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    <Text style={{ opacity: 0.5 }}>Cart Empty</Text>
                </View>
            )}



            <View style={style.checkOutContainer}>
                <Col>
                    <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$0</Text>
                </Col>
                <TouchableOpacity style={style.styleCHACKOUT}>
                    <Text style={{ color: '#fff' }}>CHEACKOUT</Text>
                    <AntDesign name='playcircleo' size={20}
                        style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default MainCartScreen

const styles = StyleSheet.create({
    cartActionContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    deleteCartContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    },
    MPBotton: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    },
})

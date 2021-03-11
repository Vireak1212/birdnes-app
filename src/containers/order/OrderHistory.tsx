import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../custom_items/MainHeader';
import { Col, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
const OrderHistory = (props: any) => {

    const data = [0, 1, 2, 3, 4, 5, 6];
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderItem = ({ item, index }: any) => {
        return (


            <View style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                alignItems: 'center',
                width: '100%',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: index == data.length - 1 ? 10 : 0
            }}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Edible-birds-nest-bowl-shape.png' }}
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
                        <Text
                            style={styles.textcolor} numberOfLines={1}>
                            Bird Nest
                        </Text>
                        <Text
                            style={{
                                color: '#aaa'
                            }} numberOfLines={2}>
                            Bird Nest is goods from Phum Trojeakam in Cambodia
                        </Text>
                    </View>
                    <Row style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'red'
                        }}>$15</Text>
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
            <FlatList
                style={{
                    marginHorizontal: 10
                }}
                data={data}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />


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
101
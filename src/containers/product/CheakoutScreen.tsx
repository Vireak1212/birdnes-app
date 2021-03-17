import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row } from 'native-base';
import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'

const CheakoutScreen = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Checkout'}
                leftIcon={leftIcon()}
            />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shipping Address</Text>
                <Row style={{
                    backgroundColor: '#fff',
                    height: 80,
                    width: '100%',
                    borderWidth: 0.2,
                    marginTop: 10,
                    borderColor: '#224889',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10
                }}>
                    <View style={{}}>
                        <Text>Name : Tanglim</Text>
                        <Text style={{ opacity: 0.5, marginTop: 5 }}>N28 St 149, Phnom Penh, Cambodia</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                        <FastImage
                            source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_138923.png' }}
                            style={{
                                height: 25,
                                width: 25,
                                borderRadius: 20,
                                backgroundColor: '#eee'
                            }} />
                    </TouchableOpacity>

                </Row>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Payment Method</Text>
                <Row style={{
                    backgroundColor: '#fff',
                    height: 80,
                    width: '100%',
                    borderWidth: 0.2,
                    marginTop: 10,
                    borderColor: '#224889',
                    borderRadius: 5,
                    alignItems: 'center',
                    padding: 10
                }}>
                    <FastImage
                        source={{ uri: 'https://static.thenounproject.com/png/3306801-200.png' }}
                        style={{
                            height: 45,
                            width: 50,
                        }} />
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Coming Soon')
                    }}>
                        <Text style={{ color: '#224889', marginLeft: 15 }}>Choose on delevery</Text>
                    </TouchableOpacity>
                </Row>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Items</Text>
                <View style={{
                    flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', width: '100%', borderRadius: 10, marginTop: 10,
                    shadowColor: "#000",
                }}>
                    <TouchableOpacity>
                        <FastImage
                            source={{ uri: 'https://cdn.pixabay.com/photo/2018/10/25/06/00/khmer-food-3771719_960_720.jpg' }}
                            style={{
                                height: 110,
                                width: 110,
                                borderRadius: 10,
                                margin: 5,
                            }} />

                    </TouchableOpacity>
                    <Col style={{ marginLeft: 15 }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 18
                        }} numberOfLines={1}>
                            ទឹកគ្រឿង
                            </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={2}>
                            code: 007
                            </Text>
                        <Text style={{ color: 'red' }} numberOfLines={2}>
                            price: $10
                            </Text>
                    </Col>
                </View>


            </View>
            <View style={style.checkOutContainer}>
                <Col>
                    <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$0</Text>
                </Col>
                <TouchableOpacity
                    style={style.styleCHACKOUT} onPress={() => navigate.navigate('Successful')}>
                    <Text style={{ color: '#fff' }}>CHEACKOUT</Text>
                    <AntDesign name='playcircleo' size={20}
                        style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}


export default CheakoutScreen;
const styles = StyleSheet.create({})
import { useNavigation } from '@react-navigation/native';
import { Button, Col, Row } from 'native-base';
import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'

const ShippingAddress = () => {

    const navigate = useNavigation();
    const client = useSelector((state: { client: any }) => state.client);
    const style = useSelector((state: { style: any }) => state.style)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Shipping Address'}
                leftIcon={leftIcon()}
            />
            <ScrollView>

                <View style={{ marginHorizontal: 30, marginTop: 30 }}>
                    <Text style={{
                        fontSize: 30
                    }}>
                        ShippingAddress
                    </Text>
                    <Text style={{
                        color: '#224889'
                    }}>
                        Make change to your Shipping information
                    </Text>


                    {/* <View style={[style.styleforms, { flexDirection: 'row' }]}>
                        <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                            <Entypo name="location-pin" size={30}
                                style={{
                                    color: '#c96116',
                                    marginLeft: 10
                                }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 15 }}>
                            Shipping Address
                        </Text>
                    </View> */}

                    <Row style={style.shippingAddress}>
                        <Col>
                            <Text style={{ opacity: 0.5, }}>
                                {client.items.shipping_address}
                            </Text>
                        </Col>


                        <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                            <FastImage style={style.shippingAddressIcon}
                                source={require('../../images/icon/img_location.png')}
                            />
                        </TouchableOpacity>

                    </Row>


                </View>

                <View style={{ marginHorizontal: 30 }}>
                    <Button
                        // onPress={() => onSave()}
                        full rounded style={style.bottonUpdate}>
                        <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>Update</Text>
                        </Row>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
}


export default ShippingAddress;
const styles = StyleSheet.create({})
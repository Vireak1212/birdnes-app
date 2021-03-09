import { Col } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR, PRICE_COLOR } from '../styles/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';

const MainCartScreen = (props: any) => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

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
            <View style={style.stylePrice}>
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

})

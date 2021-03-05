import { Col } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style, { ICON_COLOR, PRICE_COLOR } from '../styles/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../custom_items/MainHeader';

const MainCartScreen = (props: any) => {
    const navigate = useNavigation();

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
            <View style={styles.cartImageContainer}>
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
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 20,
                position: 'absolute',
                bottom: 30
            }}>
                <Col>
                    <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$0</Text>
                </Col>
                <TouchableOpacity style={{
                    backgroundColor: '#224889',
                    width: '50%', height: 50,
                    borderRadius: 10, alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'row',

                }}>
                    <Text style={{ color: '#fff' }}>CHEACKOUT</Text>
                    <AntDesign name='playcircleo' size={20} style={{ color: '#fff', marginLeft: 10 }} color='#000' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default MainCartScreen

const styles = StyleSheet.create({
    cartImageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 130
    },
})

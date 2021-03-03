import { Col } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
const MainCartScreen = () => {
    return (
        // <View style={{ backgroundColor: '#000', height: 50, width: '100%' }}>
        //     <Text>Hello</Text>
        //     <Image style={{ position: 'absolute', top: 50, width: '100%', height: 200 }} resizeMode='cover'
        //         resizeMethod='resize' source={require('../images/empty-cart-rappi.png')} />

        // </View>
        <View style={{ flex: 1 }}>
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
        </View>
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

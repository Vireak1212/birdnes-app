import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

const OrderSuccessful = () => {
    const style = useSelector((state: { style: any }) => state.style)
    return (
        <View style={{ flex: 1 }}>
            <View style={style.cartImageContainer}>
                <Image style={{
                    height: 300,
                    width: 200,
                }}
                    source={require('../../images/icon/capture.png')}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{ fontSize: 25, marginTop: 20 }}>Order Successful</Text>
            </View>
        </View>
    )
}

export default OrderSuccessful

const styles = StyleSheet.create({})


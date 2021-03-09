import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';


const Wishlish = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title="Wishlish"
                leftIcon={leftIcon()}
            />
        </SafeAreaView>
    )
}

export default Wishlish;

const styles = StyleSheet.create({})

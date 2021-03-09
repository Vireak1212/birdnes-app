import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';

const ProductOfCategory = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Category Name'}
                leftIcon={leftIcon()}
            />
        </SafeAreaView>
    )
}

export default ProductOfCategory

const styles = StyleSheet.create({})

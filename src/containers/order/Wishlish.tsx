import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import { PRICE_COLOR } from '../../styles';


const Wishlish = () => {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const _renderCurrentProject = ({ index }: any) => {
        return (
            <View style={[style.orderHistoryContainer]}>
                <TouchableOpacity >
                    <FastImage style={{
                        height: 120,
                        width: 120,
                        borderRadius: 10,
                        margin: 5,
                        backgroundColor: '#ddd'
                    }}
                        source={require('../../images/icon/logo.png')}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <Col style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: 10,
                }}>
                    <View style={{
                    }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 16
                        }} numberOfLines={1}>
                            Text
                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>

                        </Text>
                        <Text style={{ color: '#aaa' }} numberOfLines={1}>

                        </Text>
                    </View>
                    <Text style={{ color: 'red' }}>10$</Text>
                </Col>
            </View>

        )
    }
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
            <FlatList
                style={{ marginBottom: 10, marginHorizontal: 10 }}
                renderItem={_renderCurrentProject}
                data={data}
                keyExtractor={(item) => item.toString()}
                initialNumToRender={4}
                maxToRenderPerBatch={8}
                windowSize={10}
                onEndReachedThreshold={0.8}
            />
        </SafeAreaView>
    )
}

export default Wishlish;

const styles = StyleSheet.create({})

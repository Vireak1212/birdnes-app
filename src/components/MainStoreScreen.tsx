import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../functions/PTFunction';
const screen = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style, { ICON_COLOR } from '../styles/index'
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';

const MainStoreScreen = () => {
    const store = useSelector((state: { store: any }) => state.store);
    const navigate = useNavigation();

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderMainStore = ({ item, index }: any) => {
        const _AllStore = item.items;
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('StoreDetail',
                { item }
            )}
                style={{
                    backgroundColor: '#fff',
                    width: screen.width * 3 / 10,
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.00,

                    elevation: 1,
                }}>
                <View style={{
                    margin: 3
                }}>
                    <Image style={{
                        height: 80,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _AllStore.store_cover }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    {/* <Col style={{ paddingTop: 5 }}>
                        <Text style={{ fontSize: 13, paddingBottom: 2 }} numberOfLines={2}>
                            Premium birdnest drink
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={1}>
                            Bird's nest new product for health
                        </Text>
                    </Col> */}
                    <Text style={{
                        position: 'absolute',
                        color: '#fff',
                        backgroundColor: 'rgba(60, 60, 60, 0.3)',
                        bottom: 0,
                        left: 0,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        fontSize: 12,
                    }} numberOfLines={2}>{_AllStore.store_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'All Store'}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />

            <FlatGrid
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={100}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    marginBottom: -5
                }}
                renderItem={_renderMainStore}
                data={store}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default MainStoreScreen

const styles = StyleSheet.create({})

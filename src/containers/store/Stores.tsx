import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
const size = Dimensions.get('screen');

const Stores = () => {
    const store = useSelector((state: { store: any }) => state.store);
    const style = useSelector((state: { style: any }) => state.style);
    const navigate = useNavigation();

    const _renderFeatureStore = ({ item, index }: any) => {
        const _store = item.items;

        return (
            <View key={index} style={[style.storeContainer, {
                marginLeft: index === 0 ? 5 : 5,
                marginRight: item.length - 1 == index ? 10 : 5,
            }]}>
                <TouchableWithoutFeedback
                    onPress={() => navigate.navigate('StoreDetail',
                        { item }
                    )}>
                    <View>
                        <FastImage style={{
                            width: size.width / 3,
                            height: 90,
                            borderRadius: 5,
                            margin: 5
                        }}
                            source={{ uri: _store.store_cover }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={style.storeName} numberOfLines={2}>
                            {_store.store_name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>Stores</Text>
                <TouchableOpacity onPress={() => navigate.navigate('AllStore')}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={store}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                listKey={makeid()}
                renderItem={_renderFeatureStore}
                style={{ marginHorizontal: 5 }}
            />
        </SafeAreaView>
    )
}

export default Stores

const styles = StyleSheet.create({})

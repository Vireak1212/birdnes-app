import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
const size = Dimensions.get('screen');

const Stores = () => {
    const store = useSelector((state: { store: any }) => state.store);
    const navigate = useNavigation();

    const _renderFeatureStore = ({ item, index }: any) => {
        const _store = item.items;

        return (
            <View key={index} style={[styles.featureStoreContainer, {
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
                        <Text style={styles.featureStoreName} numberOfLines={2}>
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

const styles = StyleSheet.create({
    featureStoreName: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: 'rgba(60, 60, 60, 0.3)',
        fontWeight: 'bold',
        fontSize: 12,
        bottom: 6,
        left: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    featureStoreContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    }
})

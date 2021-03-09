import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles/index';
const screen = Dimensions.get('screen')

const StoreIteam = () => {
    const navigate = useNavigation();

    const [data, setData] = useState([
        {
            id: 1,
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Edible-birds-nest-bowl-shape.png'
        },
        {
            id: 2,
            image: 'https://www.nybirdnest.com/wp-content/uploads/2018/01/subscription-img-1-300x297.png'
        },
        {
            id: 3,
            image: 'https://cf.shopee.com.my/file/3999485dc804db95cdc9dda76d4b248a'
        },
        {
            id: 4,
            image: 'https://lh3.googleusercontent.com/proxy/gZeqVy4Abc8CiBc39LAuucNA-_boztwUBbUrvOLpJjCntR-DA2RpkUvccLqVE_aXlt45wN1avHQ0nKHoGsTApI9ppkFoyG31pXHjCuuuz_VU0Hg'
        },
        {
            id: 2,
            image: 'https://thaiaroonbirdnest.com/en/wp-content/uploads/2018/11/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B21.png'
        },
    ])

    const _renderShopItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index} style={styles.storeItemContainer}
                onPress={() => navigate.navigate('productDetail',
                    { item }
                )}>
                <View style={{
                    margin: 5
                }}>
                    <Image style={{
                        height: 150,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: item.image }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    <Col style={{ paddingTop: 5 }}>
                        <Text style={{ fontSize: 13, paddingBottom: 2 }} numberOfLines={2}>
                            Premium birdnest drink
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={1}>
                            Bird's nest new product for health
                        </Text>
                        <Text style={styles.storeItemPrice} numberOfLines={1}>
                            $15.50
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <FlatGrid
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={130}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    marginBottom: -5
                }}
                renderItem={_renderShopItem}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default StoreIteam

const styles = StyleSheet.create({
    storeItemPrice: {
        fontSize: 13,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    storeItemContainer: {
        backgroundColor: '#fff',
        width: screen.width * 8 / 17.5,
        borderRadius: 5,
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

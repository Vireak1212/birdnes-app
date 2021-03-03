import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { makeid } from '../../functions/PTFunction';
const size = Dimensions.get('screen');

const FeatureStores = () => {
    const navigate = useNavigation();

    const [data, setData] = useState([
        {
            id: 1,
            image: 'https://digitalagencynetwork.com/wp-content/uploads/2018/11/brilliant-nike-campaigns.png'
        },
        {
            id: 2,
            image: 'https://w3-lab.com/wp-content/uploads/2019/10/nike-and-cocacola-emotins-1024x640.jpg'
        },
        {
            id: 3,
            image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1549616344492/adidas-coupons.jpg'
        },
        {
            id: 4,
            image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1549616344492/adidas-coupons.jpg'
        }
    ])

    const _renderFeatureStore = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => navigate.navigate('storeDetail',
                { item }
            )}
                style={{
                    backgroundColor: '#fff',
                    marginLeft: index === 0 ? 5 : 5,
                    marginRight: item.length - 1 == index ? 10 : 5,
                    borderRadius: 5,
                }}>
                <Image key={index} source={{ uri: item.image }}
                    style={{
                        width: size.width / 3,
                        height: 90,
                        borderRadius: 5,
                        margin: 5
                    }}>
                </Image>
                <Text style={{
                    position: 'absolute',
                    color: '#fff',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    bottom: 6,
                    left: 5,
                    borderTopRightRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 2
                }} numberOfLines={2}>Pro Brid Shop</Text>
            </TouchableOpacity>
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
                <Text>Feature Stores</Text>
                <TouchableOpacity onPress={() => navigate.navigate('allStore')}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
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

export default FeatureStores

const styles = StyleSheet.create({

})

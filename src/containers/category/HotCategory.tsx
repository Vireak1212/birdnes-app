import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
const screen = Dimensions.get('screen')

const HotCategory = () => {
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
        },
        {
            id: 2,
            image: 'https://w3-lab.com/wp-content/uploads/2019/10/nike-and-cocacola-emotins-1024x640.jpg'
        },
    ])

    const _renderHotCategory = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index}>
                <Image style={{
                    height: 80,
                    width: screen.width * 3 / 10,
                    borderRadius: 5,
                }}
                    source={{ uri: item.image }}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{
                    position: 'absolute',
                    color: '#fff',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    bottom: 0,
                    left: 0,
                    borderTopRightRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    fontSize: 12,
                }} numberOfLines={2}>Pro Brid Shop</Text>

            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <View style={{
                backgroundColor: '#fff',
                marginTop: 10,
                paddingVertical: 10,
                paddingLeft: 10
            }}>
                <Text>Hot Category</Text>
            </View>
            <FlatGrid
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={95}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginTop: -10,
                }}
                renderItem={_renderHotCategory}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default HotCategory

const styles = StyleSheet.create({})

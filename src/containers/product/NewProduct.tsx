import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles/index';
const screen = Dimensions.get('screen')

const NewProduct = () => {
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

    const _renderNewProduct = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('productDetail',
                { item }
            )}
                style={
                    {
                        backgroundColor: '#fff',
                        width: screen.width * 8 / 17.5,
                        borderRadius: 5,
                    }}>
                <View style={{
                    flexDirection: 'row',
                    padding: 5
                }}>
                    <Image style={{
                        height: 75,
                        width: 80,
                        borderRadius: 5,
                    }}
                        source={{ uri: item.image }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                    <Col style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 12, paddingBottom: 2 }} numberOfLines={2}>
                            Premium birdnest drink
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={1}>
                            Bird's nest new product for health
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            paddingTop: 2,
                            fontWeight: 'bold',
                            color: PRICE_COLOR
                        }}
                            numberOfLines={1}>
                            $15.50
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                paddingVertical: 15,
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>New Product</Text>
                <TouchableOpacity onPress={() => navigate.navigate('allProduct')}>
                    <Text style={{ fontSize: 13, color: '#224889' }}>More</Text>
                </TouchableOpacity>
            </View>
            <FlatGrid
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={130}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    paddingTop: -5,
                    marginBottom: -5
                }}
                renderItem={_renderNewProduct}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default NewProduct

const styles = StyleSheet.create({

})

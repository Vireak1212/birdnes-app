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
            image: 'https://www.mcgill.ca/oss/files/oss/styles/hd/public/s_white_900x600-4.jpg?itok=t3Ztf2bL&timestamp=1548273854'
        },
        {
            id: 2,
            image: 'https://www.thespruceeats.com/thmb/bYV1LMBZmNqEb1-slUnAylk0muE=/724x407/smart/filters:no_upscale()/Bird-s-nest-soup-576915305f9b58346aab3366.jpg'
        },
        {
            id: 3,
            image: 'https://media.istockphoto.com/photos/edible-birds-nest-and-goji-jujube-birds-nest-soup-traditional-chinese-picture-id1071659556?k=6&m=1071659556&s=612x612&w=0&h=vRvaQNpOH87lPblQr5EV6mY_LvZn_9D9e-hwJ3a8gcU='
        },
        {
            id: 4,
            image: 'https://www.thespruceeats.com/thmb/EXeaj3QF879cqllA4UySqlLfM9s=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/16232589180_9d1e4a3ece_k-583290e53df78c6f6af2a79c.jpg'
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

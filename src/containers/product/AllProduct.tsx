import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
import style, { PRICE_COLOR } from '../../styles';
const screen = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';

const AllProduct = () => {
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
            id: 5,
            image: 'https://eveessential.com.my/wp-content/uploads/2020/12/3-1.jpg'
        },
        {
            id: 6,
            image: 'https://cf.shopee.sg/file/cf06a6b3258d1e196bb2ea93644328e8'
        },
        {
            id: 7,
            image: 'https://cf.shopee.sg/file/e53f927d4927f19a578d6e89d450ed08'
        },
    ])

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderAllProduct = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('productDetail',
                { item }
            )}
                style={{
                    backgroundColor: '#fff',
                    width: screen.width * 8 / 17.5,
                    borderRadius: 5,
                }}>
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
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 13, paddingBottom: 2 }} numberOfLines={2}>
                            Premium birdnest drink
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={1}>
                            Bird's nest new product for health
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            paddingVertical: 5,
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
            <MainHeader
                title={'All Product'}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
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
                renderItem={_renderAllProduct}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default AllProduct

const styles = StyleSheet.create({})

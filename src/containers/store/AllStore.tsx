import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
const screen = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style, { ICON_COLOR } from '../../styles/index'
import MainHeader from '../../custom_items/MainHeader';

const AllStore = () => {
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

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderAllStore = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('storeDetail',
                { item }
            )}
                style={{
                    backgroundColor: '#fff',
                    width: screen.width * 3 / 10,
                    borderRadius: 5,
                }}>
                <View style={{
                    margin: 5
                }}>
                    <Image style={{
                        height: 80,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: item.image }}
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
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        bottom: 0,
                        left: 0,
                        borderTopRightRadius: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        fontSize: 12,
                    }} numberOfLines={2}>Pro Brid Shop</Text>
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
                itemDimension={95}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                    marginBottom: -5
                }}
                renderItem={_renderAllStore}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default AllStore

const styles = StyleSheet.create({})

import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import { makeid } from '../../functions/PTFunction';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles';


const Wishlish = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const client = useSelector((state: { client: any }) => state.client);
    const products = useSelector((state: { products: any }) => state.products);

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const getWishlish = async () => {
        setTimeout(() => {

        }, 200);
    }

    React.useEffect(() => {
        getWishlish();
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [client.items.favorite_product.length])

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const _renderCurrentProject = ({ item, index }: any) => {
        const _product = products.filter((r: { id: any; }) => r.id == item.id)[0]
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('ProductDetail',
                { item: _product })}
                style={[style.orderHistoryContainer, {
                    marginBottom: index == _product.length - 1 ? 10 : 0,
                }]}>

                <FastImage style={{
                    height: 120,
                    width: 120,
                    borderRadius: 10,
                    margin: 5,
                    backgroundColor: '#ddd'
                }}
                    source={{ uri: _product.items.product_info.photos[0].photo_url }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <Col style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: 10,
                }}>
                    <Col style={{

                    }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }} numberOfLines={1}>
                            {_product.items.product_info.product_name}
                        </Text>
                        {_product.items.product_info.product_code != 0 ? (
                            <Text style={{ fontWeight: 'bold', fontSize: 13 }} numberOfLines={1}>
                                {'#' + _product.items.product_info.product_code}
                            </Text>
                        ) : null}

                        <Text style={{ fontSize: 13, color: '#aaa' }} numberOfLines={2}>
                            {_product.items.product_info.product_description}
                        </Text>
                    </Col>
                    <View>
                        <NumberFormat
                            value={_product.items.product_info.units[0].price}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={{
                                    fontSize: 15,
                                    color: PRICE_COLOR,
                                    fontWeight: 'bold'
                                }}
                                    numberOfLines={1}
                                >{"$ " + value}
                                </Text>} />
                    </View>
                </Col>
            </TouchableOpacity>

        )
    }

    const noItem = () => {
        return (
            <View style={style.cartImageContainer}>
                <Image style={{
                    height: 200,
                    width: 200,
                }}
                    source={require('../../images/empty-cart-rappi.png')}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{ opacity: 0.5 }}>Order Empty</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title="Wishlish"
                leftIcon={leftIcon()}
            />
            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                : (
                    <>
                        {client.items.favorite_product.length === 0 ? noItem() : (
                            <FlatList
                                style={{ marginBottom: 10, marginHorizontal: 10 }}
                                listKey={makeid()}
                                renderItem={_renderCurrentProject}
                                data={client.items.favorite_product}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={4}
                                maxToRenderPerBatch={8}
                                windowSize={10}
                                onEndReachedThreshold={0.8}
                            />
                        )}
                    </>
                )
            }

        </SafeAreaView>
    )
}

export default Wishlish;

const styles = StyleSheet.create({})

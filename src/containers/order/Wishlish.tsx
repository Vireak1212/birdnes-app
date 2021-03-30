import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles';


const Wishlish = () => {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const client = useSelector((state: { client: any }) => state.client);
    const products = useSelector((state: { products: any }) => state.products);

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
                    marginBottom: index == data.length - 1 ? 10 : 0,
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



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <MainHeader
                title="Wishlish"
                leftIcon={leftIcon()}
            />
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
        </SafeAreaView>
    )
}

export default Wishlish;

const styles = StyleSheet.create({})

import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';
import NumberFormat from 'react-number-format';


const screen = Dimensions.get('screen')

const ProductItems = (props: any) => {
    const { products, title } = props.route.params;
    const style = useSelector((state: { style: any }) => state.style)
    const navigate = useNavigation();

    const [isLoading, setIsLoading] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, [])

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>


    const _spacialProduct = ({ item, index }: any) => {
        const _product = item.items;
        return (
            <View key={index} style={style.productItemContainer}>
                <TouchableWithoutFeedback onPress={() => navigate.navigate('ProductDetail',
                    { item }
                )}>
                    <View style={{ margin: 5 }}>
                        <FastImage style={{
                            height: 150,
                            width: '100%',
                            borderRadius: 5,
                        }}
                            source={{ uri: _product.product_info.photos[0].photo_url }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Col style={{ paddingTop: 10 }}>
                            <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                                {_product.product_info.product_name}
                            </Text>
                            <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                                {_product.product_info.product_description}
                            </Text>

                            <NumberFormat
                                value={_product.product_info.units[0].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                prefix={''}
                                renderText={value =>
                                    <Text style={style.productItemPrice}
                                        numberOfLines={1}
                                    >{"$ " + value}
                                    </Text>} />
                        </Col>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={title}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
            <FlatGrid
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                listKey={makeid()}
                itemDimension={130}
                initialNumToRender={4}
                maxToRenderPerBatch={8}
                windowSize={8}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                }}
                renderItem={_spacialProduct}
                data={products}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default ProductItems

const styles = StyleSheet.create({})

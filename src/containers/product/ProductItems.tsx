import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';


const screen = Dimensions.get('screen')

const ProductItems = (props: any) => {
    const { title } = props.route.params;
    const products = useSelector((state: { products: any }) => state.products);
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
            <TouchableOpacity key={index} onPress={() => navigate.navigate('ProductDetail',
                { item }
            )}
                style={styles.allProductContainer}>
                <View style={{
                    margin: 5
                }}>
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
                        <Text style={styles.allProductPrice}
                            numberOfLines={1}>
                            {'$' + _product.product_info.units[0].price}
                        </Text>
                    </Col>
                </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
    allProductPrice: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    allProductContainer: {
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

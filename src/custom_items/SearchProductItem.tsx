import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import NumberFormat from 'react-number-format';
import { PRICE_COLOR } from '../styles';


const screen = Dimensions.get('screen')

const SearchProductItem = (props: any) => {
    const { data, item, index } = props;

    const navigate = useNavigation();
    return (
        <View key={index} style={styles.allProductContainer}>
            <TouchableWithoutFeedback
                onPress={() => navigate.navigate('ProductDetail',
                    { item }
                )}>
                <View style={{ margin: 5 }}>
                    <FastImage style={{
                        height: 150,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: data.product_info.photos[0].photo_url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Col style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                            {data.product_info.product_name}
                        </Text>
                        <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                            {data.product_info.product_description}
                        </Text>

                        <NumberFormat
                            value={data.product_info.units[0].price}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={''}
                            renderText={value =>
                                <Text style={styles.allProductPrice}
                                    numberOfLines={1}
                                >{"$ " + value}
                                </Text>} />
                    </Col>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default SearchProductItem

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

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
const screen = Dimensions.get('screen')

const Category = () => {
    const navigate = useNavigation();

    const [data, setData] = useState([
        {
            id: 1,
            product_name: 'Birtnest Drink',
            image: 'https://farm8.staticflickr.com/7542/16227459701_f0568dd128_o.jpg'
        },
        {
            id: 2,
            product_name: 'Birtnest Meat',
            image: 'https://chinatown.co.uk/wp-content/uploads/2017/01/birds-nest-soup.jpg'
        },
        {
            id: 3,
            product_name: 'Birtnest Soup',
            image: 'https://i1.wp.com/primebirdsnest.com/wp-content/uploads/2018/09/FB_IMG_1514486502296-e1536375734968.jpg?fit=719%2C500&ssl=1'
        },
        {
            id: 4,
            product_name: 'Birtnest Peckage',
            image: 'https://www.yuxiangyan.com/wp-content/uploads/2015/05/bnestbottled.jpg'
        },
    ])

    const _renderCategory = ({ item, index }: any) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('productCategory')}>
                <Image style={{
                    height: 100,
                    width: screen.width * 3 / 10,
                    borderRadius: 5,
                }}
                    source={{ uri: item.image }}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={styles.categoryName} numberOfLines={2}>
                    {item.product_name}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.categoryContainer}>
                <Text>Category</Text>
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
                renderItem={_renderCategory}
                data={data}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default Category

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingVertical: 10,
        paddingLeft: 10,
    },
    categoryName: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: 'rgba(60, 60, 60, 0.3)',
        bottom: 0,
        left: 0,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 12,
    },
})

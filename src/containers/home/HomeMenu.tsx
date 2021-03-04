import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { makeid } from '../../functions/PTFunction';
const size = Dimensions.get('screen');

const HomeMenu = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Category',
            image: require('../../images/icon/list.png'),
            color: '#FF7051'
        },
        {
            id: 2,
            name: 'Stores',
            image: require('../../images/icon/store.png'),
            color: '#874cfe'
        },
        {
            id: 3,
            name: 'Special',
            image: require('../../images/icon/medal.png'),
            color: '#0194fe'
        },
        {
            id: 3,
            name: 'Collection',
            image: require('../../images/icon/data-collection.png'),
            color: '#63bb05'
        },
    ])

    const _renderMenu = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={[styles.categoryCard,
                {
                    backgroundColor: '#fff',
                    marginLeft: index === 0 ? 10 : 5,
                    marginRight: item.length - 1 == index ? 10 : 5,
                }
                ]}>
                <View style={{
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image key={index} source={item.image}
                        style={{
                            width: 30,
                            height: 30,
                        }}>

                    </Image>
                    <Text style={styles.Menutext}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                listKey={makeid()}
                renderItem={_renderMenu}
            />
        </SafeAreaView>
    )
}

export default HomeMenu

const styles = StyleSheet.create({
    categoryCard: {
        width: size.width / 4.55,
        borderRadius: 10,
        marginTop: 5,
    },
    Menutext: {
        fontSize: 12,
    },
})

import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { makeid } from '../../functions/PTFunction';
const size = Dimensions.get('screen');

const HomeMenu = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Category',
            image: 'https://cdn.iconscout.com/icon/free/png-512/sport-game-batsman-cricket-player-bat-ball-pad-gloves-helmet-29296.png',
            color: '#FF7051'
        },
        {
            id: 2,
            name: 'Stores',
            image: 'https://cdn.iconscout.com/icon/free/png-512/sport-game-batsman-cricket-player-bat-ball-pad-gloves-helmet-29296.png',
            color: '#874cfe'
        },
        {
            id: 3,
            name: 'Special',
            image: 'https://cdn.iconscout.com/icon/free/png-512/sport-game-batsman-cricket-player-bat-ball-pad-gloves-helmet-29296.png',
            color: '#0194fe'
        },
        {
            id: 3,
            name: 'Collection',
            image: 'https://cdn.iconscout.com/icon/free/png-512/sport-game-batsman-cricket-player-bat-ball-pad-gloves-helmet-29296.png',
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
                    <Image key={index} source={{ uri: item.image }}
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

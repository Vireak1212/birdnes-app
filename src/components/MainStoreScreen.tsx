import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../functions/PTFunction';
const screen = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style, { ICON_COLOR, MAIN_COLOR } from '../styles/index'
import MainHeader from '../custom_items/MainHeader';
import { useSelector } from 'react-redux';

const MainStoreScreen = () => {
    const store = useSelector((state: { store: any }) => state.store);
    const navigate = useNavigation();

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [store.length])

    const _renderMainStore = ({ item, index }: any) => {
        const _AllStore = item.items;
        return (
            <TouchableOpacity key={index} onPress={() => navigate.navigate('StoreDetail',
                { item }
            )}
                style={styles.mainStoreContainer}>
                <View style={{
                    margin: 3
                }}>
                    <Image style={{
                        height: 80,
                        width: '100%',
                        borderRadius: 5,
                    }}
                        source={{ uri: _AllStore.store_cover }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />

                    <Text style={styles.mainStoreName} numberOfLines={2}>
                        {_AllStore.store_name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'All Store'}
            />
            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                : (
                    <FlatGrid
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        listKey={makeid()}
                        itemDimension={100}
                        style={{
                            height: 'auto',
                            width: '100%',
                            borderRadius: 10,
                            marginBottom: -5
                        }}
                        renderItem={_renderMainStore}
                        data={store}
                    // data={color.slice(0, (Math.floor((width / 80)) * 2))}
                    />
                )}

        </SafeAreaView>
    )
}

export default MainStoreScreen

const styles = StyleSheet.create({
    mainStoreName: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: 'rgba(60, 60, 60, 0.3)',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 12,
    },
    mainStoreContainer: {
        backgroundColor: '#fff',
        width: screen.width * 3 / 10,
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

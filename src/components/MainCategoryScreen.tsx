import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Category from '../containers/category/Category';
import HotCategory from '../containers/category/HotCategory';
import MainHeader from '../custom_items/MainHeader';
import { makeid } from '../functions/PTFunction';
import style, { PRICE_COLOR } from '../styles/index';

const MainCategoryScreen = (props: any) => {
    const navigate = useNavigation();
    const [filter, setIndex] = useState(0)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Category'}
            // leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
            <View style={styles.categoryButtonContainer}>
                {filter == 0 ? (
                    <Button onPress={() => setIndex(0)}
                        style={styles.categoryButton}>
                        <Text>PRIME</Text>
                    </Button>
                ) : (
                        <Button onPress={() => setIndex(0)}
                            style={[styles.categoryButton, { borderColor: '#fff' }]}>
                            <Text>PRIME</Text>
                        </Button>
                    )}

                {filter == 1 ? (
                    <Button onPress={() => setIndex(1)}
                        style={[styles.categoryButton, { marginLeft: 15 }]}>
                        <Text>GOLDEN NEST</Text>
                    </Button>
                ) : (
                        <Button onPress={() => setIndex(1)}
                            style={[styles.categoryButton, { marginLeft: 15, borderColor: '#fff' }]}>
                            <Text>GOLDEN NEST</Text>
                        </Button>
                    )}
            </View>

            <FlatList
                removeClippedSubviews={Platform.OS == 'ios' ? true : false}
                showsVerticalScrollIndicator={false}
                // disableVirtualization={true}
                data={[1]}
                listKey={makeid()}
                ListEmptyComponent={null}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                renderItem={({ item, index }: any) => {
                    return (
                        <>
                            {filter == 0 ? (
                                <HotCategory />
                            ) : (
                                    null
                                )}

                            <Category />
                        </>
                    )
                }}
            />

        </SafeAreaView>
    )
}

export default MainCategoryScreen

const styles = StyleSheet.create({
    categoryButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 35,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1
    },
    categoryButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
})

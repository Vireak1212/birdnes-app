import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Platform, Dimensions, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Category from '../containers/category/Category';
import HotCategory from '../containers/category/HotCategory';
import MainHeader from '../custom_items/MainHeader';
import { makeid } from '../functions/PTFunction';
import style, { PRICE_COLOR } from '../styles/index';
import { FlatGrid } from 'react-native-super-grid';
import { MAIN_COLOR } from '../styles/index';
const screen = Dimensions.get('screen')

const MainCategoryScreen = (props: any) => {
    const navigate = useNavigation();
    const [mainCategoryId, setMainCategoryId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [backState, setBackState] = useState<any>([])
    const categories = useSelector((state: { categories: any }) => state.categories);
    const [mainCategories, setMainCategories] = useState<any>([])
    const [subCategories, setSubCategories] = useState<any>([])

    useEffect(() => {
        if (categories.length > 0) {
            setMainCategories(categories.filter((r: any) => r.items.parent_id === ''))
        }
    }, [categories.length])

    useEffect(() => {
        if (mainCategories.length > 0) {
            setMainCategoryId(mainCategories[0].id)
        }
    }, [mainCategories.length])

    useEffect(() => {
        if (categoryId != "") {
            if (backState.length > 0) {
                let _subCategory = []
                _subCategory.push({
                    id: makeid(),
                    items: []
                })
                _subCategory.push(...categories.filter((r: any) => r.items.parent_id === categoryId))
                setSubCategories(_subCategory)
            }
            else
                setSubCategories(categories.filter((r: any) => r.items.parent_id === categoryId))

        }
    }, [categoryId])

    useEffect(() => {
        if (backState.length == 0) {
            setSubCategories(categories.filter((r: any) => r.items.parent_id === mainCategoryId))
            setCategoryId('');
        }
    }, [backState.length])

    useEffect(() => {
        if (categories.length > 0) {
            setSubCategories(categories.filter((r: any) => r.items.parent_id === mainCategoryId))
        }
    }, [mainCategoryId])

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    const onCategoryPress = (item: any) => {
        setMainCategoryId(item.id)
        setBackState([]);
    }

    const _renderItemMainCategory = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => {
                onCategoryPress(item)
            }}
                style={[styles.categoryButton, {
                    marginLeft: index == 0 ? 10 : 0,
                    marginRight: 10,
                    backgroundColor: mainCategoryId === item.id ? '#ddd' : '#f6f6f6',

                }]}>
                <Text style={{ fontWeight: 'bold', color: MAIN_COLOR }}>{item.items.category_name}</Text>
            </TouchableOpacity>
        )
    }

    const onSubCategoryPress = (item: any) => {
        let _backState = backState;
        _backState.push(item.id);
        setBackState(_backState)
        setCategoryId(item.id)
    }

    const onBackCategory = () => {
        if (backState.length > 0) {
            let _backState = backState;
            _backState.length = backState.length - 1;
            setBackState(_backState)
            setCategoryId(_backState[backState.length - 1])
        }
    }

    const _renderCategory = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => {
                if (item.items.length != 0)
                    onSubCategoryPress(item)
                else
                    onBackCategory()
            }}
                style={{
                    height: 100,
                    borderRadius: 5,
                    width: screen.width * 3 / 10,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                {/* {item.items.icon === "" ? (
                    <View style={{
                        height: 20,
                        width: 20,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}>

                    </View>
                ) : null} */}
                {item.items.length !== 0 ? (
                    <Image style={{
                        height: 50,
                        width: 50,
                    }}
                        source={require('../images/icon/birdsnest.png')} />
                ) : null}

                <Text>
                    {item.items.length == 0 ? <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="arrow-back-ios" size={25} style={{ color: MAIN_COLOR }} />
                        <Text>Back</Text>
                    </View>

                        : item.items.category_name}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Category'}
            // leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
            {mainCategories.length > 0 &&
                <View style={styles.categoryButtonContainer}>
                    <FlatList
                        horizontal
                        removeClippedSubviews={Platform.OS == 'ios' ? false : true}
                        showsHorizontalScrollIndicator={false}
                        // disableVirtualization={true}
                        data={mainCategories}
                        listKey={makeid()}
                        ListEmptyComponent={null}
                        keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                        renderItem={_renderItemMainCategory}
                    />
                </View>
            }

            <FlatGrid
                removeClippedSubviews={Platform.OS == 'ios' ? false : true}
                showsVerticalScrollIndicator={false}
                itemDimension={95}
                data={subCategories.sort(function (a: any, b: any) {
                    return b.items.length - a.items.length
                })}
                listKey={makeid()}
                ListEmptyComponent={null}
                keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                renderItem={_renderCategory}

            />

        </SafeAreaView>
    )
}

export default MainCategoryScreen

const styles = StyleSheet.create({
    categoryButton: {
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryButtonContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
})

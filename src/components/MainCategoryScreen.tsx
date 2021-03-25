import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Platform, Dimensions, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../custom_items/MainHeader';
import { makeid } from '../functions/PTFunction';
import { FlatGrid } from 'react-native-super-grid';
import { MAIN_COLOR } from '../styles/index';
import FastImage from 'react-native-fast-image';
import { loadProductByCategory } from '../actions/Product';
const screen = Dimensions.get('screen')


let tempCategoryId = '';
const MainCategoryScreen = (props: any) => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const style = useSelector((state: { style: any }) => state.style);

    const [mainCategoryId, setMainCategoryId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [backState, setBackState] = useState<any>([])
    const categories = useSelector((state: { categories: any }) => state.categories);
    const product_category = useSelector((state: { product_category: any }) => state.product_category);
    const [mainCategories, setMainCategories] = useState<any>([])
    const [subCategories, setSubCategories] = useState<any>([])

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [categories.length])

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

    useEffect(() => {
        if (tempCategoryId !== '') {
            if (product_category.length == 0) {
                let _backState = backState;
                _backState.push(tempCategoryId);
                setBackState(_backState)
                setCategoryId(tempCategoryId)
            }
            else {
                let category = subCategories.filter((r: any) => r.id === tempCategoryId);
                navigate.navigate('ProductItem',
                    {
                        title: category[0].items.category_name,
                        products: product_category
                    })
            }
        }
    }, [product_category])


    const onCategoryPress = (item: any) => {
        setMainCategoryId(item.id)
        setBackState([]);
    }

    const _renderItemMainCategory = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => {
                onCategoryPress(item)
            }}
                style={[style.categoryButton, {
                    marginLeft: index == 0 ? 10 : 0,
                    marginRight: 10,
                    backgroundColor: mainCategoryId === item.id ? '#ddd' : '#f6f6f6',

                }]}>
                <Text style={{ fontWeight: 'bold', color: MAIN_COLOR }}>{item.items.category_name}</Text>
            </TouchableOpacity>
        )
    }

    const onSubCategoryPress = (item: any) => {
        dispatch(loadProductByCategory(item.id));
        tempCategoryId = item.id;
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
                style={style.categoryItemContainer}>
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
            />
            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                : (<>
                    {mainCategories.length > 0 &&
                        <View style={style.mainCategoryContainer}>
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
                </>)}

        </SafeAreaView>
    )
}

export default MainCategoryScreen

const styles = StyleSheet.create({})

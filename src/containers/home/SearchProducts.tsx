import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { Col, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { makeid } from '../../functions/PTFunction';
import SearchProductItem from '../../custom_items/SearchProductItem';
import { FlatGrid } from 'react-native-super-grid';
import Feather from 'react-native-vector-icons/Feather';
import { MAIN_COLOR } from '../../styles/index';

let timeOut: any = null;
let searchRef: any = null;
const { width } = Dimensions.get('window')

const SearchProducts = () => {
    const navigate = useNavigation();
    const style = useSelector((state: any) => state.style)

    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false)

    const onTextChange = async (text: any) => {
        setIsLoading(true)
        setLastDoc(null)
        setHasScrolled(false)
        setSearchData([])
        searchAutoComplete(text);
    }

    const searchAutoComplete = (text: any) => {
        if (timeOut) {
            clearTimeout(timeOut)
        }
        if (text === '') {
            setSearchData([])
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
        else {
            timeOut = setTimeout(async () => {
                searchRef = await firestore().collection('products')
                    .where('status', '==', true)
                    .where('product_info.product_tags', 'array-contains', text.toLocaleLowerCase())
                getSearch()
            }, 1000);
        }
    }

    const getSearch = async () => {
        const snapshot: any = await searchRef.orderBy('product_info.product_name', 'asc').limit(15).get();
        if (!snapshot.empty) {
            let newSearchData: any = [];

            for (let i = 0; i < snapshot.docs.length; i++) {
                newSearchData.push({
                    id: snapshot.docs[i].id,
                    items: snapshot.docs[i].data(),
                });
            }
            setSearchData(newSearchData);
        } else {
            setLastDoc(null);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }


    const getMore = async () => {
        if (!hasScrolled) return null;
        if (lastDoc) {
            setIsMoreLoading(true);
            setTimeout(async () => {
                let snapshot = await searchRef.orderBy('product_info.product_name', 'asc').startAfter(lastDoc).limit(15).get();

                if (!snapshot.empty) {
                    let newSearchData: any = searchData;
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

                    for (let i = 0; i < snapshot.docs.length; i++) {
                        newSearchData.push({
                            id: snapshot.docs[i].id,
                            items: snapshot.docs[i].data(),
                        });
                    }
                    setSearchData(newSearchData);
                    if (snapshot.docs.length < 15) setLastDoc(null);
                } else {
                    setLastDoc(null);
                }

                setIsMoreLoading(false);
            }, 200);
        }
    }

    const renderFooter: any = () => {
        if (!isMoreLoading) return true;
        return (
            <ActivityIndicator
                size={25}
                color={MAIN_COLOR}
                style={{ marginVertical: 10 }}
            />
        )
    }

    const _onScroll = () => {
        if (!hasScrolled)
            setHasScrolled(true)
    }

    const _renderSearch = ({ item, index }: any) => {
        let data = item.items;
        return (
            <SearchProductItem data={data} item={item} index={index} />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.searchArea}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={25} style={{ paddingLeft: 15, color: '#fff', paddingRight: 5 }} />
                </TouchableOpacity>
                <Col>
                    <Row style={styles.searchProductContainer}>
                        <MaterialIcons name='search' size={25} color='#C0C0C0' style={{ position: 'absolute', left: 10, }} />
                        <TextInput
                            style={{ paddingLeft: 40, height: 50, width: '100%' }}
                            placeholder='What are you looking for?'
                            onChangeText={onTextChange}
                        >
                        </TextInput>
                    </Row>
                </Col>
            </View>
            {isLoading ? <ActivityIndicator
                size={25}
                color={MAIN_COLOR}
                style={{ marginVertical: 20 }}
            /> : searchData.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Feather name='folder' size={40} color='#ddd' />
                    <Text style={{
                        fontSize: 18,
                        color: '#ddd',
                        marginTop: 10
                    }}>No Data</Text>
                </View>
            ) : (
                <FlatGrid
                    data={searchData}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    listKey={makeid()}
                    itemDimension={130}
                    initialNumToRender={4}
                    maxToRenderPerBatch={8}
                    windowSize={8}
                    keyExtractor={(item: any, index: { toString: () => any; }) => index.toString()}
                    renderItem={_renderSearch}
                    ListFooterComponent={renderFooter}
                    onTouchMove={_onScroll}
                    onEndReached={() => {
                        if (!isMoreLoading) {
                            getMore()
                        }
                    }}
                    onEndReachedThreshold={0.01}
                />
            )}

        </SafeAreaView>
    )
}

export default SearchProducts

const styles = StyleSheet.create({
    listItem: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    listItemText: {
        fontSize: 18
    },
    searchProductContainer: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 10,
        marginRight: 15,
    },
    searchArea: {
        backgroundColor: '#224889',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
})

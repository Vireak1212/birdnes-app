import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { makeid } from '../../functions/PTFunction';
import style, { PRICE_COLOR } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';


const screen = Dimensions.get('screen')

const AllProduct = () => {
    const products = useSelector((state: { products: any }) => state.products);
    const style = useSelector((state: { style: any }) => state.style)
    const navigate = useNavigation();

    const scrollRef = React.createRef<any>();

    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false)
    const [isScroll, setIsScroll] = useState(false)
    const [onScroll, setOnScroll] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [lastDoc, setLastDoc] = useState<any>(0);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, [])

    const getProduct = async () => {
        setIsLoading(true);
        setLastDoc(8)
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }

    const onScrollItem = (value: any) => {
        if (!onScroll)
            if (value > 250) {
                setIsScroll(true)
            }
            else {
                setIsScroll(false)
            }
    }

    const onRefresh = () => {
        setTimeout(() => {
            getProduct();
        }, 200);
    }

    const _onScroll = () => {
        if (!hasScrolled)
            setHasScrolled(true)
    }

    const getMore = async () => {
        if (!hasScrolled) return null;
        if (lastDoc) {
            setIsMoreLoading(true);
            setTimeout(async () => {
                setLastDoc((last: number) => last + 8);
                if (products.length < lastDoc) {
                    setLastDoc(null);
                }
                setTimeout(() => {
                    setIsMoreLoading(false);
                }, products.length < lastDoc ? 0 : 300);
            }, 200);
        }
    }

    const renderFooter: any = () => {
        return (
            <ActivityIndicator
                size={25}
                color={'#7a1a22'}
                style={{ marginBottom: 10 }}
            />
        )
    }

    const _renderAllProduct = ({ item, index }: any) => {
        const _AllProduct = item.items;
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
                            source={{ uri: _AllProduct.product_info.photos[0].photo_url }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Col style={{ paddingTop: 10 }}>
                            <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                                {_AllProduct.product_info.product_name}
                            </Text>
                            <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                                {_AllProduct.product_info.product_description}
                            </Text>
                            <Text style={styles.allProductPrice}
                                numberOfLines={1}>
                                {'$' + _AllProduct.product_info.units[0].price}
                            </Text>
                        </Col>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                paddingTop: 5,
                paddingHorizontal: 12,
                paddingBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>All Product</Text>
            </View>

            <FlatGrid
                ref={scrollRef}
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
                    marginBottom: -10,
                    marginTop: -10
                }}
                renderItem={_renderAllProduct}
                data={products}

                ListFooterComponent={
                    <>{isMoreLoading && lastDoc !== null &&
                        renderFooter()}
                    </>
                }

                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={(e) => onScrollItem(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={250}
                onTouchMove={_onScroll}
                onEndReached={() => {
                    if (!isMoreLoading) {
                        getMore()
                    }
                }}
                onEndReachedThreshold={0.01}
            // data={color.slice(0, (Math.floor((width / 80)) * 2))}
            />
        </SafeAreaView>
    )
}

export default AllProduct

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

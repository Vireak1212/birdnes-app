import { useNavigation } from '@react-navigation/native';
import { Col } from 'native-base';
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TouchableWithoutFeedback, ActivityIndicator, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { MAIN_COLOR, PRICE_COLOR } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../custom_items/MainHeader';
import NumberFormat from 'react-number-format';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const screen = Dimensions.get('screen')

const ProductItems = (props: any) => {
    const { products, title } = props.route.params;
    const style = useSelector((state: { style: any }) => state.style)
    const navigate = useNavigation();
    const scrollRef = React.createRef<any>();

    const [isScroll, setIsScroll] = useState(false)
    const [lastDoc, setLastDoc] = useState<any>(0);

    const [onScroll, setOnScroll] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [hasScrolled, setHasScrolled] = useState(false)

    React.useEffect(() => {
        getProduct();
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [products.length])

    const getProduct = async () => {
        setIsLoading(true);
        setLastDoc(8)
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }

    const getMore = async () => {
        if (!hasScrolled) return null;
        if (lastDoc) {
            setIsMoreLoading(true);
            setTimeout(async () => {
                setLastDoc((last: number) => last + 10);
                if (products.length < lastDoc) {
                    setLastDoc(null);
                }
                setTimeout(() => {
                    setIsMoreLoading(false);
                }, products.length < lastDoc ? 0 : 300);
            }, 200);
        }
    }

    const onRefresh = () => {
        setTimeout(() => {
            getProduct();
        }, 200);
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

    const _onScroll = () => {
        if (!hasScrolled)
            setHasScrolled(true)
    }

    const onScrollToTop = () => {
        if (scrollRef.current !== null) {
            scrollRef.current.scrollToOffset({
                animated: true,
                offset: 0
            })
            setIsScroll(false)
            setOnScroll(true)
            setTimeout(() => {
                setOnScroll(false)
            }, 500);
        }
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

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>


    const _spacialProduct = ({ item, index }: any) => {
        const _product = item.items;
        return (
            <View key={index} style={style.productItemContainer}>
                <TouchableWithoutFeedback onPress={() => navigate.navigate('ProductDetail',
                    { item }
                )}>
                    <View style={{ margin: 5 }}>
                        <FastImage style={{
                            height: 150,
                            width: '100%',
                            borderRadius: 5,
                        }}
                            source={{ uri: _product.product_info.photos[0].photo_url }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Col style={{ paddingTop: 10 }}>
                            <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                                {_product.product_info.product_name}
                            </Text>
                            <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                                {_product.product_info.product_description}
                            </Text>

                            <NumberFormat
                                value={_product.product_info.units[0].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                prefix={''}
                                renderText={value =>
                                    <Text style={style.productItemPrice}
                                        numberOfLines={1}
                                    >{"$ " + value}
                                    </Text>} />
                        </Col>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={title}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />

            {isScroll ?
                <TouchableOpacity
                    onPress={() => {
                        onScrollToTop()
                    }}
                    style={{
                        width: 35,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        zIndex: 10,
                        position: 'absolute',
                        bottom: 50,
                        right: 95,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        backgroundColor: '#fff'
                    }}
                >
                    <FontAwesome name='angle-up' size={20}></FontAwesome>
                </TouchableOpacity>
                : null}

            {isInitialLoad ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                : (
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
                        }}
                        renderItem={_spacialProduct}
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
                )}

        </SafeAreaView>
    )
}

export default ProductItems

const styles = StyleSheet.create({})

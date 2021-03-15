import React, { useState } from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper'
import { useSelector } from 'react-redux';
const size = Dimensions.get('screen');

const ProductSlide = () => {
    const slide_shows = useSelector((state: { slide_shows: any }) => state.slide_shows);
    return (
        <View style={styles.carouselArea}>
            <Swiper style={styles.wrapper}
                horizontal
                autoplay={true}
                showsButtons={false}
                dotStyle={{ height: 0 }}
                activeDotStyle={{ height: 0 }}
                removeClippedSubviews={Platform.OS === 'ios' ? false : true}>
                {
                    slide_shows.map((item: any, index: any) => {
                        return (
                            <View key={index} style={styles.slide1}>
                                <FastImage style={styles.slideImage}
                                    source={{ uri: item.items.photo_url }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        )
                    })
                }
            </Swiper>

        </View>
    )
}

export default ProductSlide

const styles = StyleSheet.create({
    carouselArea: {
        height: size.width / 1.8,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    slideImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,

    }
})

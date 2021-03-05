import React, { useState } from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { useSelector } from 'react-redux';
const size = Dimensions.get('screen');

const ProductSlide = () => {
    const slides = useSelector((state: { slides: any }) => state.slides);
    return (
        <View style={styles.carouselArea}>
            <Swiper style={styles.wrapper}
                autoplay
                showsButtons={false}
                removeClippedSubviews={Platform.OS === 'ios' ? true : false}>
                {
                    slides.map((item: any, index: any) => {
                        return (
                            <View key={index} style={styles.slide1}>
                                <Image source={{ uri: item.items.fileUrl }} style={styles.slideImage} />
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

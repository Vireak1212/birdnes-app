import React, { useState } from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
const size = Dimensions.get('screen');

const ProductSlide = () => {
    const [data, setData] = useState([
        { id: 1, image: 'https://digitalagencynetwork.com/wp-content/uploads/2018/11/brilliant-nike-campaigns.png' },
        { id: 2, image: 'https://w3-lab.com/wp-content/uploads/2019/10/nike-and-cocacola-emotins-1024x640.jpg' },
        { id: 3, image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1549616344492/adidas-coupons.jpg' }
    ])
    return (
        <View style={styles.carouselArea}>
            <Swiper style={styles.wrapper} autoplay showsButtons={false} removeClippedSubviews={Platform.OS === 'ios' ? true : false}>
                {
                    data.map((item: any, index: any) => {
                        return (
                            <View key={index} style={styles.slide1}>
                                <Image source={{ uri: item.image }} style={styles.image} />
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
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,

    }
})

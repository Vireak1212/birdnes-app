import React, { useState } from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
const size = Dimensions.get('screen');

const ProductSlide = () => {
    const [data, setData] = useState([
        { id: 1, image: 'https://4.bp.blogspot.com/-YA7suKTSmfo/XErkj-QkuGI/AAAAAAAAu-4/vy_gY2tO9uEW9QiVyZ2TiSRdPQwC8fiuACLcBGAs/s1600/Screenshot_20190125-182627%257E2.png' },
        { id: 2, image: 'https://premium-birdsnest.com/wp-content/uploads/2020/06/premium-bird-nest.png' },
        { id: 3, image: 'https://www.euyansang.com.my/on/demandware.static/-/Sites-EYS_Master_Catalog/en_MY/dw567866dc/Zoom/eysmy_955616010557_600x600.jpg' },
        { id: 3, image: 'https://www.euyansang.com.my/on/demandware.static/-/Sites-EYS_Master_Catalog/en_MY/dw9b7e9f5c/Zoom/eysmy_955616010206-5_600x600.jpg' },
        { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt7Q8reSUzkzt0mgODmlqsObgo3jCR6s7pg&usqp=CAU' }
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

import { Col } from 'native-base';
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import ImageViewer from '../../custom_package/custom_package/react-native-image-zoom-viewer';


const ImageView = (props: any) => {

    const { leftViewImageIcon, galleries, index } = props;
    const style = useSelector((state: { style: any }) => state.style)
    const [images, setImages] = useState<any>([])
    const [currentIndex, setCurrentIndex] = useState(index)

    React.useEffect(() => {
        let images_: any = []
        galleries.map((photo: any, index: any) => {
            images_.push({ url: photo.photo_url })
            if (galleries.length - 1 === index) {
                setImages(images_)
            }
        })
    }, [galleries.length])


    const leftIcon = () => <TouchableOpacity
        style={{
            width: 55,
            alignItems: 'center',
        }}
        onPress={() => {
            leftViewImageIcon()
        }}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>;


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#000'
        }}>
            <View style={styles.imageViewHeader}>
                <Col style={{ width: '15%', alignItems: 'center' }}>
                    {leftIcon()}
                </Col>
                <Col style={{ width: '57%' }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                    </View>
                </Col>
            </View >

            {images.length === 0 ? null : (
                <ImageViewer
                    index={currentIndex}
                    style={{
                        backgroundColor: '#000'
                    }}
                    imageUrls={images}
                    renderImage={(image) => {
                        return (
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={{ height: ' 100%', width: '100%' }}
                                source={{ uri: image.source.uri }}></FastImage>
                        )
                    }}
                    enablePreload={true}
                    saveToLocalByLongPress={false}
                    onChange={(index: any) => {
                        setTimeout(() => {
                            setCurrentIndex(index)
                        }, 100);
                    }}
                    loadingRender={() => <ActivityIndicator size={30} color='#fff' />}


                />
            )}

        </View>
    )
}

export default ImageView

const styles = StyleSheet.create({
    imageViewHeader: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1, flexDirection: 'row',
        height: 50,
        width: '100%',
        alignItems: 'center'
    },
})

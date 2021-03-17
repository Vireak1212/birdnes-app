// import { Col } from 'native-base'
// import React from 'react'
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { useSelector } from 'react-redux'
// import MainHeader from '../../custom_items/MainHeader'

// const OrderSuccessful = () => {
//     const style = useSelector((state: { style: any }) => state.style)
//     return (
//         <SafeAreaView style={{ flex: 1 }}>

//             <MainHeader
//                 title={'Cart'}


//             /> :

//             <View style={style.checkOutContainer}>
//                 <Col>
//                     <Text style={{ fontSize: 16, opacity: 0.5 }}>Total</Text>
//                     <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$007</Text>
//                 </Col>
//                 <TouchableOpacity
//                     style={style.styleCHACKOUT}>
//                     <Text style={{ color: '#fff' }}>CHEACKOUT</Text>
//                     <AntDesign name='playcircleo' size={20}
//                         style={{ color: '#fff', marginLeft: 10 }} color='#000' />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }


// export default OrderSuccessful

// const styles = StyleSheet.create({

// })

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

const OrderSuccessful = () => {
    const style = useSelector((state: { style: any }) => state.style)
    return (
        <View style={{ flex: 1 }}>
            <View style={style.cartImageContainer}>

                <Image style={{
                    height: 300,
                    width: 200,
                }}
                    source={require('../../images/icon/capture.png')}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={{ fontSize: 25, marginTop: 20 }}>Order Successful</Text>
            </View>
        </View>
    )
}

export default OrderSuccessful

const styles = StyleSheet.create({})


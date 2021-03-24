import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Linking, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import style, { ICON_COLOR, MAIN_COLOR } from '../../styles/index'
import MainHeader from '../../custom_items/MainHeader';
import { Col, Row } from 'native-base';
import StarRating from 'react-native-star-rating';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';


const StoreDetail = (props: any) => {
    const { item } = props.route.params;
    const store_name = item.items.store_name;
    const navigate = useNavigation();
    const addToFavorite = () => {
        setIsFavorite(value => !value)
    }
    const [isFavorite, setIsFavorite] = useState(false)

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <MainHeader
                title={store_name}
                leftIcon={leftIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{}}>
                    <FastImage style={{
                        height: 220,
                        width: '100%'
                    }}
                        source={{ uri: item.items.store_cover }}
                        resizeMode={FastImage.resizeMode.cover}

                    />
                </View>
                <View style={{
                    paddingHorizontal: 15,
                    padding: 15,
                    backgroundColor: '#eee'
                }}>

                    <Col>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#000'
                        }}>{store_name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginVertical: 5, color: '#000' }}>
                            ESSENTIALS | GLOCERY STORE</Text>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>

                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={3}
                                fullStarColor="gold"
                                starSize={20}
                                containerStyle={{ width: 80 }}
                            />

                            <Text style={{ marginLeft: 30, color: '#000' }}>32 Reviews</Text>
                        </View>
                    </Col>

                </View>

                <Row style={styles.borderstyle}>
                    <TouchableOpacity onPress={() => navigate.navigate('Map')}>
                        <Entypo name="location-pin" size={25} style={{
                            color: '#c96116', marginLeft: 10
                        }} />
                    </TouchableOpacity>

                    <Text style={styles.styletext}>5d St 149, Phnom Penh, Cambodia</Text>
                </Row>
                <Row style={styles.borderstyle}>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:010522777`) }}>
                        <Feather name="phone-call" size={25} style={{
                            color: '#c96116', marginLeft: 10
                        }} />
                    </TouchableOpacity>

                    <Text style={styles.styletext}>010 522 777</Text>
                </Row>
                <Row style={styles.borderstyle}>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com')}>
                        <Entypo name="mail" size={25} style={{
                            color: '#c96116', marginLeft: 10
                        }} />
                    </TouchableOpacity>

                    <Text style={styles.styletext}>siengtanglim@gmail.com</Text>
                </Row>
                <Row style={styles.borderstyle}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Coming Soon')
                    }}>
                        <AntDesign name="clockcircle" size={25} style={{
                            color: '#c96116', marginLeft: 10
                        }} />
                    </TouchableOpacity>

                    <Text style={styles.styletext}>02:20 PM - 09:20PM</Text>
                </Row>
                <Row style={styles.borderstyle}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Coming Soon')
                    }}>
                        <AntDesign name="carryout" size={25} style={{
                            color: '#c96116', marginLeft: 10
                        }} />
                    </TouchableOpacity>

                    <Text style={styles.styletext}>Service ATM</Text>
                </Row>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoreDetail

const styles = StyleSheet.create({
    borderstyle: {
        height: 60,
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.3,
        width: '100%'
    },
    styletext: {
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Battambang-Regular'
    },
    Imagestyle: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginLeft: 10
    },
})

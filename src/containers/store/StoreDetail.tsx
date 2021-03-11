import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import style, { ICON_COLOR, MAIN_COLOR } from '../../styles/index'
import MainHeader from '../../custom_items/MainHeader';
import { ScrollableTab, Tab, Tabs } from 'native-base';
import StoreIteam from './StoreIteam';

const product = [
    {
        product_type: 'Product',
        price: '3.5'
    },
    {
        product_type: 'Spacial',
        price: '2.5'
    },
    {
        product_type: 'Collection',
        price: '1.5'
    },
    {
        product_type: 'Info',
        price: '1.5'
    },

]

const StoreDetail = (props: any) => {
    const { item } = props.route.params;
    const store_name = item.items.store_name;
    const navigate = useNavigation();

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <MainHeader
                title={store_name}
                leftIcon={leftIcon()}
            // rightIcon={rightIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image style={{
                        height: 250,
                        width: '100%'
                    }}
                        source={{ uri: item.items.store_cover }}
                        resizeMode='cover'
                        resizeMethod='resize'
                    />
                </View>

                <Tabs renderTabBar={() => (
                    <ScrollableTab
                        underlineStyle={{ height: 0, }}
                        style={{ alignItems: 'center', height: 60 }}
                        backgroundColor="#fff"
                    />
                )}>
                    {product.map((item: any, index: any) => {
                        const data = item.items;
                        return (
                            <Tab
                                key={index}
                                activeTabStyle={styles.activeTabUPS}
                                tabStyle={styles.tabUPS}
                                textStyle={styles.textUPS}
                                activeTextStyle={styles.activeTextUPS}
                                heading={item.product_type}>
                                <StoreIteam />
                            </Tab>
                        )
                    })}
                </Tabs>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoreDetail

const styles = StyleSheet.create({
    activeTabUPS: {
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    tabUPS: {
        backgroundColor: '#fff',
        borderRadius: 20
    },
    activeTextUPS: {
        color: MAIN_COLOR,
        fontWeight: 'bold',
    },
    textUPS: {
        color: '#bbb',
        fontWeight: 'bold',
    },
})

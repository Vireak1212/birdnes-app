import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { makeid } from '../../functions/PTFunction';
import { PRICE_COLOR } from '../../styles';
import AllProduct from '../product/AllProduct';
const screen = Dimensions.get('screen')

const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
];

const HomeSearch = () => {
    const navigate = useNavigation();
    const products = useSelector((state: { products: any }) => state.products);

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = React.useState([]);

    React.useEffect(() => {
        const results: any = people.filter(person =>
            person.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(results);
    }, [search]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.searchArea}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={25} style={{ paddingLeft: 15, color: '#fff', paddingRight: 5 }} />
                </TouchableOpacity>
                <Col>
                    <Row style={styles.searchProductContainer}>
                        <MaterialIcons name='search' size={25} color='#C0C0C0' style={{ position: 'absolute', left: 10, }} />
                        <TextInput
                            style={{ paddingLeft: 40, height: 50, width: '100%' }}
                            placeholder='What are you looking for?'
                            onChangeText={(text) => setSearch(text)}
                            value={search}
                        ></TextInput>

                    </Row>
                </Col>
            </View>
            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
                <AllProduct />
            </View>

            {/* <FlatGrid
                data={products}
                listKey={makeid()}
                itemDimension={130}
                keyExtractor={item => item.id}
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                }}
                renderItem={({ item, index }) => (
                    <View >
                        <TouchableOpacity key={index} onPress={() => navigate.navigate('productDetail',
                            { item }
                        )}
                            style={{
                                backgroundColor: '#fff',
                                width: screen.width * 8 / 17.5,
                                borderRadius: 5,
                            }}>
                            <View style={{
                                margin: 5
                            }}>
                                <Image style={{
                                    height: 150,
                                    width: '100%',
                                    borderRadius: 5,
                                }}
                                    source={{ uri: item.items.cover }}
                                    resizeMode='cover'
                                    resizeMethod='resize'
                                />
                                <Col style={{ paddingTop: 10 }}>
                                    <Text style={{ fontSize: 15, paddingBottom: 2 }} numberOfLines={2}>
                                        {item.items.name}
                                    </Text>
                                    <Text style={{ fontSize: 11, color: '#aaa' }} numberOfLines={2}>
                                        {item.items.description}
                                    </Text>
                                    <Text style={{
                                        fontSize: 15,
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: PRICE_COLOR
                                    }}
                                        numberOfLines={1}>
                                        {'$' + item.items.price}
                                    </Text>
                                </Col>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            /> */}
        </SafeAreaView>
    )
}

export default HomeSearch

const styles = StyleSheet.create({
    listItem: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    listItemText: {
        fontSize: 18
    },
    searchProductContainer: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 10,
        marginRight: 15,
    },
    searchArea: {
        backgroundColor: '#224889',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
})

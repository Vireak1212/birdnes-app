import { useNavigation } from '@react-navigation/native';
import { Col, Row } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
                            style={{ paddingLeft: 40, height: 50, }}
                            placeholder='What are you looking for?'
                            onChangeText={(text) => setSearch(text)}
                            value={search}
                        ></TextInput>

                    </Row>
                </Col>
            </View>
            <View>
                {searchResults.map(item => (
                    <Text>{item}</Text>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default HomeSearch

const styles = StyleSheet.create({
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

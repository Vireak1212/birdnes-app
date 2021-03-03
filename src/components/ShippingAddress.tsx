import { Button, Row } from 'native-base';
import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ShippingAddress = () => {

    return (

        <View style={{ flex: 1 }}>


            <ScrollView >

                <View style={{ marginHorizontal: 30, marginTop: 30 }}>
                    <Text style={{ fontSize: 30 }}>ShippingAddress</Text>
                    <Text style={{ color: '#224889' }}>Make change to your Shipping information</Text>
                    <Text style={{ marginTop: 50, opacity: 0.5 }}>Shipping Address</Text>
                    <View style={styles.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            placeholder="Shipping Address"
                        />
                    </View>


                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <Button
                        // onPress={() => onSave()}
                        full rounded style={{ marginTop: 25, borderRadius: 10, backgroundColor: '#224889', width: '100%' }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Update</Text>
                        </Row>
                    </Button>
                </View>
            </ScrollView>
        </View>


    );
}


export default ShippingAddress;
const styles = StyleSheet.create({
    styleform: {
        backgroundColor: '#e6e7e8',
        height: 150,
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center'
    }
})
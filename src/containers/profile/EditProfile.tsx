import { useNavigation } from '@react-navigation/native';
import { Button, Row } from 'native-base';
import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';
import style, { ICON_COLOR, PRICE_COLOR } from '../../styles/index'

const EditProfile = () => {
    const navigate = useNavigation();
    const style = useSelector((state: { style: any }) => state.style)
    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader
                title={'Update Profile'}
                leftIcon={leftIcon()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 30, marginTop: 30 }}>
                    <Text style={{ fontSize: 30 }}>Update Profile</Text>
                    <Text style={{ color: '#224889' }}>
                        Make change to your personal information</Text>
                    <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            placeholder="First name"
                        />
                    </View>

                    <View style={style.styleform}>

                        <Row style={{ alignItems: 'center' }}>

                            <View style={style.lastNamestyle}>
                                <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                                    placeholder="Last name"
                                />
                            </View>
                        </Row>

                    </View>
                    <View style={style.styleform}>
                        <TextInput style={{ fontSize: 15, marginHorizontal: 10 }}
                            placeholder="Email"
                        />
                    </View>


                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <Button
                        // onPress={() => onSave()}
                        full rounded style={style.ButtonUpdate}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Update</Text>
                        </Row>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default EditProfile;
const styles = StyleSheet.create({})
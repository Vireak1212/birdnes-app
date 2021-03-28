import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'native-base';
import { MAIN_COLOR, MAIN_BACKGROUND } from '../styles/index';

const NoInternetScreen = () => {
    const style = useSelector((state: { style: any }) => state.style);
    const dispatch = useDispatch();

    const checkConnection = () => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                dispatch({ type: 'LOAD_NO_CONNECTION', value: false })
            }
        });
        unsubscribe();
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: MAIN_BACKGROUND
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MaterialIcons name="portable-wifi-off" size={100} color={MAIN_COLOR} />

                <Text style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: MAIN_COLOR
                }}>
                    No Internet Connection!
                </Text>
                <Text style={{
                    marginTop: 10,
                    color: MAIN_COLOR,
                    fontWeight: 'bold',
                    fontSize: 16
                }}>
                    Please check your internet
                </Text>

                <View style={{ width: '80%', marginTop: 20 }}>
                    <Button
                        onPress={() => checkConnection()}
                        style={{
                            height: 40,
                            width: '100%',
                            backgroundColor: MAIN_COLOR,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#FFF',
                            fontSize: 16,
                        }}>
                            Reload
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NoInternetScreen

const styles = StyleSheet.create({})

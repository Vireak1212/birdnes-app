import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/core'
import { Toast } from 'native-base'
import React, { MutableRefObject, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Geocoder from 'react-native-geocoding'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Ripple from 'react-native-material-ripple'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { updateClient } from '../actions/Client'
import { MAIN_COLOR } from '../styles'
import { markers } from '../temp_data/mapData';


const MapScreen = (props: any) => {
    const { isCheckOut } = props.route.params;
    console.log(isCheckOut)
    let geocoder: any = Geocoder;
    const client = useSelector((state: { client: any }) => state.client);
    const navigate = useNavigation();
    const _map = React.useRef<MapView>(null) as MutableRefObject<MapView>;
    const dispatch = useDispatch()

    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [location, setLocation] = useState('')
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    let latitudeDelta = 0.05864195044303443
    let longitudeDelta = 0.050142817690068

    useEffect(() => {
        checkPermission()
        geocoder.init('AIzaSyAvS2iFRe5sQdvJBZL4hKzZ54NI5RsdyTk')
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 200);
    }, [client.length])

    React.useEffect(() => {
        if (lat !== 0) {
            getCurrentMap();
        }
    }, [lat])



    const checkPermission = () => {
        request(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_ALWAYS
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        )
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        getCurrentLocation();
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLat(latitude)
                setLong(longitude)
                getLocationGeocoding(latitude, longitude)
                //getLocationGeocoding(position.coords.latitude, position.coords.longitude)
            }, (error) => console.log(error),
            // { timeout: 300, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 2000, useSignificantChanges: true }
            Platform.OS == "android" ? {} : { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        )
    }

    const getCurrentMap = () => {
        if (_map.current !== undefined && _map.current !== null) {
            _map.current.animateToRegion(
                {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                },
                350,
            );
            getLocationGeocoding(lat, long)
        }
    }
    const getLocationGeocoding = (lat: any, long: any) => {
        geocoder.from(lat, long)
            .then((json: { results: { address_components: any[]; }[]; }) => {
                var addressComponent: any = json.results[0];
                setLocation(addressComponent.formatted_address);
            })
            .catch((error: any) => console.warn(error));
    }

    const backIcon = () => {
        return (
            <Ripple
                onPress={() => navigate.goBack()}
                style={{
                    height: 40,
                    width: 40,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 10,
                    left: 15,
                }}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={25}
                    color="#000"
                />
            </Ripple>
        )
    }

    const onSave = () => {
        if (client.length !== 0) {
            let shipping_address = client.items.shipping_address;
            shipping_address.push(location)
            client.items.shipping_address = shipping_address;
            dispatch(updateClient(client.id, client.items))
            Toast.show({
                text: "Your location has been add",
                type: 'success',
                duration: 2000
            })
            {
                isCheckOut !== false ? (
                    navigate.navigate('CheckOut',
                        {
                            current_address: location
                        })
                ) :
                    navigate.navigate('ShippingAdress',
                        {
                            current_address: location
                        })
            }

        } else {
            Alert.alert('Please login your account!')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isInitialLoad || lat == 0 ?
                <ActivityIndicator style={{
                    marginTop: 20
                }} size={35} color={MAIN_COLOR} />
                : (<>
                    <MapView
                        ref={_map}
                        showsCompass={false}
                        showsMyLocationButton={false}
                        initialRegion={{
                            latitude: lat,
                            longitude: long,
                            latitudeDelta,
                            longitudeDelta
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}>
                        <Marker
                            draggable
                            onDragEnd={(value) => {
                                setLat(value.nativeEvent.coordinate.latitude)
                                setLong(value.nativeEvent.coordinate.longitude)
                            }}
                            coordinate={{
                                latitude: lat,
                                longitude: long,
                            }}
                        >

                        </Marker>
                    </MapView>

                    <View style={styles.locationHeader}>
                        <Text>My Location</Text>
                        <Text style={{ padding: 10 }}>{location}</Text>
                    </View>

                    {backIcon()}

                    <TouchableOpacity
                        onPress={() => getCurrentLocation()}
                        style={styles.locationButton}>
                        <MaterialIcons
                            size={20}
                            name="my-location"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSave()}
                        style={styles.saveLocationButton}>
                        <Text style={{ color: '#fff' }}>Save</Text>
                    </TouchableOpacity>
                </>
                )}

        </SafeAreaView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    locationHeader: {
        height: 100,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 100,
        right: 25
    },
    saveLocationButton: {
        height: 50,
        width: '100%',
        position: 'absolute',
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
    }
})
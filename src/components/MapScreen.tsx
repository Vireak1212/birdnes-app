import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/core'
import { Toast } from 'native-base'
import React, { MutableRefObject, useEffect, useState } from 'react'
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Geocoder from 'react-native-geocoding'
import MapView, { Marker } from 'react-native-maps'
import Ripple from 'react-native-material-ripple'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { MAIN_COLOR } from '../styles'


const MapScreen = () => {
    let geocoder: any = Geocoder;
    const _map = React.useRef<MapView>(null) as MutableRefObject<MapView>;

    const user = useSelector((state: any) => state.user)

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [location, setLocation] = useState('')
    // const [location, setLocation] = useState(user.items.client_info.shipping_address)

    const navigate = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        checkPermission()
        geocoder.init('AIzaSyAvS2iFRe5sQdvJBZL4hKzZ54NI5RsdyTk')
    }, [])

    const initialMapState = {
        region: {
            latitude: 11.5775383,
            longitude: 104.9049579,
            latitudeDelta: 0.05864195044303443,
            longitudeDelta: 0.050142817690068,
        },
    };

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
        if (_map.current !== undefined && _map.current !== null) {
            Geolocation.getCurrentPosition(
                (position) => {

                    setLat(position.coords.latitude)
                    setLng(position.coords.longitude)

                    _map.current.animateToRegion(
                        {
                            ...position.coords,
                            latitudeDelta: initialMapState.region.latitudeDelta,
                            longitudeDelta: initialMapState.region.longitudeDelta,
                        },
                        350,
                    );
                    //getLocationGeocoding(position.coords.latitude, position.coords.longitude)
                }, (error) => console.log(error),
                // { timeout: 300, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 2000, useSignificantChanges: true }
                Platform.OS == "android" ? {} : { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
            )

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
                    left: 20
                }}>
                <AntDesign
                    name="arrowleft"
                    size={25}
                    color="#000"
                />
            </Ripple>
        )
    }

    // const onSave = () => {
    //     if (user.length !== 0) {
    //         user.items.client_info.shipping_address = location
    //         dispatch(updateUser(user.id, user.items))
    //         Toast.show({
    //             text: "Your information has been updated",
    //             type: 'success',
    //             duration: 2000
    //         })
    //         navigate.goBack()
    //     } else {
    //         Alert.alert('Please login your account!')
    //     }
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                ref={_map}
                showsCompass={false}
                showsUserLocation
                style={{ flex: 1 }}>
                <Marker
                    draggable
                    onDragEnd={(value) => {
                        setLat(value.nativeEvent.coordinate.latitude)
                        setLng(value.nativeEvent.coordinate.longitude)
                        getLocationGeocoding(lat, lng)
                    }}
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}
                >

                </Marker>
            </MapView>
            <View style={{
                height: 100,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255,0.8)',
                position: 'absolute',
                top: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>My Location</Text>
                <Text>{location}</Text>
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
                // onPress={() => onSave()}
                style={styles.button}>
                <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
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
    button: {
        height: 50,
        width: '100%',
        position: 'absolute',
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
    }
})
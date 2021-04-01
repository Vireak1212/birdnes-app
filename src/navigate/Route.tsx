import React, { Dispatch } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Root, Toast } from 'native-base';
import style, { MAIN_COLOR } from '../styles/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../functions/LoadData';
import MainStoreScreen from '../components/MainStoreScreen';

import HomeScreen from '../components/HomeScreen';
import MainCategoryScreen from '../components/MainCategoryScreen';
import MainCartScreen from '../components/MainCartScreen';

import ProductDetail from '../containers/product/ProductDetail';
import StoreDetail from '../containers/store/StoreDetail';
import AllProduct from '../containers/product/AllProduct';

import EditProfile from './../containers/profile/EditProfile';
import ProfileScreen from '../components/ProfileScreen';
import ShippingAddress from '../containers/profile/ShippingAddress';

import LoginScreen from '../components/auth/LoginScreen';
import OrderHistory from '../containers/order/OrderHistory';
import Wishlish from '../containers/order/Wishlish';
import ProductItems from '../containers/product/ProductItems';
import VerifyScreen from '../components/auth/VerifyScreen';
import CheakoutScreen from '../containers/order/CheakoutScreen';
import MapScreen from './../components/MapScreen';
import OrderSuccessful from './../containers/product/OrderSuccessful';
import OrderDetail from '../containers/order/OrderDetail';
import SearchProducts from '../containers/home/SearchProducts';
import UpdateScreen from '../components/UpdateScreen';
import NoInternetScreen from '../components/NoInternetScreen';
import LoadingScreen from '../components/LoadingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import NetInfo from "@react-native-community/netinfo";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import { Platform } from 'react-native';
import ReviewDetail from '../containers/review/ReviewDetail';

enableScreens();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


let inter: any;
const Route = () => {
  const no_connection = useSelector(
    (state: { no_connection: any }) => state.no_connection,
  );

  async function loadStyle(dispatch: Dispatch<any>) {
    dispatch({ type: 'LOAD_STYLES', style });
  }
  const dispatch = useDispatch()

  React.useEffect(() => {
    loadStyle(dispatch)
    loadData(dispatch)

    //check internet
    clearInterval(inter)
    inter = setInterval(() => {
      const unsubscribe = NetInfo.addEventListener((state: { isConnected: any; }) => {
        if (!state.isConnected) {
          dispatch({ type: 'LOAD_NO_CONNECTION', value: true });
        }
      });
      unsubscribe();
    }, 1000);
    if (no_connection) {
      clearInterval(inter);
    }
  }, [auth().currentUser, no_connection]);


  React.useEffect(() => {
    if (auth().currentUser) {
      _updateClient();
    }
    else {
      signInWithEmailAndPassword()
    }
  }, [])

  async function signInWithEmailAndPassword() {
    await auth()
      .signInWithEmailAndPassword('hel.sreyet2014b@gmail.com', 'Ph$arTech#2020')
      .then(async () => {
        loadData(dispatch, false)
      })
      .catch(async (error: any) => {
        console.log(error);
        Toast.show({
          text: "System has problem!",
          type: 'danger',
          duration: 2000,
        });
      });
  }
  const registerForNotification = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };
  const requestForNotificationPermission = async () => {
    const granted = await messaging().requestPermission();
    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
  };
  const _updateClient = async () => {
    let record = await firestore()
      .collection('clients')
      .where('uid', '==', auth().currentUser?.uid)
      .get();
    if (record.docs.length === 0) {
      signInWithEmailAndPassword()
    } else {
      refreshToken(record.docs[0])
    }
  };
  const refreshToken = async (item: any) => {
    const check = await messaging().isDeviceRegisteredForRemoteMessages;
    if (Platform.OS === 'ios' || !check) {
      await registerForNotification();
    }
    await requestForNotificationPermission();
    loadData(dispatch, false)
  };

  function MainStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          stackAnimation: 'fade'
        }}>
        <Stack.Screen name="Home" component={LoadingScreen} />
        <Stack.Screen name="MainHome" component={MainTab} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />

        <Stack.Screen name="Order" component={OrderHistory} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="Favorite" component={Wishlish} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ShippingAdress" component={ShippingAddress} />

        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="CheckOut" component={CheakoutScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="StoreDetail" component={StoreDetail} />
        <Stack.Screen name="Successful" component={OrderSuccessful} />
        <Stack.Screen name="SearchProduct" component={SearchProducts} />
        <Stack.Screen name="AllStore" component={MainStoreScreen} />
        <Stack.Screen name="AllProduct" component={AllProduct} />
        <Stack.Screen name="ProductItem" component={ProductItems} />
        <Stack.Screen name="CartDetail" component={MainCartScreen} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetail} />

      </Stack.Navigator>
    );
  }
  function MainTab() {
    const customTabBarStyle = {
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: Colors.tabIconDefault,
      allowFontScaling: true,
      labelStyle: { fontSize: 12, marginBottom: 5 },
      tabStyle: { marginTop: 5 },
      style: { height: 50 }
    }

    return (
      <Tab.Navigator tabBarOptions={customTabBarStyle}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={
            {
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={22} />
              ),
            }}
        />
        <Tab.Screen
          name="Category"
          component={MainCategoryScreen}
          options={
            {
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="format-list-bulleted" color={color} size={25} />
              ),
            }}
        />
        <Tab.Screen
          name="Store"
          component={MainStoreScreen}
          options={
            {
              tabBarIcon: ({ color }) => (
                <Fontisto name="shopping-store" color={color} size={20} />
              ),
            }}
        />

        <Tab.Screen
          name="Cart"
          component={MainCartScreen}
          options={
            {
              tabBarIcon: ({ color }) => (
                <Fontisto name="shopping-basket-add" color={color} size={22} />
              ),
            }}
        />
        <Tab.Screen
          name="Account"
          component={ProfileScreen}
          options={
            {
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle" color={color} size={22} />
              ),
            }}
        />

      </Tab.Navigator>
    );
  }

  return (
    <Root>
      <SafeAreaProvider>
        <NavigationContainer>
          {no_connection ? <NoInternetScreen /> : (
            <MainStack />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </Root>
  );
}
export default Route;


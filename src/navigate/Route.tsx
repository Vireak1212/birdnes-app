import React, { Dispatch } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Root } from 'native-base';
import style, { MAIN_COLOR } from '../styles/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDispatch } from 'react-redux';
import { loadData } from '../functions/LoadData';
import MainStoreScreen from '../components/MainStoreScreen';

import HomeScreen from '../components/HomeScreen';
import MainCategoryScreen from '../components/MainCategoryScreen';
import MainCartScreen from '../components/MainCartScreen';
import ProductDetail from '../containers/product/ProductDetail';
import StoreDetail from '../containers/store/StoreDetail';
import AllProduct from '../containers/product/AllProduct';
import HomeSearch from '../containers/home/HomeSearch';

import EditProfile from './../containers/profile/EditProfile';
import ProfileScreen from '../components/ProfileScreen';
import ShippingAddress from '../containers/profile/ShippingAddress';

import LoginScreen from '../login/LoginScreen';
<<<<<<< HEAD
import ProductOfCategory from '../containers/category/ProductOfCategory';
=======
import OrderHistory from '../containers/order/OrderHistory';
import Wishlish from '../containers/order/Wishlish';
>>>>>>> f37f8a929909029293dd7bdf2811088a91964b4a


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
  async function loadStyle(dispatch: Dispatch<any>) {
    dispatch({ type: 'LOAD_STYLES', style });
  }
  const dispatch = useDispatch()
  React.useEffect(() => {
    loadStyle(dispatch)
    loadData(dispatch)
  }, []);

  function MainStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Tab" component={MainTab} />
        <Stack.Screen name="login" component={LoginScreen} />
<<<<<<< HEAD

=======
        <Stack.Screen name="order" component={OrderHistory} />
        <Stack.Screen name="favorite" component={Wishlish} />
>>>>>>> f37f8a929909029293dd7bdf2811088a91964b4a
        <Stack.Screen name="editProfile" component={EditProfile} />
        <Stack.Screen name="shippingAdress" component={ShippingAddress} />

        <Stack.Screen name="productDetail" component={ProductDetail} />
        <Stack.Screen name="storeDetail" component={StoreDetail} />

        <Stack.Screen name="allStore" component={MainStoreScreen} />
        <Stack.Screen name="allProduct" component={AllProduct} />

        <Stack.Screen name="homeSearch" component={HomeSearch} />
        <Stack.Screen name="productCategory" component={ProductOfCategory} />
      </Stack.Navigator>
    );
  }
  function MainTab() {
    const customTabBarStyle = {
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: Colors.tabIconDefault,
      allowFontScaling: true,
      labelStyle: { fontSize: 12, },
      tabStyle: { marginVertical: 5 }
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
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <MainStack />
      </NavigationContainer>
    </Root>
  );
}
export default Route;


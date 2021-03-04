import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Root } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../components/HomeScreen';
import MainCategoryScreen from '../components/MainCategoryScreen';
import MainCartScreen from '../components/MainCartScreen';
import ProductDetail from '../containers/product/ProductDetail';
import StoreDetail from '../containers/store/StoreDetail';
import AllStore from '../containers/store/AllStore';
import AllProduct from '../containers/product/AllProduct';
import HomeSearch from '../containers/home/HomeSearch';

import EditProfile from './../containers/profile/EditProfile';
import ProfileScreen from '../components/ProfileScreen';
import ShippingAddress from '../containers/profile/ShippingAddress';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {

  function MainStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Tab" component={MainTab} />
        <Stack.Screen name="editProfile" component={EditProfile} />
        <Stack.Screen name="shippingAdress" component={ShippingAddress} />
        <Stack.Screen name="productDetail" component={ProductDetail} />
        <Stack.Screen name="storeDetail" component={StoreDetail} />
        <Stack.Screen name="allStore" component={AllStore} />
        <Stack.Screen name="allProduct" component={AllProduct} />
        <Stack.Screen name="homeSearch" component={HomeSearch} />
      </Stack.Navigator>
    );
  }
  function MainTab() {
    const customTabBarStyle = {
      activeTintColor: '#4C60EE',
      inactiveTintColor: Colors.tabIconDefault,
      allowFontScaling: true,
      labelStyle: { fontSize: 12, marginBottom: 5 },
      tabStyle: { marginTop: 5 }
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
                <Ionicons name="list" color={color} size={25} />
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


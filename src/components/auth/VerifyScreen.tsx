import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 60 },
  cell: {
    backgroundColor: '#eee',
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#eee',
    textAlign: 'center',
    flexDirection: 'row'
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;

const VerifyScreen = () => {
  const navigate = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const style = useSelector((state: { style: any }) => state.style)
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  return (
    <SafeAreaView style={styles.root}>

      <TouchableOpacity onPress={() => navigate.goBack()}
        style={{
          height: 60,
          width: 70,
          paddingLeft: 15,
          justifyContent: 'center',
        }}>
        <MaterialIcons name="arrow-back-ios" size={25} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../../images/icon/security-otp.jpg')}
          style={{
            height: 110,
            width: 100,
          }}></Image>
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      }}>
        <Text style={{ fontSize: 19 }}>វាយបញ្ចូលលេខកូដដែលយើងបានផ្ញើទៅកាន់</Text>
        <Text style={{ fontSize: 19 }}>លេខទូរស័េព្ទរបស់លោកអ្នក</Text>
      </View>

      <View style={{ padding: 20 }}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
      }}>
        <Text style={{ opacity: 0.5 }}>code expires in: </Text>
        <Text style={{ color: 'red' }}> 00:45</Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyScreen;

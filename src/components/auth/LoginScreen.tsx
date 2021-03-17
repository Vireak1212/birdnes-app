import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
const LoginScreen = () => {
	const navigate = useNavigation();
	const style = useSelector((state: { style: any }) => state.style)
	return (
		<View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 }}>
			<View style={style.container}>
				<Text style={style.labelTitle}>Welcome to Bird's Nest Mart</Text>
				<Text style={style.subTextLabel}>Please enter your phone number to login</Text>
			</View>

			<View style={style.phoneInputContainer}>
				<View style={style.flagContainer}>
					<FastImage
						style={style.Img}
						source={{
							uri:
								'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/383px-Flag_of_Cambodia.svg.png'
						}}
					/>
					<AntDesign style={style.iconDropDown} name="caretdown" />
					<Text style={style.countryCode}>+855</Text>
				</View>
				<TextInput
					keyboardType="number-pad"
					style={style.input}
					placeholder="Enter phone number"
				/>
			</View>
			<View style={style.buttonContainer}>

				<Text style={style.textInstruction}>
					By continuing, you agree to accept our term and condition. Your data rates may apply.
						</Text>

				<TouchableOpacity style={style.arrowContinue}
					onPress={() => navigate.navigate('Comfirm')}
				>
					<AntDesign style={style.ArrowContinue} name="arrowright" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default LoginScreen
const styles = StyleSheet.create({

})

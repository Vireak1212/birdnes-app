// import { useNavigation } from '@react-navigation/native';
// import React from 'react'
// import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import FastImage from 'react-native-fast-image';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useSelector } from 'react-redux';
// const LoginScreen = () => {
// 	const navigate = useNavigation();
// 	const style = useSelector((state: { style: any }) => state.style)
// 	return (
// 		<View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 }}>
// 			<View style={style.container}>
// 				<Text style={style.labelTitle}>Welcome to Bird's Nest Mart</Text>
// 				<Text style={style.subTextLabel}>Please enter your phone number to login</Text>
// 			</View>

// 			<View style={style.phoneInputContainer}>
// 				<View style={style.flagContainer}>
// 					<FastImage
// 						style={style.Img}
// 						source={{
// 							uri:
// 								'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/383px-Flag_of_Cambodia.svg.png'
// 						}}
// 					/>
// 					<AntDesign style={style.iconDropDown} name="caretdown" />
// 					<Text style={style.countryCode}>+855</Text>
// 				</View>
// 				<TextInput
// 					keyboardType="number-pad"
// 					style={style.input}
// 					placeholder="Enter phone number"
// 				/>
// 			</View>
// 			<View style={style.buttonContainer}>

// 				<Text style={style.textInstruction}>
// 					By continuing, you agree to accept our term and condition. Your data rates may apply.
// 						</Text>

// 				<TouchableOpacity style={style.arrowContinue}
// 					onPress={() => navigate.navigate('Comfirm')}
// 				>
// 					<AntDesign style={style.ArrowContinue} name="arrowright" />
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	);
// }

// export default LoginScreen
// const styles = StyleSheet.create({

// })


import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MainHeader from '../../custom_items/MainHeader'
import style from '../../styles/index'

const LoginScreen = () => {
	const navigate = useNavigation()
	const [phoneNumber, setPhoneNumber] = useState('')
	const [confirmCode, setConfirmCode] = useState('')
	const [IsResend, setIsResend] = useState(false);
	const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
		onPress={() => navigate.goBack()}>
		<MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
	</TouchableOpacity>
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView>
				<MainHeader
					leftIcon={leftIcon()}
				/>
				<View style={style.signUpContainer}>

					<Image
						style={{ height: 200, width: 200 }}
						source={require('../../images/icon/logo2.png')}
					/>
					<View style={style.container}>
						<Text style={style.labelTitle}>Welcome to Bird's Nest Mart</Text>
						<Text style={style.subTextLabel}>Please enter your phone number to login</Text>
					</View>

					<View style={{
						marginHorizontal: 40,
					}}>
						<View style={style.singUpTextInputCoutainer}>
							<FastImage
								style={{ height: 20, width: 25, marginLeft: 10 }}
								source={{
									uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVpyjRC7oQS7Lng4WyLajLMt4EoLEIBcSkfetN_32WObW4kel3B-Ku8dNtKhxYqwHBoI&usqp=CAU'
								}}
								resizeMode={FastImage.resizeMode.cover}
							/>
							<TextInput
								editable={false}
								style={style.sintUpPhoneNumber}>
								+855
                            </TextInput>
							<View style={{ flexDirection: 'row', height: '100%', }}>
								<TextInput
									placeholder='Phone Number'
									onChangeText={(text) => { setPhoneNumber(text) }}
									value={phoneNumber}
									style={[style.forgotTextInput, { width: '63%' }]}
								/>
								<Button style={style.sentCodeButton} onPress={() => navigate.navigate('Comfirm')}>
									<Text style={style.sentCodeText}> {IsResend ? 'Resend' : 'Send'}</Text>
								</Button>
							</View>
						</View>

						<View style={style.singupTextContainer}>
							<Text style={style.singupText}>
								By continuing, you agree to accept our term and condition. Your data rates may apply.
                        </Text>
						</View>

					</View>
				</View>
			</ScrollView>
		</SafeAreaView >
	)
}

export default LoginScreen;

import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import style from '../../styles/index'

let interval: any;

const LoginScreen = () => {
	const navigate = useNavigation()
	const [phoneNumber, setPhoneNumber] = useState('')
	const phoneRef = React.createRef<TextInput>();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView>
				<View style={style.signUpContainer}>

					<Image
						style={{ height: 200, width: 200 }}
						source={require('../../images/icon/logo.png')}
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
								style={style.sintUpPhoneNumber}
							>
								+855
                            </TextInput>
							<View style={{ flexDirection: 'row', height: '100%', }}>
								<TextInput
									ref={phoneRef}
									placeholder='Phone Number'
									onChangeText={(text) => { setPhoneNumber(text) }}
									value={phoneNumber}
									keyboardType="number-pad"
									style={[style.forgotTextInput, { width: '63%' }]}
								/>
								<Button style={style.sentCodeButton} onPress={() => {
									if (phoneNumber.trim().length === 0 || phoneNumber.trim().length < 8) {
										if (phoneRef.current !== undefined && phoneRef.current !== null) {
											phoneRef.current.focus()
										}
										return;
									}
									let phone_number = phoneNumber;
									if (phone_number.charAt(0) === '0') {
										phone_number = phone_number.substring(1, phone_number.length);
									}
									navigate.navigate('Verify', {
										phone_number: '+855' + phone_number
									})
								}}>
									<Text style={style.sentCodeText}>Next</Text>
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
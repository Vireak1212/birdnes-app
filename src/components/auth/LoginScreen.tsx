
import { useNavigation } from '@react-navigation/native'
import { Button, Toast } from 'native-base'
import React, { useCallback, useState } from 'react'
import { Image, Linking, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import style from '../../styles/index'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let interval: any;

const OpenURLButton = ({ url }: any) => {
	const handlePress = useCallback(async () => {
		// Checking if the link is supported for links with custom URL scheme.
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			// Opening the link with some app, if the URL scheme is "http" the web link should be opened
			// by some browser in the mobile
			await Linking.openURL(url);
		} else {
			console.log(`Don't know how to open this URL: ${url}`);
		}
	}, [url]);
	return <TouchableOpacity onPress={handlePress}>
		<Text style={{ marginTop: 30, color: '#134287', fontWeight: 'bold', fontSize: 13, textDecorationLine: 'underline' }}>Term and Conditions.</Text>
	</TouchableOpacity>
}

const LoginScreen = () => {
	const navigate = useNavigation()
	const [phoneNumber, setPhoneNumber] = useState('')
	const [confirmCode, setConfirmCode] = useState('')
	const [IsResend, setIsResend] = useState(false);

	const phoneRef = React.createRef<TextInput>();
	const codeRef = React.createRef<TextInput>();
	const [verifiedID, setVerifiedID] = useState('');
	const [IsLoading, setIsLoading] = useState(false);
	const [DurationCode, setDurationCode] = useState<any | number | string>(60);

	function checkPhoneNumber() {
		if (phoneNumber === '') {
			if (phoneRef.current !== null && !phoneRef.current.isFocused())
				phoneRef.current.focus();
			return '';
		}
		let phone_number = phoneNumber;
		if (phone_number.charAt(0) === '0') {
			phone_number = phone_number.substring(1, phone_number.length);
		}
		return phone_number;
	}

	async function signInWithPhoneNumber(_phoneNumber: any, isResend = false) {
		if (checkPhoneNumber() === '') {
			return;
		}
		let record = await firestore()
			.collection('clients')
			.where('client_info.phone_number', '==', '+855' + checkPhoneNumber())
			.where('app_type', '==', 'User')
			.get();
		if (record.docs.length > 0) {
			Toast.show({
				text: 'This account already exists!',
				type: 'warning',
				duration: 4000,
			});
			return;
		}
		else {
			setIsLoading(true)
			await auth()
				.verifyPhoneNumber(_phoneNumber, isResend)
				.on('state_changed', async (phoneAuthSnapshot) => {
					setIsLoading(false)
					switch (phoneAuthSnapshot.state) {
						case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
							const { verificationId, code } = phoneAuthSnapshot;
							if (
								verificationId !== '' ||
								verificationId !== null ||
								verificationId !== undefined
							) {
								if (code !== null) {
									setConfirmCode(code)
									await _confirmCode(verificationId, code);
								}
							}
							break;

						case auth.PhoneAuthState.CODE_SENT: // or 'sent'
							setIsResend(true)
							setVerifiedID(phoneAuthSnapshot.verificationId);
							Toast.show({
								text: 'Code sent!',
								type: 'success',
								duration: 4000,
							});
							let count = 0;
							interval = setInterval(() => {
								if (count === 60) {
									clearInterval(interval);
								}
								setDurationCode((counter: number) => counter - 1);
								count = count + 1;
							}, 1000);
							break;
						case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
							break;
						case auth.PhoneAuthState.ERROR: // or 'error'
							break;
					}
				})
				.catch(async (error) => {
					if (error.code === 'auth/too-many-requests') {
						Toast.show({
							text: 'Too many requests!',
							type: 'warning',
							duration: 4000,
						});
					} else if (error.code === 'auth/invalid-phone-number') {
						Toast.show({
							text: 'Invalid phone number!',
							type: 'warning',
							duration: 1000,
						});
					} else if (error.code === 'auth/missing-phone-number') {
						Toast.show({
							text: 'Missing phone number!',
							type: 'warning',
							duration: 4000,
						});
					} else if (error.code === 'auth/quota-exceeded') {
						Toast.show({
							text: 'Quota exceeded!',
							type: 'warning',
							duration: 4000,
						});
					} else if (error.code === 'auth/operation-not-allowed') {
						Toast.show({
							text: 'Operation not allowed!',
							type: 'warning',
							duration: 4000,
						});
					} else if (error.code === 'auth/clients-disabled') {
						Toast.show({
							text: 'Client disabled!',
							type: 'warning',
							duration: 4000,
						});
					} else if (error.code === 'auth/retry-phone-auth') {
						Toast.show({
							text: 'Try again!',
							type: 'warning',
							duration: 4000,
						});
					} else {
						Toast.show({
							text: 'System was problem!',
							type: 'danger',
							duration: 4000,
						});
					}
					clearInterval(interval);
					if (auth().currentUser !== null) await auth().signOut();
					console.log(error);
				});
		}
	}

	async function _confirmCode(verificationId: any, code: any) {
		const provider = await auth.PhoneAuthProvider;
		const authCredential = await provider.credential(verificationId, code);
		signInWithPhoneAuthCredential(authCredential);
	}

	async function signInWithPhoneAuthCredential(
		credential: FirebaseAuthTypes.AuthCredential
	) {
		setIsLoading(true);
		await auth()
			.signInWithCredential(credential)
			.then((_client) => {
				clearInterval(interval)
				navigate.reset({
					index: 0,
					routes: [
						{
							name: 'SignUpPassword',
							params: {
								uid: _client,
								phone_number: '+855' + checkPhoneNumber().replace(' ', ''),
								is_update: false,
								id: ''
							}
						},
					],
				});
			})
			.catch(async (error) => {
				console.log(error);
				setIsLoading(false);
				if (error.code === 'auth/invalid-verification-code') {
					Toast.show({
						text: 'Code is invalid!',
						type: 'warning',
						duration: 2000,
					});
					return;
				} else if (error.code === 'auth/user-disabled') {
					Toast.show({
						text: 'User disabled!',
						type: 'warning',
						duration: 2000,
					});
				} else if (error.code === 'auth/invalid-verification-id') {
					Toast.show({
						text: 'Invalid verification!',
						type: 'warning',
						duration: 2000,
					});
				}
				else {
					Toast.show({
						text: 'System was problem!',
						type: 'danger',
						duration: 2000,
					});
				}
				clearInterval(interval);
				if (auth().currentUser !== null) await auth().signOut();
			});
	}

	function verifyCode() {
		if (checkPhoneNumber() === '') {
			phoneRef.current?.focus()
			return '';
		}
		else if (verifiedID === '') {
			Toast.show({
				text: 'Please send request code first!',
				type: 'warning',
				duration: 4000,
			});
			return;
		}
		else if (confirmCode.length !== 6) {
			codeRef.current?.focus()
			Toast.show({
				text: 'Please enter code!',
				type: 'warning',
				duration: 4000,
			});
			return;
		}
		else {
			_confirmCode(verifiedID, confirmCode);
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView>

				<TouchableOpacity onPress={() => navigate.goBack()}
					style={{
						height: 60,
						width: 70,
						paddingLeft: 15,
						justifyContent: 'center',
					}}>
					<MaterialIcons name="arrow-back-ios" size={25} />
				</TouchableOpacity>

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
									keyboardType="phone-pad"
									style={[style.forgotTextInput, { width: '63%' }]}
								/>
								{/* <Button style={style.sentCodeButton} onPress={() => navigate.navigate('Comfirm')}>
									<Text style={style.sentCodeText}> {IsResend ? 'Resend' : 'Send'}</Text>
								</Button> */}
								<Button
									disabled={DurationCode > 0 && DurationCode < 60}
									onPress={() => {
										if (DurationCode === 60 || IsResend) {
											setDurationCode(60)
											signInWithPhoneNumber("+855" + phoneNumber, IsResend)
										}
									}}
									style={[style.sentCodeButton, {
										backgroundColor: DurationCode > 0 && DurationCode < 60 ? '#999' : '#134287',
									}]}>
									<Text style={{ color: '#fff', fontWeight: 'bold' }}> {IsResend ? 'Resend' : 'Send'}</Text>
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
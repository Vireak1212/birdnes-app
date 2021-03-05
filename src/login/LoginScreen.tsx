// import * as React from 'react';
// import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
// import FastImage from 'react-native-fast-image';
// export interface AppProps {
// 	navigation: any;
// 	onLogin: any;
// 	process: boolean;
// }

// export interface AppState {
// 	phone: any;
// }

// export default class LoginScreen extends React.Component<AppProps, AppState> {
// 	constructor(props: AppProps) {
// 		super(props);
// 		this.state = { phone: '' };
// 	}

// 	_renderHeader = () => {
// 		return (
// 			<View style={{ backgroundColor: 'fff' }}>
// 				<View style={styles.container}>
// 					<Text style={styles.labelTitle}>Welcome to Bird's Nest Mart</Text>
// 					<Text style={styles.subTextLabel}>Please enter your phone number to login</Text>
// 				</View>
// 			</View>
// 		);
// 	};

// 	_renderBody = () => {
// 		const { phone } = this.state;

// 		return (
// 			<View style={{ marginHorizontal: 10 }}>
// 				<ScrollView>
// 					<View style={styles.phoneInputContainer}>
// 						<View style={styles.flagContainer}>
// 							<FastImage
// 								style={styles.Img}
// 								source={{
// 									uri:
// 										'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/383px-Flag_of_Cambodia.svg.png'
// 								}}
// 							/>
// 							<Icon style={styles.iconDropDown} name="caretdown" />
// 							<Text style={styles.countryCode}>+855</Text>
// 						</View>
// 						<TextInput
// 							value={phone}
// 							onChangeText={(phone: any) => this.setState({ phone: phone })}
// 							keyboardType="number-pad"
// 							style={styles.input}
// 							placeholder="Enter phone number"
// 						/>
// 					</View>
// 					<View style={styles.buttonContainer}>
// 						<View style={{}}>
// 							<Text style={styles.textInstruction}>
// 								By continuing, you agree to accept our term and condition. Your data rates may apply.
// 						</Text>
// 						</View>
// 						<TouchableOpacity onPress={() => this.props.onLogin(phone)} style={styles.arrowContinue}>
// 							{this.props.process ? (
// 								<ActivityIndicator color="#fff" />
// 							) : (
// 								<Icon style={styles.ArrowContinue} name="arrowright" />
// 							)}
// 						</TouchableOpacity>
// 					</View>
// 				</ScrollView>
// 			</View>
// 		);
// 	};

// 	public render() {
// 		return (
// 			<View style={{}}>
// 				<SafeAreaView style={{ backgroundColor: 'blue', }} />
// 				<KeyboardAvoidingView style={{}} behavior="padding" enabled>
// 					{this._renderHeader()}
// 					{this._renderBody()}
// 				</KeyboardAvoidingView>

// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		marginHorizontal: 10,
// 		marginTop: 20
// 	},
// 	labelTitle: {
// 		fontSize: 20,
// 		color: '#000',
// 		opacity: 0.7
// 	},
// 	subTextLabel: {
// 		fontSize: 14,
// 		color: '#000',
// 		opacity: 0.4
// 	},

// 	iconBack: {
// 		color: '#fff',
// 		fontSize: 16
// 	},
// 	Img: {
// 		width: 40,
// 		height: 30
// 	},
// 	phoneInputContainer: {
// 		backgroundColor: '#eee',
// 		height: 70,
// 		width: '100%',
// 		padding: 10,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginTop: 35,
// 		borderRadius: 5
// 	},
// 	flagContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center'
// 	},
// 	countryCode: {
// 		fontSize: 16,
// 		marginLeft: 5,
// 		color: '#000',
// 		opacity: 0.6
// 	},
// 	iconDropDown: {
// 		marginLeft: 10,
// 		color: '#000',
// 		opacity: 0.6
// 	},
// 	input: {
// 		fontSize: 16,
// 		marginLeft: 15
// 	},
// 	buttonContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'space-between',
// 		marginHorizontal: 15,
// 		paddingBottom: 10
// 	},
// 	arrowContinue: {
// 		backgroundColor: '#224889',
// 		width: '100%',
// 		height: 40,
// 		borderRadius: 5,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	ArrowContinue: {
// 		color: '#fff',
// 		fontSize: 17
// 	},
// 	textInstruction: {
// 		color: '#000',
// 		paddingRight: 5
// 	},

// });



import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LoginScreen = () => {

	return (
		<View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 }}>
			<View style={styles.container}>
				<Text style={styles.labelTitle}>Welcome to Bird's Nest Mart</Text>
				<Text style={styles.subTextLabel}>Please enter your phone number to login</Text>
			</View>

			<View style={styles.phoneInputContainer}>
				<View style={styles.flagContainer}>
					<FastImage
						style={styles.Img}
						source={{
							uri:
								'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/383px-Flag_of_Cambodia.svg.png'
						}}
					/>
					<AntDesign style={styles.iconDropDown} name="caretdown" />
					<Text style={styles.countryCode}>+855</Text>
				</View>
				<TextInput
					keyboardType="number-pad"
					style={styles.input}
					placeholder="Enter phone number"
				/>
			</View>
			<View style={styles.buttonContainer}>

				<Text style={styles.textInstruction}>
					By continuing, you agree to accept our term and condition. Your data rates may apply.
						</Text>

				<TouchableOpacity style={styles.arrowContinue}>

					<AntDesign style={styles.ArrowContinue} name="arrowright" />

				</TouchableOpacity>
			</View>
		</View>
	);
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginTop: 20,

	},
	labelTitle: {
		fontSize: 20,
		color: '#000',
		opacity: 0.7
	},
	subTextLabel: {
		fontSize: 14,
		color: '#000',
		opacity: 0.4
	},
	iconBack: {
		color: '#fff',
		fontSize: 16
	},
	Img: {
		width: 40,
		height: 30
	},
	phoneInputContainer: {
		backgroundColor: '#eee',
		height: 70,
		width: '100%',
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 35,
		borderRadius: 5
	},
	flagContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	countryCode: {
		fontSize: 16,
		marginLeft: 5,
		color: '#000',
		opacity: 0.6
	},
	iconDropDown: {
		marginLeft: 10,
		color: '#000',
		opacity: 0.6
	},
	input: {
		fontSize: 16,
		marginLeft: 15
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		bottom: 50,
		position: 'absolute',
		paddingHorizontal: 35
	},
	arrowContinue: {
		backgroundColor: '#224889',
		width: 60,
		height: 60,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ArrowContinue: {
		color: '#fff',
		fontSize: 26
	},
	textInstruction: {
		color: '#000',
		paddingRight: 5
	},
})

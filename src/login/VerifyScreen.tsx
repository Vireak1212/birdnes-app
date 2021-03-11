// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const VerifyScreen = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <Text>Hello</Text>
//         </View>
//     )
// }

// export default VerifyScreen;

// const styles = StyleSheet.create({})


// import * as React from 'react';
// import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { TextField } from 'react-native-material-textfield';
// import LinearGradient from 'react-native-linear-gradient';

// export interface AppProps {
// 	navigation: any;
// 	onConfirmCode: any;
// 	process: boolean;
// }

// export interface AppState {
// 	code: any;
// }

// export default class ConfirmCodeScreen extends React.Component<AppProps, AppState> {
// 	constructor(props: AppProps) {
// 		super(props);
// 		this.state = { code: '' };
// 	}

// 	_renderHeader = () => {
// 		return (
// 			<View style={styles.headerContainer}>
// 				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
// 					<Icon style={styles.iconBack} name="arrow-left" />
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	};

// 	_renderLoginForm = () => {
// 		const { code } = this.state;
// 		const { process } = this.props;
// 		return (
// 			<View style={styles.formContainer}>
// 				<Text style={styles.welcomeText}>Verification</Text>

// 				<Text style={styles.text}>Please enter the 6 digits code send to you with your phone number.</Text>
// 				<View style={styles.textBoxContainer}>
// 					<TextField
// 						value={code}
// 						// onChangeText={(code: any) => {
// 						// 	if (code.length > 6) this.setState({ code: code });
// 						// 	// if (code.length == 6) {
// 						// 	// 	this.props.onConfirmCode(code);
// 						// 	// }
// 						// this.setState((code)=>{code:code})
// 						// }}
// 						onChangeText={(code: any) => this.setState({ code })}
// 						tintColor="#555"
// 						label="Code"
// 						keyboardType="numeric"
// 					/>
// 				</View>

// 				<TouchableOpacity onPress={() => this.props.onConfirmCode(this.state.code)} disabled={process}>
// 					<LinearGradient
// 						style={styles.buttonRead}
// 						start={{ x: 0, y: 0 }}
// 						end={{ x: 1, y: 0 }}
// 						colors={[]}
// 					>
// 						{process ? (
// 							<Text style={styles.orderText}>Verifying.......</Text>
// 						) : (
// 							<Text style={styles.orderText}>Verify</Text>
// 						)}
// 					</LinearGradient>
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	};

// 	public render() {
// 		return (
// 			<SafeAreaView style={[]}>
// 				{this._renderHeader()}
// 				<View style={[]}>{this._renderLoginForm()}</View>
// 			</SafeAreaView>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	headerContainer: {
// 		marginHorizontal: 10
// 	},
// 	iconBack: {
// 		fontSize: 16,
// 		color: '#555'
// 	},
// 	welcomeText: {
// 		fontSize: 16,
// 		color: '#222'
// 	},
// 	formContainer: {
// 		marginHorizontal: 10,
// 		marginTop: 10,
// 		width: 50
// 	},
// 	text: {
// 		color: '#999',
// 		marginTop: 10,
// 		width: '90%',
// 		lineHeight: 20
// 	},
// 	buttonRead: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		padding: 10,
// 		borderRadius: 5,
// 		marginTop: 10
// 	},
// 	orderText: {
// 		color: '#000',
// 		fontSize: 16
// 	},
// 	textBoxContainer: {
// 		marginTop: 10
// 	}
// });

import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
const size = Dimensions.get('screen');
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const CARD_WIDTH1 = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
export const MAIN_COLOR = "#134287"
export const MAIN_BACKGROUND = "#fff"
export const ICON_COLOR = '#606060'
const ANIMATED = {
    HIDDEN: -560,
    FULL_OPEN: -10,
    VISIBLE: -560,
}

export default StyleSheet.create({
    ////Forgot Password///
    confirmCodeContainer: {
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26'
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: '#4C60EE',
        borderRadius: 25,
        marginBottom: 15,
    },
    forgotSentCodeText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 30
    },
    forgotSentCodeButton: {
        backgroundColor: '#4C60EE',
        width: '35.5%',
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        marginRight: 4,
    },
    forgotTextInput: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        width: '100%',
    },
    forgotPasswordPhoneNumber: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        borderRightWidth: 0.5,
        borderRightColor: '#efaf26',
        padding: 0,
        paddingHorizontal: 5,
        height: 30,
    },
    forgotPasswordTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26'
    },
    forgotTextInputContainer: {
        marginHorizontal: 20,
        marginTop: 30,
    },
    forgortPasswordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    ///Edit Profile///
    editProfileButton: {
        marginTop: 15,
        backgroundColor: '#4C60EE',
        borderRadius: 25,
        marginBottom: 15,
    },
    sendCodeStyle: {
        backgroundColor: '#4C60EE',
        width: '35%',
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    phoneIput: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        borderRightWidth: 0.5,
        borderRightColor: '#efaf26',
        padding: 0,
        paddingHorizontal: 5,
        height: 30,
    },
    textInputStyle: {
        paddingHorizontal: 15,
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        width: '100%',
    },
    editProfileTextInput: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26'
    },
    editProfileIcon: {
        position: 'absolute',
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0
    },
    linearGradient: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    editProfileImageContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 5,
        shadowColor: "#f6f6f6",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 10,
    },
    verifyCodeContainer: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26',
        alignItems: 'center',
    },
    countryCode: {
        paddingHorizontal: 10,
        borderRightWidth: 0.5,
        borderRightColor: '#efaf26',
        height: '70%',
        justifyContent: 'center',
    },
    ///Pofile Screen///
    otherFriendContainer: {
        height: 100,
        width: 80,
        marginHorizontal: 5,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f6f6f6',
        borderRadius: 5,
    },

    menageProfileIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#FF8000',
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menageProfileContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileFriends: {
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    profileImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        width: 90,
        backgroundColor: '#f6f6f6f6',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    profileText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5
    },
    ///SignUp
    singupNextButton: {
        marginTop: 30,
        backgroundColor: '#4C60EE',
        borderRadius: 25,
        marginBottom: 15,
    },
    singupText: {
        marginTop: 30,
        color: '#4C60EE',
        fontWeight: 'bold',
        fontSize: 13
    },
    singupTextContainer: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 10
    },
    sentCodeText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 30
    },
    sentCodeButton: {
        backgroundColor: '#4C60EE',
        width: '35.5%',
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        marginRight: 4,
    },
    textInput: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        width: '100%',
    },
    sintUpPhoneNumber: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        borderRightWidth: 0.5,
        borderRightColor: '#efaf26',
        padding: 0,
        paddingHorizontal: 5,
        height: 30,
    },
    singUpTextInputCoutainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        width: '100%',
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26'
    },
    signUpContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    ///Login Screen//
    singInWithImage: {
        height: 45,
        width: 45,
    },
    singInWithGoogleImage: {
        height: 40,
        width: 40,
    },
    singInWithSocial: {
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 15,
    },
    singInWithContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
    },
    deviderMidleText: {
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4C60EE'
    },
    deviderBorder: {
        backgroundColor: '#4C60EE',
        height: 0.4,
        width: 150,
    },
    borderStyleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    forgotPasswordText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4C60EE',
        textDecorationLine: 'underline',
        // textShadowOffset: { width: 0.5, height: 1 },
        // textShadowRadius: 15,
    },
    forgotPasswordContainer: {
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    logInButton: {
        marginTop: 25,
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#4C60EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextInput: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        width: '100%',
    },
    phoneNumber: {
        marginLeft: 5,
        fontSize: 14,
        color: '#000',
        borderRightWidth: 0.5,
        borderRightColor: '#efaf26',
        padding: 0,
        paddingHorizontal: 5,
        height: 30,
    },
    textInputCoutainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
        backgroundColor: '#f6f6f6',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: '#efaf26'
    },
    loginContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    ////////
    mainHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5,
    },
    mainHeaderContainer: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
    },
    /////////
    flex_1: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    padding_10: {
        padding: 10,
    },
    navigateHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        paddingLeft: 15
    },
    subHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#606060'
    },
    leftRightHeader: {
        width: '100%',
        alignItems: 'center'
    },
    headerIconColor: {
        color: '#606060'
    },

})
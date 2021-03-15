import { StyleSheet } from "react-native";
export const MAIN_COLOR = '#224889'
export const MAIN_BACKGROUND = "#fff"
export const ICON_COLOR = '#606060'
export const PRICE_COLOR = '#224889'

export default StyleSheet.create({
    leftRightHeader: {
        width: '100%',
        alignItems: 'center',
    },
    headerIconColor: {
        color: '#fff'
    },

    ///Profile
    backgroundImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 20,
    },
    Imagestyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    Camera: {
        backgroundColor: '#fff',
        height: 30,
        width: 30,
        borderRadius: 20,
        bottom: 5,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundAccountinfo: {
        backgroundColor: '#fff',
    },
    backgroundAccountsetting: {
        marginTop: 15,
        backgroundColor: '#fff',
    },
    signOut: {
        backgroundColor: '#224889',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 10
    },

    ////Login
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
        marginLeft: 15,
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
    ///EditProfile
    styleform: {
        backgroundColor: '#e6e7e8',
        height: 50,
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    ButtonUpdate: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#224889',
        width: '100%'
    },
    lastNamestyle: {
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
    },
    ////shippingAdress

    styleforms: {
        backgroundColor: '#e6e7e8',
        height: 150,
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    bottonUpdate: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#224889',
        width: '100%'
    },
    ////MainCartScreen
    cartImageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 130
    },
    checkOutContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 10,
    },
    styleCHACKOUT: {
        backgroundColor: 'rgba(34,72,137,0.9)',
        width: '50%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
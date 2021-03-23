import { StyleSheet, Dimensions } from 'react-native';
export const MAIN_COLOR = '#224889'
export const MAIN_BACKGROUND = "#fff"
export const ICON_COLOR = '#606060'
export const PRICE_COLOR = '#224889'
export const screen = Dimensions.get('screen')

export default StyleSheet.create({
    leftRightHeader: {
        width: '100%',
        alignItems: 'center',
    },
    headerIconColor: {
        color: '#fff'
    },
    ///Top product
    topProductTitle: {
        paddingHorizontal: 12,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topProductPrice: {
        fontSize: 14,
        paddingVertical: 3,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    topProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 3 / 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    ///Product Item
    productItemPrice: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    productItemContainer: {
        backgroundColor: '#fff',
        width: screen.width * 8 / 17.5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    ////New product
    newProductGrid: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newProductPrice: {
        fontSize: 14,
        paddingVertical: 3,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    newProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 3 / 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    ////All Product
    allProductTitle: {
        paddingTop: 5,
        paddingHorizontal: 12,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    allProductPrice: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: PRICE_COLOR
    },
    allProductContainer: {
        backgroundColor: '#fff',
        width: screen.width * 8 / 17.5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },

    ///Product Detail
    productDetailDescriptions: {
        paddingBottom: 10,
        fontSize: 13,
        color: '#aaa',
        lineHeight: 17
    },
    productDetailSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    slideImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },


    addToCartContaier: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 12,
    },
    unitButton: {
        marginLeft: 15,
        borderWidth: 0.2,
        borderRadius: 5,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCountContainer: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 99, 71, 0.8)',
        right: 20,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // zIndex: 2000
    },
    itemCountText: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 2
    },
    addToCartBotton: {
        height: 50,
        // marginRight: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(34,72,137,0.9)',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 2,
    },
    productDetailQtyContainer: {
        marginTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productSubDetail: {
        marginTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    detailImageContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    MPBotton: {
        width: 30,
        height: 30,
        marginHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2
    },
    productDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productDetailName: {
        fontSize: 12,
        color: '#FF6666',
        fontWeight: 'bold'
    },
    productDetailPrice: {
        fontSize: 17,
        paddingHorizontal: 10,
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },
    ///Profile
    backgroundImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 50,
        backgroundColor: '#eee'
    },
    Imagestyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#eee'
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
        justifyContent: 'center',
        flex: 1,
    },
    checkOutContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
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
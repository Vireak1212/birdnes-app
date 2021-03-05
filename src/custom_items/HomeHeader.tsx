import { Col } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeHeader = ({ leftIcon, title, rightIcon }: any) => {
    return (
        <View style={{
            flexDirection: 'row',
            height: 50,
            width: '100%',
            backgroundColor: '#224889'
        }}>
            <Col style={{
                width: '50%',
                height: '100%',
                justifyContent: 'center',
            }}>
                {leftIcon}
            </Col>
            {/* <Col style={{ width: '70%', alignItems: 'center' }}>
                <Text style={styles.subHeaderText}>{title}</Text>
            </Col> */}
            <Col style={{
                width: '50%',
                height: '100%',
                justifyContent: 'center'
            }}>
                {rightIcon}
            </Col>
        </View >
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    subHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#606060'
    },
})

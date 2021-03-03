import { Col } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MainHeader = ({ leftIcon, title, rightIcon }: any) => {
    return (
        <View style={{
            flexDirection: 'row',
            height: 50,
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#224889'
        }}>
            <Col style={{ width: '15%', alignItems: 'center' }}>
                {leftIcon}
            </Col>
            <Col style={{ width: '70%', alignItems: 'center' }}>
                <Text style={styles.subHeaderText}>{title}</Text>
            </Col>
            <Col style={{ width: '15%', alignItems: 'center' }}>
                {rightIcon}
            </Col>
        </View >
    )
}

export default MainHeader

const styles = StyleSheet.create({
    subHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
})

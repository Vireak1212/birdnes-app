import { useNavigation } from '@react-navigation/native';
import { Col, List, Row } from 'native-base';
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import MainHeader from '../../custom_items/MainHeader';

const ReviewDetail = () => {
    const style = useSelector((state: { style: any }) => state.style);
    const client = useSelector((state: { client: any }) => state.client);
    const navigate = useNavigation();

    const leftIcon = () => <TouchableOpacity style={style.leftRightHeader}
        onPress={() => navigate.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={25} style={style.headerIconColor} />
    </TouchableOpacity>
    return (
        <SafeAreaView>

            <MainHeader
                title={'Reviews'}
                leftIcon={leftIcon()}

            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={['0']}
                ListEmptyComponent={null}
                keyExtractor={() => "dummy"}
                renderItem={() => {
                    return (
                        <>
                            <View>
                                <Text>Reating</Text>
                                <TouchableOpacity style={{ alignSelf: 'flex-start', paddingTop: 5 }}
                                    onPress={() => navigate.navigate('ReviewDetail')}
                                >
                                    <StarRating
                                        disabled={true}
                                        emptyStar={'star-o'}
                                        fullStar={'star'}
                                        halfStar={'star-half-o'}
                                        iconSet={'FontAwesome'}
                                        maxStars={5}
                                        starSize={40}
                                        // rating={item.items.rating_value}
                                        emptyStarColor={'#FFD700'}
                                        fullStarColor={'#FFD700'}
                                        // starStyle={{ marginTop: Platform.OS === "ios" ? 4 : 3 }}
                                        containerStyle={{ width: 80, }}
                                        starStyle={{ padding: 5 }}

                                    />
                                </TouchableOpacity>
                            </View>
                        </>)
                }}
            />
        </SafeAreaView>
    )
}

export default ReviewDetail

const styles = StyleSheet.create({})

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';

const Rules = () => {
    const data = [
        { id: 1, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
    ];
    const handletxtChange = () => { };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginHorizontal: wp(3), marginVertical: hp(1) }}>
                <TouchableOpacity
                    style={{
                        borderColor: Colors.blue,
                        borderWidth: 1,
                        flex: 1,
                        padding: wp(2),
                        borderRadius: 8,
                        alignItems: 'center',

                    }}
                >
                    <Text style={{ color: '#000' }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text style={styles.titel}>Add your personal details</Text>
                <Text style={{ marginStart: wp(4), marginTop: wp(3) }}>
                    Add Falicity and rules
                </Text>
                <Text style={[styles.titel, { fontSize: wp(4) }]}>Facilities</Text>
                <FlatList
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',

                    }}
                    data={data}
                    renderItem={renderItem}
                    numColumns={3}
                />
                <TouchableOpacity style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        + Add Facilities
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Rules;

const styles = StyleSheet.create({
    btnstyle: {
        backgroundColor: Colors.blue,
        marginHorizontal: wp(7),
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        marginTop: hp(3)
    },
    titel: {
        marginLeft: wp(4),
        marginTop: hp(1),
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
    },
});

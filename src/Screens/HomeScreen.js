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
import CheckBox from 'react-native-check-box';
const HomeScreen = ({ navigation }) => {
    const data = [
        { id: 1, name: 'Cricket', image: ImagePath.box1 },
        { id: 1, name: 'Cricket', image: ImagePath.box2 },
        { id: 1, name: 'Cricket', image: ImagePath.box3 },
    ];

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: '#fff', margin: wp(4), borderRadius: 6 }}>
                <FastImage
                    source={item.image}
                    style={{
                        width: '90%',
                        height: hp(20),
                        backgroundColor: '#000',
                        alignSelf: 'center',
                        margin: wp(4),
                        borderRadius: 8,
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: wp(8),
                        marginBottom: wp(2),
                    }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{ color: '#000', fontSize: wp(4.6) }}>
                            Loote net box
                        </Text>
                        <Text>Athwalines,surat</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}>
                        <Text style={{ color: Colors.blue, fontSize: wp(6) }}>₹600/</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 8 }}>hour</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue }}>
            <FastImage
                source={ImagePath.menu}
                style={{ width: wp(4), height: hp(8), backgroundColor: '#000' }}
                resizeMode="center"
            />

            <View style={styles.bottomview}>
                <FlatList data={data} renderItem={renderItem} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    bottomview: {
        backgroundColor: '#f3f5f6',
        flex: 1,
        marginTop: hp(15),
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingBottom: hp(15)
    },
});

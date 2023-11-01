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
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
// import ProgressLoader from 'rn-progress-loader';
// import Input from '../Commponent/Input';
// import CheckBox from 'react-native-check-box';


const HomeScreen = ({ navigation }) => {
    const data = [
        { id: 1, name: 'Cricket', image: ImagePath.box1 },
        { id: 1, name: 'Cricket', image: ImagePath.box2 },
        { id: 1, name: 'Cricket', image: ImagePath.box3 },
    ];

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ backgroundColor: '#fff', margin: wp(4), borderRadius: 6, padding: 10, }} onPress={() => navigation.navigate(Routs.BoxDetailsScreen)}>
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
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue }}>
            <Image style={{ position: 'absolute', height: hp(17), width: '100%' }} source={ImagePath.homebg} />
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp(4) }}>

                <FastImage
                    source={ImagePath.menu}
                    style={{ width: wp(10), margin: hp(2), height: hp(8), }}
                    resizeMode="contain"
                />
                <Text style={{ color: '#fff', fontSize: wp(7), textAlign: 'center', alignSelf: 'center' }}>
                    BoxClub
                </Text>
                <FastImage
                    source={ImagePath.notification}
                    style={{ width: wp(10), margin: hp(2), height: hp(8), }}
                    resizeMode="contain"
                />

            </View>
            <View style={styles.bottomview}>
                <FlatList data={data} renderItem={renderItem} showsVerticalScrollIndicator={false} style={{ padding: 5, marginBottom: hp(10) }} />
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
        paddingBottom: hp(15),
        marginBottom: hp(22)
    },
});

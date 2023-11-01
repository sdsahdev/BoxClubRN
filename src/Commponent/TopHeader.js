import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagePath } from '../AllData/Utill';
const TopHeader = ({ name, back, navigation }) => {
    return (
        <View style={styles.container}>
            {/* <View style={{ width: '100%', flex: 1 }}>
                {/* <BackgroundSvg /> */}
            {/* <Image source={ImagePath.headerbg} style={styles.imgstyle} />
        </View> */}
            <View View style={styles.viewSt} >
                {back === true ? (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={ImagePath.backScreen} style={styles.backstyle} />
                    </TouchableOpacity>
                ) : null
                }
                <Text style={styles.headetxt}>{name}</Text>
            </View >
        </View >
    );
};
export default TopHeader;
const styles = StyleSheet.create({
    viewSt: { flexDirection: 'row', alignItems: 'center', marginTop: hp(3) },
    imgstyle: { height: hp(50), width: '100%', position: 'absolute', flex: 1, tintColor: 'blue' },
    backstyle: {
        width: wp(10),
        height: hp(8),
        resizeMode: 'center',
        marginLeft: wp(8),
        marginTop: hp(3),
        tintColor: '#000',
    },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginLeft: wp(4),
        marginTop: hp(3),
    },
    container: { flex: 1, width: '100%' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});

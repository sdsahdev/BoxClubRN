import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../AllData/Utill';

const Facilities = ({ img, text3 }) => {
    return (
        <View style={styles.facilityView}>
            <Image source={img} resizeMode="center" style={styles.imgs} />
            <Text style={styles.txt}>{text3}
            </Text>
        </View>
    );
};

export default Facilities;

const styles = StyleSheet.create({
    facilityView: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: wp(1),
        borderRadius: wp(6),
        margin: wp(1),
        borderWidth: wp(0.3),
        borderColor: Colors.blue,
        width: wp(40),
    },
    imgs: {
        width: wp(6),
        height: hp(4),
        marginRight: wp(2),
        tintColor: Colors.blue
    },
    txt: { alignSelf: 'center', textAlign: 'center', color:'black' },
});

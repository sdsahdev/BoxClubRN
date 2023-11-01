import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';
const AdminRegister = ({ navigation }) => {
    const handletxtChange = () => {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.titel}>Add your personal details</Text>
            <View style={{
                height: hp(25),
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: Colors.blue,
                margin: 20,
                backgroundColor: '#eaf1f4',
                justifyContent: 'center'
            }}>
                <FastImage source={ImagePath.Gallary} resizeMode='center' style={styles.gallimg} />
                <Text style={{ textAlign: 'center' }}>
                    Add Miminun 3 photos of your venue
                </Text>
            </View>

            <Input called={false} onChangeText={handletxtChange} name={'Gamebox net'} img={ImagePath.Boxname} headerText={''} />
            <Input called={false} onChangeText={handletxtChange} name={'Your Address'} img={ImagePath.locationIcon} headerText={''} />
            <Input called={false} onChangeText={handletxtChange} name={'Size of your box'} img={ImagePath.size} headerText={''} />
            <View style={{ flexDirection: 'row' }}>

                <Input called={false} onChangeText={handletxtChange} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                <Input called={false} onChangeText={handletxtChange} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(Routs.SportScreen)} style={styles.btnstyle}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AdminRegister

const styles = StyleSheet.create({
    btnstyle: {
        backgroundColor: Colors.blue,
        marginHorizontal: wp(7),
        paddingVertical: hp(2),
        borderRadius: wp(3),
        bottom: hp(2),
        position: 'absolute',
        width: '90%',
        alignSelf: 'center'
    },
    container: { flex: 1, },
    titel: { marginLeft: wp(4), marginTop: hp(4), color: '#000', fontSize: wp(5), fontWeight: 'bold' },
    gallimg: { height: hp(5), width: wp(10), alignSelf: 'center', }
})
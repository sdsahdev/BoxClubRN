import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import Input from '../Commponent/Input';
import CheckBox from 'react-native-check-box'


const Registerscreen = ({ navigation }) => {
    const [userName, setuserName] = useState('')
    const handletxtChange = (text) => {
        setuserName(text)
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <ImageBackground style={{ flex: 1 , backgroundColor:'#fff'}} source={ImagePath.bgmain} resizeMode="contain"> */}

            <Image source={ImagePath.bgmain} resizeMode="center" style={styles.bgimage} />
            <View style={{ flex: 1, }}>

                <View style={styles.imgstyle}>

                    <FastImage
                        source={ImagePath.boll}
                        style={{ flex: 1, }}
                        resizeMode="center"
                    />

                </View>
                <Text style={styles.titelText}>
                    Hello!{'\n'}
                    Signup to get started
                </Text>

                <Input called={false} onChangeText={handletxtChange} name={'Name'} img={ImagePath.user} headerText={''} />
                <Input called={false} onChangeText={handletxtChange} name={'Enter your email'} img={ImagePath.mail} headerText={''} />
                <Input called={false} onChangeText={handletxtChange} name={'Enter your phonenumber'} img={ImagePath.telephone} headerText={''} />
                <Input called={false} onChangeText={handletxtChange} name={'Enter your password'} img={ImagePath.password} headerText={''} eye={true} />
                <Input called={false} onChangeText={handletxtChange} name={'Confirm your password'} img={ImagePath.password} headerText={''} eye={true} />

                <View style={styles.checkview}>

                    <CheckBox
                        style={{ marginStart: hp(4), marginHorizontal: wp(2) }}
                        onClick={() => {
                        }}
                        isChecked={true}
                    />
                    <Text style={{ fontSize: wp(4), flex: 1 }}>
                        I agree with all <Text style={styles.highight}> term & conditions </Text>and <Text style={styles.highight}>privacy polices.</Text>
                    </Text>

                </View>

                <TouchableOpacity style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', marginTop: hp(2.5), fontSize: wp(3.5) }}>
                    Already have an account? <Text style={styles.highight} onPress={() => navigation.navigate('LoginScreen')}>Login</Text>
                </Text>
            </View>
            {/* </ImageBackground> */}



        </View>
    )
}

export default Registerscreen;


const styles = StyleSheet.create({
    bgimage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '35%',
        bottom: 1,
        justifyContent: 'flex-end',
        // You can change this to 'contain' or other options as needed
    },
    imgstyle: {
        width: wp(14),
        height: hp(7),
        marginStart: hp(4),
    },
    titelText: {
        color: Colors.blue,
        fontSize: wp(6),
        marginHorizontal: hp(4),
        fontWeight: 'bold',
    },
    checkview: {
        flexDirection: 'row'
    }
    , highight: {
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    btnstyle: {
        backgroundColor: Colors.blue,
        marginHorizontal: wp(7),
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        marginTop: hp(1)
    }
})
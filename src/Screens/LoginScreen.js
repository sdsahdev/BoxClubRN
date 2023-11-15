import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState, signal } from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
import Input from '../Commponent/Input';
import CheckBox from 'react-native-check-box'

import ProgressLoader from 'rn-progress-loader';
import * as APIS from '../APIS/Urls';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handletxtChange = (text) => {
        setemail(text)
    }
    const handlepasword = (text) => {
        setpassword(text)
    }
    const loginApi = () => {

        const body_data = {
            email: email,
            password: password,
            type: 'login'
        }
        console.log(body_data, "dtaa");

        axios({
            url: `${APIS.ADMIN_bASE_URL}${APIS.Login}`,
            method: 'POST',
            data: body_data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Change to 'application/json'
            }
        })
            .then(response => {
                // setIsLoading(false)
                console.log('Response:', response.data);
                showMessage({
                    message: response.data.message,
                    type: response.data.success ? 'success' : 'danger',
                    backgroundColor: response.data.success ? "green" : 'red', // background color
                    icon: response.data.success ? "success" : 'danger', // background color
                    color: "#fff", // text color
                    onHide: () => {
                        response.data.success && navigation.navigate(Routs.HomeScreen)
                    }
                });
            })
            .catch(error => {
                showMessage({
                    message: 'something went wrong',
                    type: "danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                    icon: 'danger'
                });
                // setIsLoading(false)
                console.error('Error:', error);
            });

    }
    return (
        <View style={{ flex: 1 }}>
            {/* <ImageBackground style={{ flex: 1 , backgroundColor:'#fff'}} source={ImagePath.bgmain} resizeMode="contain"> */}

            <Image source={ImagePath.bgmain} resizeMode="center" style={styles.bgimage} />
            <View style={{ flex: 1, }}>

                <View style={styles.imgstyle}>

                    <FastImage
                        source={ImagePath.boll}
                        style={{ height: hp(7), width: wp(20), }}
                        resizeMode="contain"
                    />

                </View>
                <Text style={styles.titelText}>
                    Welcome back!{'\n'}
                    Login to continue
                </Text>
                <View style={{ marginTop: hp(4) }}>
                    <Input called={false} onChangeText={handletxtChange} name={'Email'} img={ImagePath.mail} headerText={''} />
                    <Input called={false} onChangeText={handlepasword} name={'Enter your password'} img={ImagePath.loack} headerText={''} eye={true} />
                </View>


                <TouchableOpacity style={styles.btnstyle} onPress={() => {
                    // navigation.navigate(Routs.HomeScreen)
                    loginApi()
                }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', marginTop: hp(3) }}>
                    Don’t have an account? <Text style={styles.highight} onPress={() => navigation.navigate(Routs.Registerscreen)}>Sign Up</Text>
                </Text>
            </View>
            {/* </ImageBackground> */}

        </View>
    )
}

export default LoginScreen

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
        height: hp(10),
        marginTop: hp(2),
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
        marginTop: hp(3)
    }
})
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

const OtpScreen = ({ navigation }) => {

    const otpInputRefs = Array.from({ length: 4 }, () => useRef(null));
    const [isLoading, setIsLoading] = useState(false);
    const [randomOTP, setrandomOTP] = useState(0)
    const [otp, setOtp] = useState('');

    const handleOtpChange = (index, text) => {

        const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);
        setOtp(prevOtp => {
            const newOtp = prevOtp.split('');
            newOtp[index] = sanitizedText;
            return newOtp.join('');
        });

        // Move to the previous input if the current input is empty
        if (text === '' && index > 0) {
            otpInputRefs[index - 1].current.focus();
        }

        // Move to the next input if available
        if (text !== '' && index < otpInputRefs.length - 1) {
            otpInputRefs[index + 1].current.focus();
        }
    };

    const handleSubmit = () => {
        navigation.navigate(Routs.AdminRegister);
        // console.log(otp, "==otp scere")
        // if (randomOTP === otp) {
        //     callApi();
        // } else {
        //     showMessage({
        //         message: "please enter valid otp",
        //         type: 'Danger',
        //         backgroundColor: 'red', // background color
        //         color: '#fff', // text color

        //     });

        // }

    }
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ position: 'absolute', width: '100%' }}>
                <TopHeader name={"Otp"} />
            </View> */}
            <View style={{ borderRadius: wp(10), justifyContent: 'center', flex: 1, }}>

                <FastImage source={ImagePath.emailsent} style={{ height: '30%', width: '50%', alignSelf: 'center', }} resizeMode='center' />
                <Text style={{ textAlign: 'center', margin: wp(4) }}>
                    Enter the code we have sent you to the {'\n'}<Text style={{ color: Colors.blue }}> jamiedarren@gmail.com</Text>
                </Text>
                <View style={styles.otpContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={otpInputRefs[index]}
                            style={[styles.input, otp.length === index ? styles.inputFocus : null]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={otp[index] || ''}
                            onChangeText={text => handleOtpChange(index, text)}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={() => wpmsg()}>

                    <Text style={{ alignSelf: 'center', marginTop: hp(2), }}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                <Text style={styles.booktxt}>
                    Verify Otp
                </Text>
            </TouchableOpacity>

            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View>
    );
}

export default OtpScreen

const styles = StyleSheet.create({
    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: Colors.blue,
        width: "90%",
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2)
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#000",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#000",
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center'

    },
    input: {
        width: wp(15),
        height: hp(8),
        borderColor: '#027850',
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        fontSize: wp(8),
        textAlign: 'center',
    },
    inputFocus: {
        borderColor: 'blue',
        borderWidth: 2// Highlight the input in focus
    },
})
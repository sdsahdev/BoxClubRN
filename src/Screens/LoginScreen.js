import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState, signal } from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
import Input from '../Commponent/Input';
import ProgressLoader from 'rn-progress-loader';
import {
    showMessage,
} from 'react-native-flash-message';
import { loginUser } from '../../Redux/Slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.LoginReducer)

    const [email, setemail] = useState('sahdevdomadiya9@gmail.com')
    const [password, setpassword] = useState('dev@123')
    const handletxtChange = (text) => {
        setemail(text)
    }
    const handlepasword = (text) => {
        setpassword(text)
    }
const testAPi =  ()=> {
  fetch('http://13.234.112.36:8080/api/v1/user/get-block', {
        headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJtb2JpbGUiOiIrOTE5OTExNzA3NDc0Iiwicm9sZSI6IlVzZXIiLCJfaWQiOiI2MzZjYWY4ZDc4NDQ1NjJhMTg3ZmQxNDUiLCJwYWlkIjpmYWxzZX0sImlhdCI6MTcwNjg2ODczMCwiZXhwIjoxNzM4NDA0NzMwfQ.YICGvhhS9-Go1IOCmS7Cz343zXbVhzHKXB1di2NkLVc'
        }
    })
        .then(response => response.json())
        .then(res => {
            console.log(res, "===")
            // const blockedProfile = res.data.data.blockUser;
            // setblockUsers(Object.values(blockedProfile));
        })
        .catch(er => {
            console.error(er)
            console.log(er);
        });
}
    const loginApi = async () => {
        const body_data = {
            email: email,
            password: password,
            type: 'login'
        }
        dispatch(loginUser(body_data)).then(() => {
            navigation.navigate(Routs.BottomTabScreen)
        })
            .catch((error) => {
                showMessage({
                    message: error?.message,
                    type: "danger",
                    backgroundColor: "red",
                    color: "#fff",
                    icon: 'danger',
                });

            });;



    }
    return (
        <View style={{ flex: 1 }}>
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={Colors.blue} />
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
                    <Input called={false} onChangeText={handletxtChange} name={'Email'} img={ImagePath.mail} headerText={''}  defaults={email}/>
                    <Input called={false} onChangeText={handlepasword} name={'Enter your password'} img={ImagePath.loack} headerText={''} eye={true} defaults={password} />
                </View>


                <TouchableOpacity style={styles.btnstyle} onPress={() => {
                    loginApi()
                }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', marginTop: hp(3), color: '#000' }}>
                    Don’t have an account? <Text style={styles.highight} onPress={() => navigation.navigate(Routs.Registerscreen)}>Sign Up</Text>
                </Text>
            </View>
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
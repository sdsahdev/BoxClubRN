import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
import Input from '../Commponent/Input';
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as APIS from '../APIS/Urls';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import SwipList from '../Commponent/SwipList';
import axios from 'axios';

import { AppContext } from '../Context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../Redux/Slices/LoginSlice';
import { setTypeOtp } from '../../Redux/Slices/EmailSendSlice';

const FirstRegisterscreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [UserName, setuserName] = useState('')
    const [Password, setpassword] = useState('')
    const [conPassword, setconPassword] = useState('')
    const [Email, setEmailText] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [Upi, setUpi] = useState('')
    const [Companyname, setCompanyname] = useState('')
    const [isSlected, setisSelected] = useState(false);
    const [selectedImages, setSelectedImages] = useState();

    useEffect(() => {
        getStore()
    }, []);
const handleEmail = (emailtext)=> {
    dispatch(setEmail(emailtext))
    setEmailText(emailtext)
}
    const getStore = async () => {
        // setuserName(await AsyncStorage.getItem(Strings.ReNameKey))
        // setEmailText(await AsyncStorage.getItem(Strings.ReEmailKey))
        // setPhoneNumber(await AsyncStorage.getItem(Strings.RephoneKey))
        // setAddress(await AsyncStorage.getItem(Strings.ReAddressKey))
        // setUpi(await AsyncStorage.getItem(Strings.ReUpiKey))
        // setCompanyname(await AsyncStorage.getItem(Strings.ReCompanyKey))
        // setpassword(await AsyncStorage.getItem(Strings.RepasswordKey))
        // setconPassword(await AsyncStorage.getItem(Strings.ReCopasswordKey))
        // console.log(await AsyncStorage.getItem(Strings.ReEmailKey), "===emial");
    }

    const setStore = async () => {

        await AsyncStorage.setItem(Strings.ReNameKey, UserName);
        await AsyncStorage.setItem(Strings.ReEmailKey, Email);
        await AsyncStorage.setItem(Strings.RephoneKey, PhoneNumber);
        await AsyncStorage.setItem(Strings.ReAddressKey, Address);
        await AsyncStorage.setItem(Strings.ReUpiKey, Upi);
        await AsyncStorage.setItem(Strings.ReCompanyKey, Companyname);
        await AsyncStorage.setItem(Strings.RepasswordKey, Password);
        await AsyncStorage.setItem(Strings.ReCopasswordKey, conPassword);
    }



    const Admin_registerAPI = () => {
        const formData = new FormData();
        console.log(selectedImages, "==img path");
        formData.append('name', UserName);
        formData.append('password', Password);
        formData.append('email', Email);
        formData.append('mobile', PhoneNumber);
        formData.append('address', Address);
        formData.append('id_proof', {
            uri: selectedImages.path,
            type: selectedImages.mime,
            name: selectedImages.modificationDate,
        });
        formData.append('upi', Upi);
        formData.append('company_name', Companyname);
        axios({
            url: `${APIS.ADMIN_bASE_URL}${APIS.Admin_Registration}`,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
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
                        response.data.success && navigation.navigate(Routs.OtpScreen, { email: Email })
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

    const handleContine = () => {
        // setStore()
        // Admin_registerAPI()
        navigation.navigate(Routs.OtpScreen)
        dispatch(setTypeOtp(Strings.AdminRegisterType))
    }

    const openImagePicker = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo',
            });
            setSelectedImages(images);
            setisSelected(true)
        } catch (e) {
            console.log('ImagePicker Error: ' + e);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6f' }}>
            {/* <ImageBackground style={{ flex: 1 , backgroundColor:'#fff'}} source={ImagePath.bgmain} resizeMode="contain"> */}
            <Image source={ImagePath.bgmain} resizeMode="stretch" style={styles.bgimage} />
            <ScrollView showsVerticalScrollIndicator={false} >

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
                    {isSlected == true ?
                        <TouchableOpacity style={styles.swipest} onPress={() => openImagePicker()}>

                            <FastImage
                                source={{
                                    uri: selectedImages.path
                                }}

                                style={styles.image}
                                resizeMode='cover' />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{
                            height: hp(25),
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: Colors.blue,
                            margin: 20,
                            backgroundColor: '#eaf1f4',
                            justifyContent: 'center'
                        }} onPress={() => openImagePicker()}>
                            <View >

                                <FastImage source={ImagePath.Gallary} resizeMode='center' style={styles.gallimg} />
                                <Text style={{ textAlign: 'center', color: '#000' }}>
                                    Add box owner pancard photo
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <Input defaults={UserName} click_dis={true} called={false} onChangeText={(text) => setuserName(text)} name={'Name'} img={ImagePath.user} headerText={''} />
                    <Input defaults={Email} click_dis={true} called={false} onChangeText={(text) => handleEmail(text)} name={'Enter your email'} img={ImagePath.mail} headerText={''} />
                    <Input defaults={PhoneNumber} click_dis={true} called={false} onChangeText={(text) => setPhoneNumber(text)} name={'Enter your phonenumber'} img={ImagePath.telephone} headerText={''} />
                    <Input defaults={Address} click_dis={true} called={false} onChangeText={(text) => setAddress(text)} name={'Address'} img={ImagePath.home} headerText={''} />
                    <Input defaults={Upi} click_dis={true} called={false} onChangeText={(text) => setUpi(text)} name={'Upi id'} img={ImagePath.upi} headerText={''} />
                    <Input defaults={Companyname} click_dis={true} called={false} onChangeText={(text) => setCompanyname(text)} name={'Company Name'} img={ImagePath.Boxname} headerText={''} />
                    <Input defaults={Password} click_dis={true} called={false} onChangeText={(text) => setpassword(text)} name={'Enter your password'} img={ImagePath.loack} headerText={''} eye={true} />
                    <Input defaults={conPassword} click_dis={true} called={false} onChangeText={(text) => setconPassword(text)} name={'Confirm your password'} img={ImagePath.loack} headerText={''} eye={true} />
                    <View style={styles.checkview}>

                        <CheckBox
                            style={{ marginStart: hp(4), marginHorizontal: wp(2) }}
                            onClick={() => {
                            }}
                            isChecked={true}
                        />
                        <Text style={{ fontSize: wp(4), flex: 1, color: '#000' }}>
                            I agree with all <Text style={styles.highight}> term & conditions </Text>and <Text style={styles.highight}>privacy polices.</Text>
                        </Text>

                    </View>

                    <TouchableOpacity style={styles.btnstyle} onPress={() =>
                        handleContine()
                    }>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', marginVertical: hp(2.5), fontSize: wp(3.5), color: '#000' }}>
                        Already have an account? <Text style={styles.highight} onPress={() => navigation.navigate(Routs.LoginScreen)}>Login</Text>
                    </Text>
                </View>
                {/* </ImageBackground> */}
            </ScrollView>



        </View>
    )
}
export default FirstRegisterscreen;


const styles = StyleSheet.create({
    swipest: {
        alignItems: 'center'
    },
    image: {
        width: wp(90),
        height: hp(23),
        // backgroundColor: '#000',
        marginHorizontal: wp(1),
        borderRadius: wp(2),
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    bgimage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '35%',
        bottom: 1,
        justifyContent: 'flex-end',
        opacity: 0.4,
        backgroundColor: '#f6f6f6f',
        tintColor: '#f6f6f6f'
        // backgroundColor: 'rgba(0,0.10,.10,.10)'
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
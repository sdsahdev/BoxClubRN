import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
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


const Registerscreen = ({ navigation }) => {
    const [UserName, setuserName] = useState('')
    const [Password, setpassword] = useState('')
    const [conPassword, setconPassword] = useState('')
    const [Email, setEamil] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [Upi, setUpi] = useState('')
    const [Companyname, setCompanyname] = useState('')
    const [isSlected, setisSelected] = useState(false);
    const [selectedImages, setSelectedImages] = useState();

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
            name: selectedImages.modificationDate, // You can change the file name if needed
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
                        response.data.success && navigation.navigate(Routs.OtpScreen)
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
    const rbtn = () => {
        AsyncStorage.setItem(Strings.ReEmailKey, Email);
        AsyncStorage.setItem(Strings.ReNameKey, userName);
        AsyncStorage.setItem(Strings.RephoneKey, PhoneNumber);
        AsyncStorage.setItem(Strings.RepasswordKey, password);
        const body_data = {
            email: Email
        }
        fetch(`${APIS.bASE_URL}${APIS.Send_Otp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showMessage({
                    message: `message send`,
                    type: "Success",
                    backgroundColor: "green", // background color
                    color: "#fff", // text color

                });
            })
            .catch(error => {
                console.error('Error sending SMS:', error);
                // Handle error or display an error message to the user
                showMessage({
                    message: `fail` + error,
                    type: "Success",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color

                });
            });
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <ImageBackground style={{ flex: 1 , backgroundColor:'#fff'}} source={ImagePath.bgmain} resizeMode="contain"> */}
            <Image source={ImagePath.bgmain} resizeMode="center" style={styles.bgimage} />
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
                                <Text style={{ textAlign: 'center' }}>
                                    Add box owner pancard photo
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <Input called={false} onChangeText={(text) => setuserName(text)} name={'Name'} img={ImagePath.user} headerText={''} />
                    <Input called={false} onChangeText={(text) => setEamil(text)} name={'Enter your email'} img={ImagePath.mail} headerText={''} />
                    <Input called={false} onChangeText={(text) => setPhoneNumber(text)} name={'Enter your phonenumber'} img={ImagePath.telephone} headerText={''} />
                    <Input called={false} onChangeText={(text) => setAddress(text)} name={'Address'} img={ImagePath.home} headerText={''} />
                    <Input called={false} onChangeText={(text) => setUpi(text)} name={'Upi id'} img={ImagePath.upi} headerText={''} />
                    <Input called={false} onChangeText={(text) => setCompanyname(text)} name={'Company Name'} img={ImagePath.Boxname} headerText={''} />
                    <Input called={false} onChangeText={(text) => setpassword(text)} name={'Enter your password'} img={ImagePath.loack} headerText={''} eye={true} />
                    <Input called={false} onChangeText={(text) => setconPassword(text)} name={'Confirm your password'} img={ImagePath.loack} headerText={''} eye={true} />

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

                    <TouchableOpacity style={styles.btnstyle} onPress={() =>
                        // rbtn()
                        // Admin_registerAPI()
                        navigation.navigate(Routs.OtpScreen, { email: 'test@gmail.com' })

                    }>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', marginVertical: hp(2.5), fontSize: wp(3.5) }}>
                        Already have an account? <Text style={styles.highight} onPress={() => navigation.navigate(Routs.LoginScreen)}>Login</Text>
                    </Text>
                </View>
                {/* </ImageBackground> */}
            </ScrollView >



        </View >
    )
}
export default Registerscreen;


const styles = StyleSheet.create({
    swipest: {
        alignItems: 'center'
    },
    image: {
        width: wp(90),
        height: hp(23),
        backgroundColor: '#000',
        marginHorizontal: wp(1),
        borderRadius: wp(2),
        justifyContent: 'center'
    },
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
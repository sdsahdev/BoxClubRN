import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TopHeader from '../Commponent/TopHeader';
import { ImagePath, Routs, Strings } from '../AllData/Utill';
import Menu from '../Commponent/Menu';
import { useDispatch } from 'react-redux';
import { setTypeOtp } from '../../Redux/Slices/EmailSendSlice';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [user, setuser] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user1 = await AsyncStorage.getItem('superAdmin');
                //console.log(user1, "==end===");
                setuser(user1);
            } catch (error) {
                //console.log("Error fetching user:", error);
            }
        };

        fetchData();
    }, []);
    const hEdit = () => {
        //console.log("edit");
        navigation.navigate("RegisterScreen");
    }
    const hpassword = () => {
        //console.log("Edit Profile pressed!");
        navigation.navigate("ChangeStatus")
    };
    const hcontact = () => {
        //console.log("Contact");
        navigation.navigate("ContactUs");
    }
    const habout = () => {
        navigation.navigate("About");

        //console.log("About");
    }
    const hlogout = async () => {
        // //console.log("Logout");
        // navigation.("loginSceen");

        await AsyncStorage.clear()
        navigation.reset({
            index: 0,
            routes: [{ name: 'loginSceen' }],
        });
    }

    return (
        <View style={{ position: 'relative', backgroundColor: '#eeeeee', height: '100%' }}>
            <ScrollView style={{ marginBottom: hp(10) }} showsVerticalScrollIndicator={false}>
                <View >
                    <TopHeader name={"My Profile"} />
                </View>
                {/* <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                    <Image source={imagesClass.Profile} resizeMode='contain' style={{ backgroundColor: '#000', alignSelf: 'center', height: hp(15), width: hp(15), borderRadius: hp(7.5), alignItems: 'center', justifyContent: 'center', }} />
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        User name
                    </Text>
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        123456789</Text>
                </View> */}
                {/* {console.log(user, "===")} */}
                <View style={{ marginTop: hp(10) }}>
                    <View >
                        {/* <Menu icon={ImagePath.password} name={"Change access"} onpress={() => hpassword()} /> */}
                        <Menu icon={ImagePath.password} name={"Change Password"} onpress={() => {{navigation.navigate(Routs.OtpScreen)}
                     dispatch(setTypeOtp(Strings.PassChangeType))}} />
                    </View>
                    {/* <Menu icon={imagesClass.call} name={"Download report"} onpress={() => hcontact()} /> */}
                    {/* <Menu icon={imagesClass.about} name={""} onpress={() => habout()} /> */}
                    <Menu icon={ImagePath.logout} name={"Logout"} onpress={() => hlogout()} />
                </View>

            </ScrollView>


        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),
        marginLeft: wp(10),
    },
    container: { flex: 1, position: 'relative' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});

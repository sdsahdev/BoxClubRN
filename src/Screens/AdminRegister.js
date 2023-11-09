import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath, Routs } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';
import ImagePicker from 'react-native-image-crop-picker';
import SwipList from '../Commponent/SwipList';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AdminRegister = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [activebt, setactivebt] = useState('');

    const [selectedImages, setSelectedImages] = useState([]);
    const [isSlected, setisSelected] = useState(false);

    const [companyName, setcompanyName] = useState('');
    const [addres, setaddress] = useState('');
    const [size, setSize] = useState('');
    const [openTime, setopenTime] = useState('');
    const [closeTime, setcloseTime] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (activebt == '1') {
            setopenTime(formattedTime)
        } else {
            setcloseTime(formattedTime)
        }
        console.warn("A date has been picked: ", formattedTime);

        hideDatePicker();
    };

    const openImagePicker = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });

            if (images.length > 2) {

                if (images.length > 0) {
                    setSelectedImages(images);
                    setisSelected(true)
                }
            } else {
                showMessage({
                    message: `Please select minum 3 image`,
                    type: "danger",
                    icon: 'danger',
                    color: "#fff",
                });
            }
            console.log(selectedImages.forEach(i => console.log(JSON.stringify(i.path))));
        } catch (e) {
            console.log('ImagePicker Error: ' + e);
        }

    }
    const navigateNext = () => {
        // if (
        //     !isSlected ||
        //     !companyName ||
        //     !addres ||
        //     !size ||
        //     !openTime ||
        //     !closeTime
        // ) {
        //     console.log(companyName, "please enter all");
        //     console.log(addres, "please enter all");
        //     console.log(size, "please enter all");
        //     console.log(openTime, "please enter all");
        //     console.log(closeTime, "please enter all");
        // } else {

        //     navigation.navigate(Routs.SportScreen)
        // }
        navigation.navigate(Routs.SportScreen)
    }
    const handleName = (text) => {
        setcompanyName(text)
    }

    const handleadd = (text) => {
        setaddress(text)
    }

    const handlesize = (text) => {
        setSize(text)
    }

    const handleoptime = (text) => {
        setopenTime(text)
    }

    const handlecltime = (text) => {
        setcloseTime(text)
    }
    const setActivceAclick = (isVisible, timeType) => {
        console.log(`Opening time picker for: ${timeType}`);
        setactivebt(timeType);
        showDatePicker();
    };

    return (
        <ScrollView style={{ flex: 1, }}>

            <View style={styles.container}>
                <Text style={styles.titel}>Add your personal details</Text>
                {isSlected == true ?
                    <TouchableOpacity style={styles.swipest} onPress={() => openImagePicker()}>
                        <SwipList boxData={selectedImages} />
                    </TouchableOpacity> :
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
                                Add Miminun 3 photos of your venue
                            </Text>
                        </View>
                    </TouchableOpacity>
                }

                <Input called={false} onChangeText={handleName} name={'Gamebox net'} img={ImagePath.Boxname} headerText={''} />
                <Input called={false} onChangeText={handleadd} name={'Your Address'} img={ImagePath.locationIcon} headerText={''} />
                <Input called={false} onChangeText={handlesize} name={'Size of your box'} img={ImagePath.size} headerText={''} />
                <View style={{ flexDirection: 'row', marginBottom: hp(16) }}>

                    <Input click={() => setActivceAclick(true, "1")} called={false} editfalse={true} input={openTime} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                    <Input click={() => setActivceAclick(true, "2")} called={false} editfalse={true} input={closeTime} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />

                </View>
                <TouchableOpacity onPress={() => navigateNext()} style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        Continue
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    locale="en_GB"
                    is24hour={false}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </ScrollView>

    )
}

export default AdminRegister
const styles = StyleSheet.create({
    swipest: {
        width: '100%',
        height: wp(50),
    },
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
    titel: { marginLeft: wp(4), marginTop: hp(4), color: '#000', fontSize: wp(5), fontWeight: 'bold', marginBottom: hp(2) },
    gallimg: { height: hp(5), width: wp(10), alignSelf: 'center', }
})
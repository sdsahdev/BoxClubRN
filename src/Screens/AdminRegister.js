import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
import DatePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminRegister = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);
    const [showImages, setshowImages] = useState([]);
    const [isSlected, setisSelected] = useState(false);

    const [BoxName, setBoxName] = useState('');
    const [Activebtn, setActivebtn] = useState('');
    const [Address, setAddress] = useState('');
    const [Lenght, setLenght] = useState('');
    const [Width, setWidth] = useState('');
    const [Height, setHeight] = useState('');
    const [OpenTime, setOpenTime] = useState('');
    const [CloseTime, setCloseTime] = useState('');

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {

        const twelveHourFormat = moment(date, "HH:mm").format("hh:mm A");
        setDatePickerVisibility(false);

        if (Activebtn === 'open') {
            setOpenTime(twelveHourFormat)
        } else if (Activebtn === 'close') {
            setCloseTime(twelveHourFormat)
        }
        console.warn('A date has been picked: ', twelveHourFormat);

    };

    const openImagePicker = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });

            if (images.length > 2) {
                if (images.length > 0) {
                    setshowImages(images);
                    setisSelected(true);
                    setSelectedImages(images.map((i, index) => ({
                        uri: i.path,
                        type: i.mime,
                        name: i.modificationDate,
                        index: index,
                    })));
                }
            } else {
                showMessage({
                    message: `Please select minum 3 image`,
                    type: 'danger',
                    icon: 'danger',
                    color: '#fff',
                });
            }


        } catch (e) {
            console.log('ImagePicker Error: ' + e);
        }
    };

    const navigateNext = () => {
        // if (
        //     !isSlected ||
        //     !companyName ||
        //     !addres ||
        //     !size ||
        //     !openTime ||
        //     !closeTime
        // ) {
        console.log(BoxName, "please enter all");
        console.log(Address, "please enter all");
        console.log(Lenght, "please enter all");
        console.log(Width, "please enter all");
        console.log(Height, "please enter all");
        console.log(OpenTime, "please enter all");
        console.log(CloseTime, "please enter all");
        // } else {

        //     navigation.navigate(Routs.SportScreen)
        // }
        AsyncStorage.setItem(Strings.BoxNameKey, BoxName)
        AsyncStorage.setItem(Strings.BoxAddKey, Address)
        AsyncStorage.setItem(Strings.BoxLenthKey, Lenght)
        AsyncStorage.setItem(Strings.BoxWidthKey, Width)
        AsyncStorage.setItem(Strings.BoxheightKey, Height)
        AsyncStorage.setItem(Strings.BoxOpenKey, OpenTime)
        AsyncStorage.setItem(Strings.BoxCloseKey, CloseTime)
        AsyncStorage.setItem(Strings.BoxImageKey, JSON.stringify(selectedImages))

        navigation.navigate(Routs.SportScreen);
    };


    const handleopen = text => {
        setDatePickerVisibility(true)
        setActivebtn('open')
    };
    const handleclose = text => {
        setDatePickerVisibility(true)
        setActivebtn('close')
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.titel}>Add your Box details</Text>
                {isSlected == true ? (
                    <TouchableOpacity
                        style={styles.swipest}
                        onPress={() => openImagePicker()}>
                        <SwipList boxData={showImages} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            height: hp(25),
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: Colors.blue,
                            margin: 20,
                            backgroundColor: '#eaf1f4',
                            justifyContent: 'center',
                        }}
                        onPress={() => openImagePicker()}>
                        <View>
                            <FastImage
                                source={ImagePath.Gallary}
                                resizeMode="center"
                                style={styles.gallimg}
                            />
                            <Text style={{ textAlign: 'center' }}>
                                Add Miminun 3 photos of your venue
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                <Input
                    called={false}
                    onChangeText={(txt) => setBoxName(txt)}
                    name={'Box Name'}
                    img={ImagePath.Boxname}
                    headerText={''}
                />
                <Input
                    called={false}
                    onChangeText={(txt) => setAddress(txt)}
                    name={'Box Address'}
                    img={ImagePath.locationIcon}
                    headerText={''}
                />
                <Input
                    called={false}
                    onChangeText={(txt) => setLenght(txt)}
                    name={'Box length'}
                    img={ImagePath.size}
                    headerText={''}
                />
                <Input
                    called={false}
                    onChangeText={(txt) => setWidth(txt)}
                    name={'Box width'}
                    img={ImagePath.size}
                    headerText={''}
                />
                <Input
                    called={false}
                    onChangeText={(txt) => setHeight(txt)}
                    name={'Box height'}
                    img={ImagePath.size}
                    headerText={''}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Input
                        click={() => handleopen()}
                        editfalse={true}
                        called={false}
                        name={'Open time'}
                        img={ImagePath.time}
                        headerText={''}
                        two={true}
                        input={OpenTime}
                    />
                    <Input
                        click={() => handleclose()}
                        editfalse={true}
                        called={false}
                        name={'Close time'}
                        img={ImagePath.time}
                        headerText={''}
                        two={true}
                        input={CloseTime}
                    />
                </View>
                <TouchableOpacity
                    onPress={() =>
                        // console.log(selectedImages)
                        navigateNext()
                    }
                    style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        Continue
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    isVisible={isDatePickerVisible}
                    is24hour={false}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </ScrollView>
    );
};

export default AdminRegister;
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
        width: '90%',
        marginVertical: hp(3),
        alignSelf: 'center',
    },
    container: { flex: 1 },
    titel: {
        marginLeft: wp(4),
        marginTop: hp(4),
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
        marginBottom: hp(2),
    },
    gallimg: { height: hp(5), width: wp(10), alignSelf: 'center' },
});

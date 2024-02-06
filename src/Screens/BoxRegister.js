import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
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
import SwipeUrl from '../Commponent/SwipeUrl';
import { AppContext } from '../Context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setArrayList, setArrays, setBoxRegister } from '../../Redux/Slices/boxRegisterSlice';

const BoxRegister = ({ navigation, route }) => {

    const { handleReboxFirest, } = useContext(AppContext)
    // const { handleReboxFirest, ReBoxFirst } = useContext(AppContext)
    const { type } = route.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showImagesUrl, setshowImagesUrl] = useState([]);
    const [Activebtn, setActivebtn] = useState('');

    const dispatch = useDispatch();
    const ReBoxFirst = useSelector((state) => state.boxregister.boxRegister)

    const handleInputChange = (fieldName, text) => {
        dispatch(setBoxRegister({ fieldName, text }))
        handleReboxFirest(fieldName, text);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    useEffect(() => {
        getStore(type);
    }, []);

    const getStore = async (type) => {

        // if (type == "Edit") {

        //     const item = EditBox;

        //     handleReboxFirest({
        //         BoxName: item.name,
        //         Address: item.address,
        //         Lenght: '', Width: '', Height: '',
        //         OpenTime: item.box_open_time,
        //         CloseTime: item.box_close_time
        //     })


            //     // const parsedItem = await AsyncStorage.getItem(Strings.BoxItemKey)
            //     // const item = JSON.parse(parsedItem);
            //     console.log(EditBox, "=====Edit box");
            //     // setItem(item)
            //     setisSelected(true);
            //     setUrlShows('true')
            //     setBoxName(item.name)
            //     setAddress(item.address)
            //     // setLenght(item.))
            //     // setWidth(await AsyncStorage.getItem(Strings.BoxWidthKey))
            //     // setHeight(await AsyncStorage.getItem(Strings.BoxheightKey))
            //     setOpenTime(item.box_open_time)
            //     setCloseTime(item.box_close_time)
            // showImagesUrl.push(item.img1)
            // showImagesUrl.push(item.img2)
            // showImagesUrl.push(item.img3)
            //     console.log(item, "type");
        // }

    }
    const handleConfirm = date => {
        // const twelveHourFormat = moment(date, "HH:mm").format("hh:mm A");
        const twelveHourFormat = moment(date).format('HH:mm:ss');
        setDatePickerVisibility(false);

        if (Activebtn === 'open') {
            handleInputChange('OpenTime', twelveHourFormat)
            // setOpenTime(twelveHourFormat)
        } else if (Activebtn === 'close') {
            handleInputChange('CloseTime', twelveHourFormat)
            // setCloseTime(twelveHourFormat)
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
                dispatch(setBoxRegister({fieldName:'updateimage', text:true }))
                        const imagesArray = images.map((item) => item.path)
                       dispatch(setArrayList({ fieldName: 'images', text: imagesArray}));
            }
            else {
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
        // apply all condition 

        // for image checking on  =>  ReBoxFirst.images > 2
        navigation.navigate(Routs.SportScreen, { type: type });

    };
    const getdatas = () => {
        console.log(ReBoxFirst.images, "=====image data");
        console.log(ReBoxFirst.updateimage, "=====updateimage");
    }

    const handleopen = text => {
        setDatePickerVisibility(true)
        setActivebtn('open')
    };
    const handleclose = text => {
        setDatePickerVisibility(true)
        setActivebtn('close')
    };
    const convertInsemple = (date) => {
        const twelveHourFormat = moment(date, 'HH:mm').format('hh:mm a')
        return twelveHourFormat == 'Invalid date' ? '' :twelveHourFormat;
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.titel}>Add your Box details</Text>
                {ReBoxFirst.images.length > 0 ? (
                    <View >
                        <TouchableOpacity
                            style={styles.swipest}
                            onPress={() => openImagePicker()}>
                            <SwipeUrl boxData={ReBoxFirst.images} />
                        </TouchableOpacity>

                    </View>
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
                            <Text style={{ textAlign: 'center', color: '#000' }}>
                                Add Miminun 3 photos of your venue
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                <Input
                    click_dis={true}
                    defaults={ReBoxFirst.BoxName}
                    called={false}
                    onChangeText={(txt) => handleInputChange('BoxName', txt)}
                    name={'Box Name'}
                    img={ImagePath.Boxname}
                    headerText={''}
                />
                <Input
                   click_dis={true}
                    defaults={ReBoxFirst.Address}
                    called={false}
                    onChangeText={(txt) => handleInputChange('Address', txt)}
                    name={'Box Address'}
                    img={ImagePath.locationIcon}
                    headerText={''}
                />
                <Input
                   click_dis={true}
                    defaults={ReBoxFirst.Lenght}
                    called={false}
                    onChangeText={(txt) => handleInputChange('Lenght', txt)}
                    name={'Box length'}
                    img={ImagePath.size}
                    headerText={''}
                />
                <Input
                   click_dis={true}
                    defaults={ReBoxFirst.Width}
                    called={false}
                    onChangeText={(txt) => handleInputChange('Width', txt)}
                    name={'Box width'}
                    img={ImagePath.size}
                    headerText={''}
                />
                <Input
                   click_dis={true}
                    defaults={ReBoxFirst.Height}
                    called={false}
                    onChangeText={(txt) => handleInputChange('Height', txt)}
                    name={'Box height'}
                    img={ImagePath.size}
                    headerText={''}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Input
                        defaults={ReBoxFirst.OpenTime}
                        click={() => handleopen()}
                        editfalse={true}
                        called={false}
                        name={'Open time'}
                        headerText={''}
                        two={true}
                        input={convertInsemple(ReBoxFirst.OpenTime)}
                        img={ImagePath.time}
                    />

                    <Input
                        img={ImagePath.time}
                        defaults={ReBoxFirst.CloseTime}
                        click={() => handleclose()}
                        editfalse={true}
                        called={false}
                        name={'Close time'}
                        headerText={''}
                        two={true}
                        input={convertInsemple(ReBoxFirst.CloseTime)}
                    />
                </View>

                <View style={styles.btnview}>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.pop()}>
                        <Text style={styles.btntxt}>back</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.btn} onPress={() => navigateNext()}>
                        <Text style={styles.btntxt}>Next</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btn} onPress={() => getdatas()}>
                        <Text style={styles.btntxt}>check</Text>
                    </TouchableOpacity> */}

                </View>

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

export default BoxRegister;
const styles = StyleSheet.create({
    btnview: {
        flexDirection: 'row', marginHorizontal: wp(2), justifyContent: 'space-between', margin: hp(2)
    },

    btn: {
        flex: 1,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        marginHorizontal: wp(3),
        padding: wp(3),
        borderRadius: 5,
        justifyContent: 'flex-end',
    },
    btntxt: { color: '#fff', fontSize: wp(4) },
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

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
import Input from '../Commponent/Input';
import ImagePicker from 'react-native-image-crop-picker';
import SwipList from '../Commponent/SwipList';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';

const AdminRegister = ({ navigation }) => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [isSlected, setisSelected] = useState(false);

    const [companyName, setcompanyName] = useState('');
    const [addres, setaddress] = useState('');
    const [size, setSize] = useState('');
    const [openTime, setopenTime] = useState('');
    const [closeTime, setcloseTime] = useState('');


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
    return (
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
            <View style={{ flexDirection: 'row' }}>

                <Input called={false} onChangeText={handleoptime} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                <Input called={false} onChangeText={handlecltime} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
            </View>
            <TouchableOpacity onPress={() => navigateNext()} style={styles.btnstyle}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                    Continue
                </Text>
            </TouchableOpacity>

        </View>
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
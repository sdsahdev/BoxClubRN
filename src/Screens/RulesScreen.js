import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,

} from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as APIS from '../APIS/Urls';
import { showMessage } from 'react-native-flash-message';
import { AppContext } from '../Context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view';
import mime from 'mime';

import { setBoxRegister, setArrays, ruleChecked, addOneRule, AddListRule } from '../../Redux/Slices/boxRegisterSlice';
const RulesScreen = ({ route }) => {
    const dispatch = useDispatch();
    const boxRegister = useSelector((state) => state.boxregister.boxRegister)
    const user = useSelector((state) => state.LoginReducer.user)
    const { type } = route.params;
    const [addrule, setaddrule] = useState('');

    const data = [
        { id: 1, name: 'Water' },
        { id: 2, name: 'Bat' },
        { id: 3, name: 'Ball' },
        { id: 4, name: 'Parking' },
        { id: 5, name: 'Locker' },
        { id: 6, name: 'Food' },
    ];

    const Get_all_data = async () => {


        const rulearray = boxRegister.termsAll.filter((item) => item.check).map(i => i.description)

        const formData = new FormData();
        formData.append('name', boxRegister.BoxName);
        formData.append('address', boxRegister.Address);
        formData.append('box_open_time', boxRegister.OpenTime);
        formData.append('box_close_time', boxRegister.CloseTime);
        formData.append('morn_start_time', boxRegister.Mopen);
        formData.append('morn_end_time', boxRegister.Mclose);
        formData.append('morn_price', boxRegister.Mprice);
        formData.append('after_start_time', boxRegister.Aopen);
        formData.append('after_end_time', boxRegister.Aclose);
        formData.append('after_price', boxRegister.Aprice);
        formData.append('even_start_time', boxRegister.Eopen);
        formData.append('even_end_time', boxRegister.Eclose);
        formData.append('even_price', boxRegister.Eprice);
        formData.append('sports', boxRegister.sports);
        formData.append('box_rules', rulearray);
        formData.append('tournament_price', boxRegister.TounamentPrice);
        formData.append('facility', boxRegister.fecilities);
        formData.append('terms', rulearray);
        formData.append('ss_morning_price', boxRegister.SMprice);
        formData.append('ss_afternoon_price', boxRegister.SAprice);
        formData.append('ss_evening_price', boxRegister.SEprice);
        formData.append('ss_night_price', '0000');
        formData.append('sunday_tournament_price', boxRegister.STounamentPrice);
        formData.append('Lenght', boxRegister.Lenght);
        formData.append('Width',boxRegister.Width);
        formData.append('Height',boxRegister.Height);
        formData.append('transaction_id', '0000');
        formData.append('amount', '500');
        formData.append('email', 'sahdevdomadiya9@gmail.com');
        
        
        boxRegister.images.forEach((image, index) => {
            const newImageUri = "file:///" + image.split("file:/").join("");
            
            const typefile = image.split('.').pop();
            formData.append(`img${index + 1}`, {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: image.split("/").pop(),
            });
        });
        console.log(type, "==type ");
        if(type == "Edit"){
            formData.append('updateImage',boxRegister.updateimage == true ? "yes" : "no" );
            console.log("==updatediamge => ",boxRegister.updateimage == true ? "yes" : "no");
            formData.append('operation',"updateBox" );
            formData.append('box_id',boxRegister.id );
        }
        return
        axios({
            url: `${APIS.ADMIN_bASE_URL}${APIS.ADD_BOX}`,
            method: 'POST',
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                // setIsLoading(false)
                console.log('Response:', response?.data);
                showMessage({
                    message: response?.data?.message,
                    type: response.data.success ? 'success' : 'danger',
                    backgroundColor: response.data.success ? "green" : 'red', // background color
                    icon: response.data.success ? "success" : 'danger', // background color
                    color: "#fff", // text color
                    onHide: () => {
                        // response.data.success && navigation.navigate(Routs.OtpScreen)
                    }
                });
            })
            .catch(error => {
                showMessage({
                    message: 'something went wrong',
                    type: "danger",
                    backgroundColor: "red",
                    color: "#fff",
                    icon: 'danger'
                });
                // setIsLoading(false)
                console.error('Error:', error);
            });
    }


    const handletxtChange = (txt) => {
        setaddrule(txt)
    };
    const handleAddTodo = () => {
        if (addrule.trim() !== '') {
            dispatch(addOneRule(addrule));
            setaddrule('');
        }
    };
    const renderItem = ({ item, index }) => {

        const isFound = boxRegister.fecilities.some(obj => obj == item.name)
        return (

            <TouchableOpacity
                onPress={() => {
                    dispatch(setArrays({ fieldName: 'fecilities', text: item.name }));

                }}
                style={{
                    borderColor: isFound ? Colors.blue : Colors.sky,
                    borderWidth: isFound ? 3 : 1,
                    flex: 1,
                    padding: wp(2),
                    borderRadius: 8,
                    alignItems: 'center',
                    margin: wp(2)

                }}
            >
                <Text style={{ color: '#000' }}>{item.name}</Text>
            </TouchableOpacity>

        );
    };
    const rulesData = ({ item, index }) => {
        return (
            <View style={styles.checkview}>

                <CheckBox
                    style={{ marginHorizontal: wp(2) }}
                    onClick={() => dispatch(ruleChecked(item.id))}
                    isChecked={item.check}
                />
                <Text style={{ fontSize: wp(4), color: '#000', flex: 1 }}>
                    {item.description}</Text>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={130}
            extraScrollHeight={130}
            contentContainerStyle={{ flexGrow: 1 }} >

            <View style={{ flex: 1 }}>

                <Text style={styles.titel}>Add Falicity and rules</Text>

                <Text style={[styles.titel, { fontSize: wp(4) }]}>Select Facilities</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={3}
                />

                <Text style={[styles.titel, { fontSize: wp(4) }]}>Select Rules</Text>
                <FlatList
                    data={boxRegister.termsAll}
                    renderItem={rulesData}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }}>
                    <Text style={{ fontSize: wp(8), color: '#000', marginStart: wp(9), alignSelf: 'center' }}>
                        +
                    </Text>

                    <Input called={false} onChangeText={handletxtChange} name={'Enter your Rules'} headerText={''} eye={false} two={true} img={ImagePath.Locaker} defaults={addrule} />
                </View>
                <TouchableOpacity style={[styles.btnstyle, { marginBottom: 1 }]} onPress={handleAddTodo}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4), }}>
                        Add Rules
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnstyle} onPress={() => {
                    // console.log(addrule, "==adds")
                    Get_all_data()
                }}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4), }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>
    );
};

export default RulesScreen;

const styles = StyleSheet.create({
    btnstyle: {
        backgroundColor: Colors.blue,
        marginHorizontal: wp(7),
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        marginTop: hp(3),
        marginBottom: hp(4)
    },
    titel: {
        marginLeft: wp(4),
        marginTop: hp(1),
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
    }, checkview: {
        flexDirection: 'row',
        padding: hp(1),
        justifyContent: "flex-start",

    }
});

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
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
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';


import { AppContext } from '../Context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setBoxRegister, setArrays } from '../../Redux/Slices/boxRegisterSlice';
const TimeScreen = ({ navigation, route }) => {
    const { TimeData, setTimeData } = useContext(AppContext)


    const dispatch = useDispatch();
    const boxRegister = useSelector((state) => state.boxregister.boxRegister)

    const { type } = route.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [activebt, setactivebt] = useState('');

    // const [Mopen, setMopen] = useState('');
    // const [Mclose, setMclose] = useState('');
    // const [Mprice, setMprice] = useState('');
    // const [SMprice, setSMprice] = useState('');
    // const [Aopen, setAopen] = useState('');
    // const [Aclose, setAclose] = useState('');
    // const [Aprice, setAprice] = useState('');
    // const [SAprice, setSAprice] = useState('');
    // const [Eopen, setEopen] = useState('');
    // const [Eclose, setEclose] = useState('');
    // const [Eprice, setEprice] = useState('');
    // const [SEprice, setSEprice] = useState('');

    // const [TounamentPrice, setTounamentPrice] = useState('');
    // const [STounamentPrice, setSTounamentPrice] = useState('');
    const { EditBox } = useContext(AppContext)

    useEffect(() => {
        getStore(type);
    }, []);

    const handleInputChange = (fieldName, text) => {
        dispatch(setBoxRegister({ fieldName, text }))
        setTimeData(fieldName, text);
        console.log(boxRegister, "========datasssssss");
    };

    const getStore = async (type) => {
        if (type == "Edit") {
            const item = EditBox;
            setTimeData({
                Mopen: item.morn_start_time, Mclose: item.morn_start_time, Mprice: item.morn_price, Aopen: item.after_start_time,
                Aclose: item.after_end_time, Aprice: item.after_price, Eopen: item.night_start_time, Eclose: item.night_end_time, Eprice: item.night_price,
                SMprice: item.ss_morning_price, SAprice: item.ss_afternoon_price, SEprice: item.ss_night_price, TounamentPrice: item.tournament_price, STounamentPrice: item.sunday_tournament_price
            })
        }
    }

    const setactivebst = timeType => {
        console.log(`Opening time picker for: ${timeType}`, isDatePickerVisible);
        setactivebt(timeType);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const convertInsemple = (date) => {
        const twelveHourFormat = moment(date, 'HH:mm').format('hh:mm a');
        console.log(date, "====> ", twelveHourFormat);
        return twelveHourFormat;
    }

    const handleConfirm = date => {

        setDatePickerVisibility(false);
        console.log(date, "===");
        const twelveHourFormat = moment(date).format('HH:mm:ss');
        // const twelveHourFormat = moment(date, 'HH:mm').format('hh:mm a');
        // const updatedTimeData = { ...TimeData };
        console.log(twelveHourFormat, "===s");
        switch (activebt) {
            case '1':
                handleInputChange('Mopen', twelveHourFormat)
                break;
            case '2':
                handleInputChange('Mclose', twelveHourFormat)
                break;
            case '3':
                handleInputChange('Aopen', twelveHourFormat)
                break;
            case '4':
                handleInputChange('Aclose', twelveHourFormat)
                break;
            case '5':
                handleInputChange('Eopen', twelveHourFormat)
                break;
            case '6':
                handleInputChange('Eclose', twelveHourFormat)
                break;

            default:
                break;
        }

    };
    const check_back = () => {

        navigation.navigate(Routs.RulesScreen, { type: type })

    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.titel}>Add your personal details</Text>
                <Text style={{ marginStart: wp(4), marginTop: wp(3) }}>
                    Set time and rate
                </Text>
                <View style={{ flex: 1, marginBottom: hp(10) }}>
                    <View>
                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Morning slot</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Input
                                input={convertInsemple(TimeData.Mopen)}
                                editfalse={true}
                                click={() => setactivebst('1')}
                                called={false}
                                name={'Open time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                            <Input
                                input={convertInsemple(TimeData.Mclose)}
                                editfalse={true}
                                click={() => setactivebst('2')}
                                called={false}
                                name={'Close time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                        </View>
                        <Input
                            defaults={TimeData.Mprice}
                            called={true}
                            click_dis={true}
                            onChangeText={(txt) => handleInputChange('Mprice', txt)}
                            name={'Moring Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                        <Input
                            defaults={TimeData.SMprice}
                            called={true}
                            click_dis={true}
                            onChangeText={(txt) => handleInputChange('SMprice', txt)}
                            name={'Sunday Moring Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                    </View>
                    <View>
                        <Text style={[styles.titel, { fontSize: wp(4) }]}>
                            Afternoon slot
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Input
                                input={convertInsemple(TimeData.Aopen)}
                                editfalse={true}
                                click={() => setactivebst('3')}
                                called={false}
                                name={'Open time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                            <Input
                                input={convertInsemple(TimeData.Aclose)}
                                editfalse={true}
                                click={() => setactivebst('4')}
                                called={false}
                                name={'Close time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                        </View>
                        <Input
                            defaults={TimeData.Aprice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('Aprice', txt)}
                            name={'Afternoon Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                        <Input
                            defaults={TimeData.SAprice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('SAprice', txt)}
                            name={'Sunday Afternoon Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                    </View>
                    <View>
                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Evening slot</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Input
                                input={convertInsemple(TimeData.Eopen)}
                                editfalse={true}
                                click={() => setactivebst('5')}
                                called={false}
                                name={'Open time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                            <Input
                                input={convertInsemple(TimeData.Eclose)}
                                editfalse={true}
                                click={() => setactivebst('6')}
                                called={false}
                                name={'Close time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                        </View>
                        <Input
                            defaults={TimeData.Eprice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('Eprice', txt)}
                            name={'Evening Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                        <Input
                            defaults={TimeData.SEprice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('SEprice', txt)}
                            name={'Sunday Evening Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Tounament slot</Text>
                        <Input
                            defaults={TimeData.TounamentPrice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('TounamentPrice', txt)}
                            name={'Tournament price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                        <Input
                            defaults={TimeData.STounamentPrice}
                            click_dis={true}
                            called={true}
                            onChangeText={(txt) => handleInputChange('STounamentPrice', txt)}
                            name={'Sunday Tournament Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                    </View>
                    {/* <View>
                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Sunday price</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Input
                                input={Nopen}
                                editfalse={true}
                                click={() => setactivebst('7')}
                                called={false}
                                name={'Open time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                            <Input
                                input={Nclose}
                                editfalse={true}
                                click={() => setactivebst('8')}
                                called={false}
                                name={'Close time'}
                                img={ImagePath.time}
                                headerText={''}
                                two={true}
                            />
                        </View>
                        <Input
                            click_dis={true}
                            called={false}
                            onChangeText={(txt) => setNprice(txt)}
                            name={'Night Price'}
                            img={ImagePath.rupee}
                            headerText={''}
                            two={true}
                        />
                    </View> */}
                </View>
                <View style={styles.btnview}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.pop()}>
                        <Text style={styles.btntxt}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => check_back()}>
                        <Text style={styles.btntxt}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log(boxRegister, "===data")}>
                        <Text style={styles.btntxt}>check</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    isVisible={isDatePickerVisible}
                    is24hour={false}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
        </View>
    );
};

export default TimeScreen;

const styles = StyleSheet.create({
    btnview: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: wp(5),
    },
    btntxt: { color: '#fff', fontSize: wp(4) },
    btn: {
        flex: 1,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        marginHorizontal: wp(3),
        padding: wp(3),
        borderRadius: 5,
    },
    titel: {
        marginLeft: wp(4),
        marginTop: hp(1),
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
    },
});

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList, Image, ScrollView
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
import DatePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

const TimeScreen = ({ navigation }) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [is12, setis12] = useState(false);
    const [activebt, setactivebt] = useState('');

    const [Mopen, setMopen] = useState('');
    const [Mclose, setMclose] = useState('');
    const [Aopen, setAopen] = useState('');
    const [Aclose, setAclose] = useState('');
    const [Eopen, setEopen] = useState('');
    const [Eclose, setEclose] = useState('');
    const [Nopen, setNopen] = useState('');
    const [Nclose, setNclose] = useState('');


    useEffect(() => {
        if (isDatePickerVisible) {
            // showDatePicker();
            console.log('if');
        } else {
            console.log('else');
        }
    }, [isDatePickerVisible]);

    // useEffect(() => {
    //     if (isDatePickerVisible) {
    //         hideDatePicker();
    //     } else {
    //         // showDatePicker();
    //     }
    // }, [activebt]);


    const setActivceAclick = (timeType) => {
        console.log(`Opening time picker for: ${timeType}`, isDatePickerVisible);
        setactivebt(timeType);
        setDatePickerVisibility(true);
    };

    const handletxtChange = () => {

    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleConfirm = (date) => {

        const twelveHourFormat = moment(date, "HH:mm").format("hh:mm A");
        setDatePickerVisibility(false);
    };

    return (
        <View style={{ flex: 1, }}>
            <ScrollView >

                <Text style={styles.titel}>Add your personal details</Text>
                <Text style={{ marginStart: wp(4), marginTop: wp(3) }}>
                    Set time and rate
                </Text>
                <View style={{ flex: 1, marginBottom: hp(10) }}>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Morning slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input input={Mopen} editfalse={true} click={() => setActivceAclick("1")} called={false} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input input={Mclose} editfalse={true} click={() => setActivceAclick("2")} called={false} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Moring Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Afternoon slot</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Input input={Aopen} editfalse={true} click={() => setActivceAclick("3")} called={false} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input input={Aclose} editfalse={true} click={() => setActivceAclick("4")} called={false} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Afternoon Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Evening slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input input={Eopen} editfalse={true} click={() => setActivceAclick("5")} called={false} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input input={Eclose} editfalse={true} click={() => setActivceAclick("6")} called={false} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Evening Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View>

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Night slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input input={Nopen} editfalse={true} click={() => setActivceAclick("7")} called={false} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input input={Nclose} editfalse={true} click={() => setActivceAclick("8")} called={false} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Night Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>


                </View>
                <View style={styles.btnview}>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btntxt}>back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(Routs.RulesScreen)}>
                        <Text style={styles.btntxt}>Next</Text>
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
    )
}

export default TimeScreen

const styles = StyleSheet.create({
    btnview: {
        flexDirection: 'row', flex: 1, position: 'absolute', bottom: wp(5),
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
})
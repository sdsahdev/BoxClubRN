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
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';

const Time = ({ navigation }) => {
    const handletxtChange = () => {

    }
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

                            <Input called={false} onChangeText={handletxtChange} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input called={false} onChangeText={handletxtChange} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Moring Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Afternoon slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input called={false} onChangeText={handletxtChange} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input called={false} onChangeText={handletxtChange} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Afternoon Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Evening slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input called={false} onChangeText={handletxtChange} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input called={false} onChangeText={handletxtChange} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Evening Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>
                    <View >

                        <Text style={[styles.titel, { fontSize: wp(4) }]}>Night slot</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Input called={false} onChangeText={handletxtChange} name={'Open time'} img={ImagePath.time} headerText={''} two={true} />
                            <Input called={false} onChangeText={handletxtChange} name={'Close time'} img={ImagePath.time} headerText={''} two={true} />
                        </View>
                        <Input called={false} onChangeText={handletxtChange} name={'Night Price'} img={ImagePath.rupee} headerText={''} two={true} />
                    </View>


                </View>
                <View style={styles.btnview}>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btntxt}>back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Rules")}>
                        <Text style={styles.btntxt}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Time

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
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
import React, { useState, useRef, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import ProgressLoader from 'rn-progress-loader';
import Input from '../Commponent/Input';
import CheckBox from 'react-native-check-box'

const Rules = () => {
    const data = [
        { id: 1, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
    ];


    const Rule = [
        { id: 1, description: 'The Primary function of this facility is to serve the recreational, educational, wellness and sports needs of the users.' },
        { id: 2, description: 'Organized activities, events, tournaments, etc. in the field must have a reservation and confirmed payment.' },
        { id: 3, description: 'GOG Multi-sports turf do not assume liability for property loss, theft or any injuries resulting from any activity, event or coaching.' },
        { id: 4, description: 'Possession or Consumption of alcoholic beverages, public intoxication is prohibited in the facility.' },
        { id: 5, description: 'Smoking, chewing tobacco & chewing gum is prohibited.' },
        { id: 6, description: 'Individuals or organizations cannot conduct commercial operations at the venue without prior consent.' },
        { id: 7, description: 'Management reserves the right to inspect any bag for the prohibited items.' },
        { id: 8, description: 'This premise is monitored by security cameras for your safety.' },
        { id: 9, description: 'Boots with Metal studs are prohibited.' },
        { id: 11, description: 'The Management reserves the right to evict any individual for any offensive, violent, abusive, discriminatory behavior of any kind shown towards any of the staff as well as other customers.' },
        { id: 12, description: 'All customers are to leave the pitch/ground once their time slot has been completed.' },
        { id: 13, description: 'Not more than 14 players at a time on field/ground. More than 14 players on filed will be considered an event and event charges will be applicable.' },
        { id: 14, description: 'Outside food and Beverages not permissible.' },
        { id: 15, description: 'Right of admission reserved.' },
        { id: 16, description: 'Children under the age of 10 years must be accompanied by a guardian (16 years or over) at all times.' },
    ];

    const handletxtChange = () => { };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginHorizontal: wp(3), marginVertical: hp(1) }}>
                <TouchableOpacity
                    style={{
                        borderColor: Colors.blue,
                        borderWidth: 1,
                        flex: 1,
                        padding: wp(2),
                        borderRadius: 8,
                        alignItems: 'center',

                    }}
                >
                    <Text style={{ color: '#000' }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const rulesData = ({ item, index }) => {
        return (
            <View style={styles.checkview}>

                <CheckBox
                    style={{ marginStart: hp(4), marginHorizontal: wp(2) }}
                    onClick={() => {
                    }}
                    isChecked={true}
                />
                <Text style={{ fontSize: wp(4), color: '#000' }}>
                    {item.description}</Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text style={styles.titel}>Add your personal details</Text>
                <Text style={{ marginStart: wp(4), marginTop: wp(3) }}>
                    Add Falicity and rules
                </Text>
                <Text style={[styles.titel, { fontSize: wp(4) }]}>Facilities</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={3}
                />
                <TouchableOpacity style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4) }}>
                        + Add Facilities
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.titel, { fontSize: wp(4) }]}>Rules</Text>
                <FlatList
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                    }}
                    data={Rule}
                    renderItem={rulesData}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }} >

                    <Text style={{ fontSize: wp(8), color: '#000', marginStart: wp(9), alignSelf: 'center' }}>
                        +
                    </Text>
                    <Input called={false} onChangeText={handletxtChange} name={'Enter your Rules'} headerText={''} eye={false} two={true} />
                </View>

                <TouchableOpacity style={styles.btnstyle}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: wp(4), }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Rules;

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
        marginTop: hp(2)
    }
});

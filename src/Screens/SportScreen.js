import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList, Image
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

const SportScreen = ({ navigation }) => {

    const [selectSport, setselectSport] = useState([]);

    const data = [
        { id: 1, name: 'Cricket', image: ImagePath.sportdata },
        { id: 2, name: 'Cricket', image: ImagePath.sportdata },
        { id: 3, name: 'Cricket', image: ImagePath.sportdata },
        { id: 4, name: 'Cricket', image: ImagePath.sportdata },
        { id: 5, name: 'Cricket', image: ImagePath.sportdata },
    ];

    const handleclick = (item) => {

        const check = selectSport.filter(i => item.id === i.id)
        if (!check) {
            selectSport.push[item.id]
            console.log(selectSport, "==selectSport");
        } else {
            const updatedSelectSport = selectSport.filter(i => i.id !== item.id);
            setselectSport(updatedSelectSport);
            console.log(item.id, "==selectSport remove");
        }

    }

    const renderItem = ({ item, index }) => {
        const isFound = selectSport.some(obj => obj.id == item.id)
        return (

            <TouchableOpacity onPress={() => {
                if (isFound) {
                    setselectSport(selectSport.filter(i => i.id != item.id))
                } else {
                    setselectSport([...selectSport, item])
                }
            }} style={{ flex: 1, alignItems: 'center' }}>

                <Image
                    source={item.image}
                    style={{
                        height: hp(15),
                        backgroundColor: '#fff',
                        padding: wp(10),
                        resizeMode: 'center',
                        borderRadius: 10,
                        marginTop: hp(2),
                        borderColor: isFound ? 'red' : 'gray'
                        , borderWidth: 1,
                    }}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.titel}>Add your personal details</Text>
            <Text style={{ marginStart: wp(4), marginTop: wp(3) }}>
                Select Available sport
            </Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            <View style={styles.btnview}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(Routs.TimeScreen)}>
                    <Text style={styles.btntxt}>back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntxt}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SportScreen;

const styles = StyleSheet.create({
    btnview: {
        flexDirection: 'row', flex: 1, position: 'absolute', bottom: wp(5)
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
        marginTop: hp(4),
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
    },
});

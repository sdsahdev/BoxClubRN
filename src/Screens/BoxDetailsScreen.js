import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Colors, ImagePath, Routs } from '../AllData/Utill';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Titels from '../Commponent/Titels';
import Facilities from '../Commponent/Facilities';

const BoxDetailsScreen = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

            <View style={styles.imageContainer}>
                <FastImage
                    source={ImagePath.box2}
                    style={styles.image}
                    resizeMode="stretch"
                />
                <View style={styles.imagesOverlay}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <FastImage
                            source={ImagePath.backbg}
                            style={styles.image1}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("EditBoxDScreen")}>
                        <FastImage
                            source={ImagePath.share}
                            style={styles.image2}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={styles.bottomView}>
                <Titels text1={"titel"} text2={" ₹"} />
                <Text style={{ marginVertical: wp(2), marginHorizontal: wp(4) }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .
                </Text>
                <Titels text1={"Available sports"} />
                <Titels text1={"Location"} />
                <View style={styles.locationview}>
                    <TouchableOpacity >

                        <FastImage
                            source={ImagePath.Location}
                            style={styles.mapimage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>

                <Titels text1={"Facilities"} />

                <View style={styles.facilityView}>

                    <View>
                        <Facilities img={ImagePath.waiting} text3={"Waiting Area"} />
                        <Facilities img={ImagePath.bat} text3={"bat"} />
                    </View>
                    <View>
                        <Facilities img={ImagePath.water} text3={"Water"} />
                        <Facilities img={ImagePath.parking} text3={"Parking"} />
                    </View>


                </View>
                <TouchableOpacity >
                    <Titels text1={"View Venue Rules"} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate(Routs.DateTimeScreen)}>
                    <Text style={styles.payment}>Book You slot</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    );
};

export default BoxDetailsScreen;

const styles = StyleSheet.create({
    btn: { margin: wp(3), height: 40, flex: 1, marginBottom: hp(5) },
    payment: {
        color: '#fff',
        backgroundColor: Colors.blue,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: wp(5),
        borderRadius: wp(2),
    },
    bottomView: {
        backgroundColor: Colors.sky,
        flex: 1,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        marginTop: hp(35),
    },
    get bottomView() {
        return this._bottomView;
    },
    set bottomView(value) {
        this._bottomView = value;
    },

    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },

    bookbtn: {
        backgroundColor: '#027850',
        position: 'relative',
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2),
        flex: 1,
        marginHorizontal: wp(2),
        marginTop: hp(2),
    },

    facilityView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: wp(2),
        marginTop: hp(2),
    },
    addrestxt: { marginLeft: wp(5), marginBottom: hp(1) },
    locationview: {
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
        height: hp(18),
    },
    mapimage: {
        width: '90%',
        height: hp(15),
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
        tintColor: Colors.blue
    },
    container: {
        width: '100%',
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: hp(40),
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
    },
    imagesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(4),
        marginLeft: wp(2),
    },
    image1: {
        width: 40,
        height: 40,
        margin: 8,
    },
    image2: {
        width: 40,
        height: 40,
        margin: 8,
        marginRight: 15,
    },
    clocks: {
        width: wp(5),
        height: wp(5),
    },

    detailsText: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        backgroundColor: '#000',
    },
    detailsText2: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        right: 0,
        width: '100%',
        backgroundColor: '#000',
    },
});

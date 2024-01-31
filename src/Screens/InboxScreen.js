import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native'; // Import the hook
import ProgressLoader from 'rn-progress-loader';
import TopHeader from '../Commponent/TopHeader';
import SearchBar from '../Commponent/SearchBar';
import { Colors, ImagePath } from '../AllData/Utill';
import * as APIS from '../APIS/Urls'
import axios from 'axios';

const InboxScreen = ({ navigation }) => {
    const [idata, setidata] = useState([])
    const [idata2, setidata2] = useState([]);

    const [idataUser, setidataUser] = useState([])
    const [idata2User, setidata2User] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [Visible, setVisible] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [SelectItems, setSelectItems] = useState("1");
    const isFocused = useIsFocused(); // Get the screen's focused state
    // useEffect(() => {

    //     handleAdminCheck();
    // }, [])
    useEffect(() => {
        // Call the API when the component mounts
        //console.log("+++++++");
        inboxapi();
    }, [isFocused]);

    const inboxapi = async () => {
        setIsLoading(true)
        const Token = await AsyncStorage.getItem('token');

        const body_data = {
            email: "sahdevdomadiya7@gmail.com",
        }

        axios({


            url: `${APIS.ADMIN_bASE_URL}${APIS.Admin_INBOX}`,
            method: 'POST',
            data: body_data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Change to 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                setIsLoading(false)
                if (response.data.success) {

                    setidata(response.data.admin_booking)
                    setidata2(response.data.admin_booking)

                    setidata2User(response.data.user_booking)
                    setidataUser(response.data.user_booking)
                    // showMessage({
                    //     message: "",
                    //     type: response.data.success ? 'success' : 'danger',
                    //     backgroundColor: response.data.success ? "green" : 'red', // background color
                    //     icon: response.data.success ? "success" : 'danger', // background color
                    //     color: "#fff", // text color

                    // });
                }
            })
            .catch(error => {
                setIsLoading(false)
                showMessage({
                    message: 'something went wrong',
                    type: "danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                    icon: 'danger'
                });
                // setIsLoading(false)
                console.error('Error:', error);
            });



    }
    const handleAdminCheck = async () => {

        const phoneNumberToCheck = await AsyncStorage.getItem('adminnum');
        const hasBookingRights = await checkAdminByPhoneNumber(phoneNumberToCheck);
        if (hasBookingRights) {
            // Admin has booking rights
            //console.log(hasBookingRights.book_right, 'admin found');
            //console.log(hasBookingRights.status, 'admin found');
            // setbookingrigh(hasBookingRights.book_right)
            // setloginright(hasBookingRights.status)
            if (hasBookingRights.status === 'block') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'loginSceen' }],
                });
            }
            // Add your logic here, e.g., render specific UI, perform actions, etc.
        } else {
            //console.log('superadmin found');
            // Admin does not have booking rights or is not active
            // Add your logic here, if needed
        }
    };

    const checkAdminByPhoneNumber = async (phoneNumber) => {
        try {
            const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllThirdParty');
            if (response.ok) {
                const data = await response.json();
                //console.log(data, '===admin');
                if (data && data.admins) {
                    const matchingAdmin = data.admins.find(admin => admin.phone === phoneNumber);
                    if (matchingAdmin) {

                        //console.log(matchingAdmin, '=====match===');
                        return matchingAdmin;
                    }
                }

            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
        return false; // Default to no booking rights or on error
    };

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-indexed
        const year = date.getFullYear();

        // Pad day and month with leading zero if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    };
    const handleSerach = e => {
        setSearchText(e)
        let text = e.toLowerCase();
        let filteredData = idata2User.filter(item => {
            return (
                item.code.toLowerCase().match(text) ||
                item.time.toLowerCase().match(text) ||
                item.date.toLowerCase().match(text) ||
                item.BoxName.toLowerCase().match(text) ||
                item.amount.toLowerCase().match(text) ||
                item.message.toLowerCase().match(text)
            );
        });
        if (!text || text === '') {
            setSearchText('');
            inboxapi();
        } else if (!filteredData.length) {
            //console.log('no data');
        } else if (Array.isArray(filteredData)) {
            setidataUser(filteredData);
        }
    };

    const handlemodal = () => {
        //console.log("truew");
        setVisible(true)
    }
    const filterData = (keywork) => {
        const filtered = idata2User.filter(item => {
            // Replace this condition with your own filtering logic
            return item.status === keywork;
        });

        setidataUser(filtered);
        setVisible(false);
    };
    const formatDateTime = (inputDateTime) => {
        const date = new Date(inputDateTime);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-indexed
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    const renderItem = ({ item }) => {

        // const bookingTime = formatDateTime(item.bookingTime)

        // const formattedDate = formatDate(item.date)

        return (
            <View style={styles.timeSlot}>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>code</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{item.id}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Username</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Phone</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>

                    <Text style={styles.textLeft}>Time</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Date</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>BoxName</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Amount</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Amount</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>message</Text>
                    <Text style={styles.textLeft}>{item.start_time}</Text>
                </View>
                {/* {item.message === 'booked' ?
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Cancel', {
                        ids: item.id
                    })} >
                    <Text style={styles.payment}>
                    Cancellation
                    </Text>
                </TouchableOpacity> : null} */}
            </View>
        );
    };
    return (
        <View style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View >
                        <TopHeader name={"Inbox"} />
                    </View>
                    <SearchBar searchText={searchText} onChangeSearchText={handleSerach} press={() => handlemodal()} filter={true} />

                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(12) }}>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setSelectItems("1")}>
                                <Text style={styles.payment}>
                                    Admin side Booking
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setSelectItems("2")} >
                                <Text style={styles.payment}>
                                    User side Booking
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            style={{ marginTop: hp(1), alignSelf: 'center', width: '95%', }}
                            data={SelectItems === '1' ? idata : idataUser}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                        <Modal
                            visible={Visible}
                            transparent={true}
                            mationType="slide">
                            <TouchableWithoutFeedback onPress={() => setVisible(false)}>

                                <View style={styles.modalContent}>


                                    <View style={{
                                        paddingVertical: hp(1), borderRadius: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundColor: '#fff',
                                        padding: 20,
                                        borderRadius: 8,
                                        elevation: 5,
                                        position: 'absolute',
                                        alignSelf: 'center',
                                        top: '40%',
                                    }}>
                                        <TouchableOpacity style={styles.mbtn} onPress={() => filterData("booked")} >
                                            <Text style={{ color: '#fff' }}>Booked</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.mbtn} onPress={() => filterData("cancel request")} >
                                            <Text style={{ color: '#fff' }}>Cancel Request</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.mbtn} onPress={() => filterData("cancelled")} >

                                            <Text style={{ color: '#fff' }}>Cancelled</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </View>

                </ScrollView>

            </View>
            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={Colors.blue} />
        </View>
    )

}

export default InboxScreen

const styles = StyleSheet.create({
    mbtn: { alignSelf: 'center', marginVertical: hp(0.5), backgroundColor: Colors.blue, padding: hp(2), borderRadius: 3, width: wp(40), alignItems: 'center' }
    , modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'

    },
    modalText: {
        marginBottom: hp(2),
        color: 'red',
        flex: 1,
        fontSize: 15
    },
    modalText2: {
        color: 'red',
        flex: 1,
    },
    btn: { margin: wp(3), height: 40, flex: 1 },
    payment: { color: '#fff', backgroundColor: Colors.blue, flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(4), borderRadius: wp(2), },
    timeSlot: {
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5),
        justifyContent: 'center',
        borderColor: Colors.blue,
        borderRadius: wp(2), paddingVertical: hp(1)
    }, textLeft: {
        alignSelf: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: 'top',
        justifyContent: 'flex-start',
        flex: 1,
        flexWrap: 'wrap', marginVertical: wp(0.5), fontWeight: 'bold', fontSize: wp(4)
    }
})
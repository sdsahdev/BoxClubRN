

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import RazorpayCheckout from 'react-native-razorpay';
// import { useRoute } from '@react-navigation/native';
import FlashMessage, {
  showMessage,
  hideMessage,
  FlashMessageManager,
} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressLoader from 'rn-progress-loader';
import TopHeader from '../Commponent/TopHeader';
import CalanderFile from '../Commponent/CalanderFile';
import SlotTime from '../Commponent/SlotTime';
import { Colors } from '../AllData/Utill';

const DateTimeScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { item } = route.params;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caldate, setcalldat] = useState({});
  const [data, setdatea6] = useState([])
  const [apidate, setapidate] = useState([]);
  const [bookingrights, setbookingrigh] = useState();
  const [loginright, setloginright] = useState();
  const [isSuper, setisSuper] = useState();
  const [fDate, setfDate] = useState('')


  // useEffect(() => {
  //   fetchSuperAdminStatus();
  // }, [])

  const fetchSuperAdminStatus = async () => {
    try {
      handleAdminCheck();
      const isUser = await AsyncStorage.getItem('superAdmin');
      setisSuper(isUser); // Convert the string to a boolean
    } catch (error) {
      // Handle error
    }
  };


  const handleAdminCheck = async () => {

    const phoneNumberToCheck = await AsyncStorage.getItem('adminnum');
    const hasBookingRights = await checkAdminByPhoneNumber(phoneNumberToCheck);
    if (hasBookingRights) {
      setbookingrigh(hasBookingRights.book_right)
      setloginright(hasBookingRights.status)
      if (hasBookingRights.status === 'block') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'loginSceen' }],
        });
      }
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


  const slotapi = (date) => {
    setIsLoading(true)
    fetch('https://boxclub.in/APIs/index.php?what=getSlot', {
      method: 'POST', // Assuming you want to use POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        box_id: item.id,
        date: date,
      }),
    })
      .then(response => response.json())
      .then((data, index) => {
        // console.log(data.slots, "====dtaa");
        console.log(item.id, "====dt");
        setIsLoading(false)

        // Create a new array of modified response objects
        const modifiedResponse = data.slots.map((slot, index) => {
          // if (slot.time) {
          return {
            ...slot,
            id: index + 1
          };
          // }
          // return slot;
        });
        console.log(modifiedResponse[0]);
        setdatea6(modifiedResponse)

      })
      .catch(error => {
        setIsLoading(false)
        // Handle any errors here
        console.error('Error:', error);
        showMessage({
          message: "Please Try again later",
          type: "Danger",
          backgroundColor: "red", // background color
          duration: 5000,
          color: "#fff", // text color
        });
        console.error('Error:', error);
      });
  }


  const handleDateSelect = date => {

    setcalldat(date);

    const selectedDates = Object.keys(date).filter(key => date[key].selected);
    setapidate(selectedDates)
    //console.log(selectedDates, '---');
    if (selectedDates.length === 1) {
      const firstSelectedDate = selectedDates[0];
      setfDate(firstSelectedDate);
      slotapi(firstSelectedDate)
    }
  };

  const handletor = time => {
    // setEndTime(time);
    // //console.log(time, "++++end Times++++++++");
  };

  const csapi = () => {
    setIsLoading(true)
    const apiUrl = 'https://boxclub.in/APIs/index.php?what=checkSlot';

    const requestData = {
      start_time: startTime,
      end_time: endTime,
      box_id: item.id,
      // dates: apidate,
      // type: 'multi'
    };
    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        console.log('API response:', data);
        if (data.success) {

          // BookingPro(data.price);
          bookm();

        } else {
          showMessage({
            message: data.message,
            type: "Danger",
            duration: 10000,
            backgroundColor: "red", // background color
            color: "#fff", // text color
            onHide: () => {
            }
          });
        }
        // Handle the API response data here
      })
      .catch(error => {
        setIsLoading(false)
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }

  const bookm = async (paymentid, amounts) => {
    setIsLoading(true)
    const Token = await AsyncStorage.getItem('token');

    const apiUrl = 'https://boxclub.in/APIs/Admin/index.php?what=bookSlot';

    const requestData = {
      start_time: startTime,
      end_time: endTime,
      box_id: item.id,
      // dates: apidate,
      email: 'sahdevdomadiya8@gmail.com',
      amount: "100"
      // type: "multi",
      // payment_id: paymentid,
    };
    //console.log(requestData, "===res");

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: Token
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        //console.log('API response:', data);
        if (data.success) {
          slotapi(fDate)
          showMessage({
            message: `Your booking is successfull`,
            type: "Success",
            backgroundColor: "green", // background color
            color: "#fff", // text color
            onHide: () => {

            }
          });
        } else {
          showMessage({
            message: data.message,
            type: "Danger",
            backgroundColor: "red", // background color
            color: "#fff", // text color
          });
        }
        // Handle the API response data here
      })
      .catch(error => {
        setIsLoading(false)
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }

  return (
    <View style={styles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View>
          <TopHeader name={'Book Your Slot'} back={true} navigation={navigation} />
        </View>
        {/* {//console.log(startTime, "==satrt===")}
        {//console.log(endTime, "==end===")} */}

        <Text style={styles.datess}>select date is required</Text>
        <View style={styles.thiView}>
          <CalanderFile datesselect={handleDateSelect} />
        </View>
        <View>

          {
            Object.keys(caldate).length !== 0 && startTime !== null && (
              (
                // Super admin: Show the "Book Now" button
                <TouchableOpacity style={styles.btn} onPress={() => csapi()}>
                  <Text style={styles.payment}>Book Now</Text>
                </TouchableOpacity>
              )
            )
          }

        </View>
          <SlotTime
            onStartTimeChange={(e) => setStartTime(e)}
            onEndTimeChange={(e) => setEndTime(e)}
            tor={handletor}
            data={data} />
        <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#fff"}
          color={Colors.blue} />
      </ScrollView>
    </View>
  );
}
export default DateTimeScreen;

const styles = StyleSheet.create({
  datess: { alignSelf: 'center', color: '#f97272', marginVertical: hp(1) },
  sold: { color: '#000' },
  thiView: { marginHorizontal: wp(10), },
  sendView: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
 
  },
  mainView: { flex: 1},
  btn: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    height: wp(12),
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.blue
  },
  payment: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: wp(5),
    justifyContent: 'center',
    padding: wp(3)
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginTop: hp(2)
  }
});
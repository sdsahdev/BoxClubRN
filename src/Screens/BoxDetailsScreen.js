import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Colors, ImagePath, Routs, Strings} from '../AllData/Utill';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Titels from '../Commponent/Titels';
import Facilities from '../Commponent/Facilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../Context/AppProvider';
import {useDispatch, useSelector} from 'react-redux';
import {
  setArrayList,
  setArrays,
  setBoxRegister,
  setCompleteBoxData,
  AddListRule,
} from '../../Redux/Slices/boxRegisterSlice';
import axios from 'axios';

const BoxDetailsScreen = ({navigation, route}) => {
  const {setEditBox} = useContext(AppContext);
  const {item} = route.params;

  const dispatch = useDispatch();
  const ReBoxFirst = useSelector(state => state.boxregister.boxRegister);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    console.log(item.id, '===details item');
    setEditBox(item);
    // AsyncStorage.setItem(Strings.BoxItemKey, JSON.stringify(item));
  }, []);
  const handleNavigation = () => {
    dispatch(
      setCompleteBoxData({
        updateimage: false,
        images: [item.img1, item.img2, item.img3],
        sports: item.sports_supported,
        fecilities: item.facility,
        id: item.id,
        admin_id: item.admin_id,
        BoxName: item.name,
        Address: item.address,
        OpenTime: item.box_open_time,
        CloseTime: item.box_close_time,
        Width: item.size,
        Mopen: item.morn_start_time,
        Mclose: item.morn_end_time,
        Mprice: item.morn_price,
        Aopen: item.after_start_time,
        Aclose: item.after_end_time,
        Aprice: item.after_price,
        Eopen: item.night_start_time,
        Eclose: item.night_end_time,
        Eprice: item.night_price,
        TounamentPrice: item.tournament_price,
        SMprice: item.ss_morning_price,
        SAprice: item.ss_afternoon_price,
        SEprice: item.ss_night_price,
        STounamentPrice: item.sunday_tournament_price,
        transaction_id: item.transaction_id,
        amount: item.amount,
        created_at: item.created_at,
        updated_at: item.updated_at,
        termsAll: [],
      }),
    );

    dispatch(AddListRule(item.terms_condition));
    navigation.navigate(Routs.AdminRegister, {type: 'Edit'});
  };

  const handleAddressSubmit = async () => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: '14, sahajanad villa, kosmada gam, kenal road, surat',
          key: 'AIzaSyDUCMJaiX1dvLNq2aHSfe858eUQlNjfqgE', // Replace with your API key
        },
      });

      console.log(response.data, "===get data from map api==");
      const result = response.data.results[0];
      if (result) {
        const location = result.geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } else {
        Alert.alert('Address not found', 'Please enter a valid address.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Failed to fetch location. Please try again.');
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: item.img1}}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.imagesOverlay}>
          {/* <TouchableOpacity onPress={() => console.log(ReBoxFirst, "====reboxfirst==")}> */}
          <TouchableOpacity onPress={() => navigation.pop()}>
            <FastImage
              source={ImagePath.backbg}
              style={styles.image1}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation()}>
            <FastImage
              source={ImagePath.share}
              style={styles.image2}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Titels text1={item.name} text2={`₹${item.morn_price}`} />
        <Text style={{marginVertical: wp(2), marginHorizontal: wp(4)}}>
          {item.address}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et . */}
        </Text>
        {/* <Titels text1={"Available sports"} /> */}
        <Titels text1={'Location'} />
        <View style={styles.locationview}>
          <TouchableOpacity
          onPress={()=> handleAddressSubmit()}>
            <FastImage
              source={ImagePath.Location}
              style={styles.mapimage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <Titels text1={'Facilities'} />
        <View style={styles.facilityView}>
          <View>
            <Facilities img={ImagePath.waiting} text3={'Waiting Area'} />
            <Facilities img={ImagePath.bat} text3={'bat'} />
          </View>
          <View>
            <Facilities img={ImagePath.water} text3={'Water'} />
            <Facilities img={ImagePath.parking} text3={'Parking'} />
          </View>
        </View>
        <TouchableOpacity>
          <Titels text1={'Venue rules'} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 10,
            borderWidth: 1.6,
            borderColor: Colors.blue,
          }}>
          {item?.terms_condition?.map((data, index) => {
            return (
              <View style={{flexDirection: 'row', padding: 5, flex: 1}}>
                <Text style={{paddingHorizontal: 4, color: 'black'}}>
                  {index < 9 ? `0${index + 1}` : index + 1}
                </Text>
                <Text style={{flexWrap: 'wrap', flex: 1, color: 'black'}}>
                  {data}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate(Routs.DateTimeScreen, {item: item})
          }>
          <Text style={styles.payment}>Book your slot</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BoxDetailsScreen;

const styles = StyleSheet.create({
  btn: {margin: wp(3), height: 40, flex: 1, marginBottom: hp(5)},
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
  addrestxt: {marginLeft: wp(5), marginBottom: hp(1)},
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
    tintColor: Colors.blue,
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

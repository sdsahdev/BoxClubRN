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
import React, {useState, useRef, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Strings, ImagePath, Routs} from '../AllData/Utill';
// import ProgressLoader from 'rn-progress-loader';
// import Input from '../Commponent/Input';
// import CheckBox from 'react-native-check-box';
import * as APIS from '../APIS/Urls';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  setArrayList,
  setArrays,
  setBoxRegister,
  setCompleteBoxData,
  AddListRule,
  defaultTermsAll,
} from '../../Redux/Slices/boxRegisterSlice';
const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.LoginReducer.user);
  const [data, setdata] = useState([]);

  const dispatch = useDispatch();
  const ReBoxFirst = useSelector(state => state.boxregister.boxRegister);
  useEffect(() => {
    GetAdminBox();
  }, []);

  const GetAdminBox = async () => {
    const body_data = {
      email: user.email,
    };
    axios({
      url: `${APIS.ADMIN_bASE_URL}${APIS.Admin_GET_BOX}`,
      method: 'POST',
      data: body_data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Change to 'application/json'
      },
    })
      .then(response => {
        // setIsLoading(false)
        console.log('Response:', response.data.boxes);
        setdata(response.data.boxes);
      })
      .catch(error => {
        showMessage({
          message: 'something went wrong',
          type: 'danger',
          backgroundColor: 'red', // background color
          color: '#fff', // text color
          icon: 'danger',
        });
        // setIsLoading(false)
        console.error('Error:', error);
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          margin: wp(4),
          borderRadius: 6,
          padding: 10,
        }}
        onPress={() =>
          navigation.navigate(Routs.BoxDetailsScreen, {item: item})
        }>
        <FastImage
          source={{uri: item.img1}}
          style={{
            width: '90%',
            height: hp(20),
            backgroundColor: '#000',
            alignSelf: 'center',
            margin: wp(4),
            borderRadius: 8,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: wp(8),
            marginBottom: wp(2),
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={{color: '#000', fontSize: wp(4.6)}}>{item.name}</Text>
            <Text>{item.address}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text style={{color: Colors.blue, fontSize: wp(6)}}>
              {item.morn_price}
            </Text>
            <Text style={{alignSelf: 'center', marginTop: 8}}>/hour</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const resteStore = () => {
    dispatch(
      setCompleteBoxData({
        updateimage: false,
        images: [],
        sports: [],
        fecilities: [],
        termsAll: defaultTermsAll,
      }),
      navigation.navigate(Routs.AdminRegister, {type: 'Add'})
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.blue}}>
      <Image
        style={{position: 'absolute', height: hp(17), width: '100%'}}
        source={ImagePath.homebg}
      />

      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop:hp(4.5)
        }}>
        {/* <FastImage
          source={ImagePath.menu}
          style={{width: wp(10), margin: hp(2), height: hp(8)}}
          resizeMode="contain"
        /> */}
        <Text
          style={{
            color: '#fff',
            fontSize: wp(7),
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          BoxClub
        </Text>
        {/* <FastImage
          source={ImagePath.notification}
          style={{width: wp(10), margin: hp(2), height: hp(8)}}
          resizeMode="contain"
        /> */}
      </View>
      <View style={styles.bottomview}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{padding: 5, marginBottom: hp(10)}}
        />
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: Colors.blue,
          position: 'absolute',
          bottom: hp(12),
          borderRadius: 50,
          right: wp(6),
          justifyContent: 'center',
        }}
        onPress={() => resteStore()}>
        <Text style={{fontSize: 30, color: '#fff', textAlign: 'center'}}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomview: {
    backgroundColor: '#f3f5f6',
    flex: 1,
    marginTop: hp(15),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingBottom: hp(15),
    marginBottom: hp(22),
  },
});

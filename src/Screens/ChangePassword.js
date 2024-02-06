import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, signal} from 'react';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Strings, ImagePath, Routs} from '../AllData/Utill';
import Input from '../Commponent/Input';
import ProgressLoader from 'rn-progress-loader';
import {showMessage} from 'react-native-flash-message';
import {loginUser} from '../../Redux/Slices/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import * as APIS from "../../src/APIS/Urls";


const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.LoginReducer);
  const [password, setpassword] = useState('dev@123');
  const [finalpassword, setfinalpassword] = useState('dev@123');

  const loginApi = async () => {
    if (password == finalpassword) {
      const body_data = {
        email: user.email,
        password: password,
        type: 'changePassword',
      };
      try {
        const response = await axios({
          url: `${APIS.ADMIN_bASE_URL}${APIS.Login}`,
          method: 'POST',
          data: body_data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response?.data);
        if(response?.data?.success ){
          navigation.navigate(Routs.BottomTabScreen)
        }
        showMessage({
          message: response?.data?.message,
          type: response?.data?.success ? 'success' : 'danger',
          backgroundColor: response?.data?.success ? 'green' : 'red',
          icon: response?.data?.success ? 'success' : 'danger',
          color: '#fff',
        });

      } catch (error) {
        console.error('Error:', error);

        showMessage({
          message: 'Something went wrong',
          type: 'danger',
          backgroundColor: 'red',
          color: '#fff',
          icon: 'danger',
        });
      }
    } else {
      showMessage({
        message:
          'Password and Confirm Password are not the same, Please enter same password',
        type: 'danger',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <Image
        source={ImagePath.bgmain}
        resizeMode="center"
        style={styles.bgimage}
      />
      <View style={{flex: 1}}>
        <View style={styles.imgstyle}>
          <FastImage
            source={ImagePath.boll}
            style={{height: hp(7), width: wp(20)}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titelText}>Chnage your password</Text>
        <View style={{marginTop: hp(4)}}>
          <Input
            called={false}
            onChangeText={text => setpassword(text)}
            name={'Enter your password'}
            img={ImagePath.loack}
            headerText={''}
            eye={true}
            defaults={password}
          />
          <Input
            called={false}
            onChangeText={text => setfinalpassword(text)}
            name={'Enter your confirm password'}
            img={ImagePath.loack}
            headerText={''}
            eye={true}
            defaults={finalpassword}
          />
        </View>

        <TouchableOpacity
          style={styles.btnstyle}
          onPress={() => {
            loginApi();
          }}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: wp(4)}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '35%',
    bottom: 1,
    justifyContent: 'flex-end',
  },
  imgstyle: {
    width: wp(14),
    height: hp(10),
    marginTop: hp(2),
    marginStart: hp(4),
  },
  titelText: {
    color: Colors.blue,
    fontSize: wp(6),
    marginHorizontal: hp(4),
    fontWeight: 'bold',
  },
  checkview: {
    flexDirection: 'row',
  },
  highight: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
  btnstyle: {
    backgroundColor: Colors.blue,
    marginHorizontal: wp(7),
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    marginTop: hp(3),
  },
});

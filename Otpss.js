import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useRef, useEffect} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Colors } from './src/AllData/Utill';


const Otpss = () => {
    const [otp, setOtp] = useState('');
    const otpInputRefs = Array.from({length: 4}, () => useRef(null));
    const handleOtpChange = (index, text) => {
        const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);
    
        setOtp(prevOtp => {
          const newOtp = prevOtp.split('');
          newOtp[index] = sanitizedText;
          return newOtp.join('');
        });
    
        // Move to the previous input if the current input is empty
        if (text === '' && index > 0) {
          otpInputRefs[index - 1].current.focus();
        }
    
        // Move to the next input if availables
        else if (text !== '' && index < otpInputRefs.length - 1) {
          otpInputRefs[index + 1].current.focus();
        } else {
          if (index != 0) {
            otpInputRefs[otp.length + 1]?.current.focus();
          }
        }
      };

      

  return (
   <View style={styles.otpContainer}>
          {Array.from({length: 4}).map((_, index) => (
            <TextInput
              key={index}
              ref={otpInputRefs[index]}
              style={[
                styles.input,
                otp.length === index ? styles.inputFocus : null,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index] || ''}
              onChangeText={text => handleOtpChange(index, text)}
            />
          ))}
        </View>
  )
}

export default Otpss

const styles = StyleSheet.create({  
    otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin:10
  },
  input: {
    width: wp(15),
    height: hp(8),
    borderColor: Colors.sky,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: wp(8),
    textAlign: 'center',
    color: Colors.black,
  },
  inputFocus: {
    borderColor: 'blue',
    borderWidth: 2, // Highlight the input in focus
  },})
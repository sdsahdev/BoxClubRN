import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Titels = ({ text1, text2 }) => {
    return (

        <View style={styles.TitelView}>

            <Text style={{
                width: 'auto',
                height: 'auto',
                fontSize:18,
                color:  "#000",
            }}>{text1}</Text>
            <Text style={styles.textStyle2}>{text2}</Text>
        </View>
    )


}


export default Titels;

const styles = StyleSheet.create({
    TitelView: { width: "100%", height: hp(3), flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(2), marginHorizontal: wp(4) },
    mainstyle: {
        width: "100%", height: hp(3), flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(4)
    },
    textStyle: {

        width: 'auto',
        height: 'auto',
       
      

    },
    textStyle2: {
        width: 'auto',
        height: 'auto',
        fontSize: 18,
        color: '#000',
        paddingRight: wp(10)
    },

})

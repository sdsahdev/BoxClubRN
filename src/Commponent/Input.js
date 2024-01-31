import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Strings, ImagePath } from '../AllData/Utill';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const Input = ({ name, onChangeText, headerText, eye, called, defaults, img, two, editfalse, click, input, click_dis }) => {
    const [secure, setSecure] = useState(false);
    // const [inputValue, setInputValue] = useState(defaults);

    const handleTextChange = (text) => {
        onChangeText(text); // Call the prop function to update the parent state
    };

    return (
        // <KeyboardAwareScrollView>

        <TouchableOpacity
            disabled={click_dis} style={{ flex: two && 1 }} onPress={click} >
            {headerText === '' ? null :
                <Text style={styles.headertx}>
                    {headerText}
                </Text>
            }
            <View style={styles.fillDetails}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        source={img}
                        style={styles.phnimage}
                        resizeMode="center"
                    />
                    <TextInput
                        editable={!editfalse}
                        selectTextOnFocus={!editfalse}
                        placeholderTextColor={Colors.placeColor}
                        secureTextEntry={secure}
                        keyboardType={called ? 'phone-pad' : null}
                        placeholder={name}
                        style={styles.inputFild}
                        onChangeText={handleTextChange} // Set the onChangeText prop
                        value={editfalse === true ? input : defaults} // Set the value prop for controlled input
                    />
                </View>
                {eye ? <View>
                    <TouchableOpacity onPress={() => setSecure(!secure)} style={{ alignSelf: 'center' }}>
                        <Image
                            source={secure ? ImagePath.hide : ImagePath.view}
                            style={{ alignSelf: 'flex-end', height: 20, width: 20, justifyContent: 'center', tintColor: Colors.blue }}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                </View> : null}

            </View>

        </TouchableOpacity>
        // </KeyboardAwareScrollView>

    );
};

export default Input;

// define your styles
const styles = StyleSheet.create({
    headertx: {
        marginHorizontal: wp(5),
        color: Colors.blue,
        fontWeight: 'bold',
    },
    phnimage: {
        width: wp(5),
        height: hp(5),
        tintColor: Colors.blue,
        alignSelf: 'center'
    },

    btn: { flex: 1 },
    container: {
        flex: 1,
    },

    fillDetails: {
        backgroundColor: '#fff',
        margin: wp(2),
        marginHorizontal: wp(5),
        paddingHorizontal: wp(2),
        borderRadius: wp(2),
        paddingVertical: hp(0.5),
        flexDirection: 'row',
        borderBottomColor: Colors.blue,
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputFild: {
        color: 'black',
        paddingLeft: wp(4),
        flexWrap: 'wrap',
        flex: 1,
        fontSize: wp(4),
    },
});

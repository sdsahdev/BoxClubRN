import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, ImagePath } from './src/AllData/Utill';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import CancelReq from './src/Screens/CancelReqScreen';
import InboxScreen from './src/Screens/InboxScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import CancelReqScreen from './src/Screens/CancelReqScreen';



const Tab = createBottomTabNavigator();


const TabButton = ({ item, onPress, accessibilityState }) => {
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    }, [focused]);


    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1 : 0.50 }]} >
            <View>
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
                >
                </Animatable.View>
                <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
                    <Image source={item.type} style={{
                        width: wp(6),
                        height: hp(4),
                        marginHorizontal: wp(2),
                        tintColor: focused ? "#fff" : Colors.blue,
                        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                    }} resizeMode="center" />
                    <Animatable.View ref={textViewRef}>
                        {focused && (
                            <Text style={{ color: '#fff', paddingHorizontal: 8 }}>{item.label}</Text>
                        )}
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const BottomTabScreen = () => {
    const TabArr = [
        {
            route: 'Home',
            label: 'Home',
            type: ImagePath.home, // Replace with actual image paths
            icon: 'home',
            component: HomeScreen,
            color: Colors.blue,
            alphaClr: Colors.sky,
        },
        {
            route: 'CancCancelattionelReq',
            label: 'Cancelattion',
            type: ImagePath.multiply, // Replace with actual image paths
            icon: 'search',
            component: CancelReqScreen,
            color: Colors.blue,
            alphaClr: Colors.sky,
        },
        {
            route: 'Inbox',
            label: 'Inbox',
            type: ImagePath.mail, // Replace with actual image paths
            icon: 'user-circle-o',
            component: InboxScreen,
            color: Colors.blue,
            alphaClr: Colors.sky,
        },
        {
            route: 'Profile',
            label: 'Profile',
            type: ImagePath.user, // Replace with actual image paths
            icon: 'user-circle-o',
            component: ProfileScreen,
            color: Colors.blue,
            alphaClr: Colors.sky,
        },
    ];

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            {TabArr.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: wp(7),
                            right: wp(4),
                            left: wp(4),
                            borderRadius: wp(3),
                            // backgroundColor: 'yellow',
                            alignSelf: 'center',
                            alignItems: 'center',
                            // flex: 1,
                            justifyContent: 'center',
                            height: hp(7),
                            paddingBottom: hp(0.1),
                            width: "90%",
                        },
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton {...props} item={item} />,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: '#000',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(1.5),
        borderRadius: wp(3),
    },
    imageStyle: {
        width: wp(4),
        height: hp(6),
        marginRight: 8,
    },
});
export default BottomTabScreen;
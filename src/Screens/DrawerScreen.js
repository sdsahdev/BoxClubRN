import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
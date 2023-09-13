import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import Registerscreen from './src/Screens/Registerscreen';
import OtpScreen from './src/Screens/OtpScreen';
import AdminRegister from './src/Screens/AdminRegister';
import Sport from './src/Screens/Sport';
import Time from './src/Screens/Time';
import Rules from './src/Screens/Rules';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerMode: 'none' }} initialRouteName='Rules'>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Registerscreen" component={Registerscreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="AdminRegister" component={AdminRegister} />
        <Stack.Screen name="Sport" component={Sport} />
        <Stack.Screen name="Time" component={Time} />
        <Stack.Screen name="Rules" component={Rules} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
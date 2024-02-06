import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import Registerscreen from './src/Screens/FirstRegisterscreen';
import OtpScreen from './src/Screens/OtpScreen';
import SportScreen from './src/Screens/SportScreen';
import TimeScreen from './src/Screens/TimeScreen';
import RulesScreen from './src/Screens/RulesScreen';
import HomeScreen from './src/Screens/HomeScreen';
import DrawerScreen from './src/Screens/DrawerScreen';
import { Routs } from './src/AllData/Utill';
import CancelReqScreen from './src/Screens/CancelReqScreen';
import InboxScreen from './src/Screens/InboxScreen';
import BottomTabScreen from './BottomTab';
import BoxDetailsScreen from './src/Screens/BoxDetailsScreen';
import DateTimeScreen from './src/Screens/DateTimeScreen';
import EditBoxDScreen from './src/Screens/EditBoxDScreen';
import FlashMessage from 'react-native-flash-message';
import AppProvider from './src/Context/AppProvider';
import store from './Redux/Store/store';
import { Provider } from 'react-redux';
import BoxRegister from './src/Screens/BoxRegister';
import FirstRegisterscreen from './src/Screens/FirstRegisterscreen';
import ChangePassword from './src/Screens/ChangePassword';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>

      <AppProvider >

        <NavigationContainer >
          <Stack.Navigator screenOptions={{ headerMode: 'none' }} initialRouteName={Routs.LoginScreen}>
            <Stack.Screen name={Routs.BottomTabScreen} component={BottomTabScreen} />
            <Stack.Screen name={Routs.InboxScreen} component={InboxScreen} />
            <Stack.Screen name={Routs.EditBoxDScreen} component={EditBoxDScreen} />
            <Stack.Screen name={Routs.CancelReqScreen} component={CancelReqScreen} />
            <Stack.Screen name={Routs.Registerscreen} component={FirstRegisterscreen} />
            <Stack.Screen name={Routs.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={Routs.OtpScreen} component={OtpScreen} />
            <Stack.Screen name={Routs.AdminRegister} component={BoxRegister} />
            <Stack.Screen name={Routs.SportScreen} component={SportScreen} />
            <Stack.Screen name={Routs.TimeScreen} component={TimeScreen} />
            <Stack.Screen name={Routs.RulesScreen} component={RulesScreen} />
            <Stack.Screen name={Routs.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={Routs.DrawerScreen} component={DrawerScreen} />
            <Stack.Screen name={Routs.BoxDetailsScreen} component={BoxDetailsScreen} />
            <Stack.Screen name={Routs.DateTimeScreen} component={DateTimeScreen} />
            <Stack.Screen name={Routs.ChangePassword} component={ChangePassword} />
          </Stack.Navigator>
          <FlashMessage position="bottom" />

        </NavigationContainer>
      </AppProvider>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})
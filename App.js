import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerMode: 'none' }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
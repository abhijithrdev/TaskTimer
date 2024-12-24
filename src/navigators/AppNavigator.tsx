import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'

const AppNavigator = () => {
     const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <View>
      {
        !isLoggedIn ? 
            <LoginScreen/>
            : 
            <HomeScreen/>
      }
    </View>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
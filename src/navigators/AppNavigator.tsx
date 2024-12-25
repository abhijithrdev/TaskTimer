import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { getToken, TOKEN_KEYS } from "../services/tokenStorage";

const AppNavigator = () => {
  const isLoggedIn = async (): Promise<boolean> => {
    const accessToken = await getToken(TOKEN_KEYS.ACCESS);

    if (!accessToken) {
      return false;
    }

    return true;

  };
  return <View>{isLoggedIn ? <LoginScreen /> : <HomeScreen />}</View>;
};

export default AppNavigator;

const styles = StyleSheet.create({});

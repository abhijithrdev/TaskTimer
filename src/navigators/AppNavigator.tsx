import { View } from "react-native";
import React, { useEffect, useState } from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import { getToken, TOKEN_KEYS } from "../services/tokenStorage";
import HomeStackNavigator from "./HomeStackNavigator";
import { createStackNavigator } from "@react-navigation/stack";

export type AppStackParamList = {
  Login: undefined;
  Home: undefined; 
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createStackNavigator<AppStackParamList>();

  const handleLogIn = async (): Promise<void> => {
    const accessToken = await getToken(TOKEN_KEYS.ACCESS);
    console.log("Access token:", accessToken);

    if (!accessToken) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    //validate expired tokens
  };

  useEffect(() => {
    handleLogIn();
    return () => {};
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
  // <View style={{flex: 1}}>{!isLoggedIn ? <LoginScreen  /> : <HomeStackNavigator/>}</View>;
};

export default AppNavigator;

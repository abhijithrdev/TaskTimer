import React, { useEffect, useState } from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import { getToken, TOKEN_KEYS } from "../services/tokenStorage";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main/HomeScreen";
import TaskManagementScreen from "../screens/main/TaskManagementScreen";
import { Task } from "../api/fetchTasksAPI";
import { useAuth } from "../services/AuthContext";

export type AppStackParamList = {
  Login: undefined;
  Home: undefined;
  "Task Management": { taskDetails: Task };
};

const AppNavigator = () => {
  const {isLoggedIn, handleLogin} = useAuth();
  const Stack = createStackNavigator<AppStackParamList>();


  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Task Management"
            component={TaskManagementScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main/HomeScreen";
import TaskManagementScreen from "../screens/main/TaskManagementScreen";
import { Task } from "../api/fetchTasksAPI";

export type HomeStackParamList = {
  Home: undefined;
  "Task Management": { taskDetails : Task};
};

const HomeStackNavigator = () => {
  const Stack = createStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Task Management" component={TaskManagementScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

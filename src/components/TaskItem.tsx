import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigators/HomeStackNavigator";
import { Task } from "../api/fetchTasksAPI";
import { AppStackParamList } from "../navigators/AppNavigator";

type Props =  {
  item: Task;
  navigation: StackScreenProps<AppStackParamList, "Home">["navigation"] 
};

const TaskItem = ({ item, navigation }: Props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Task Management", { taskDetails: item })
      }
      style={styles.taskContainer}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskdate}>{new Date(item.starts_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#647c76",
    marginVertical: 5,
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },
  taskTitle: {
    fontFamily: "Montserrat-SemiBold",
    color: "#FFF",
    fontSize: 15,
  },
  taskdate: {
    fontFamily: "Montserrat-Light",
    color: "#F5F5F5",
    fontSize: 12,
    textAlign: "right",
  },
});

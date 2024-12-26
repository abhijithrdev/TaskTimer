import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { scheduleLocalNotification } from "../../services/notifications";
import { fetchNewTask, Task } from "../../api/fetchTasksAPI";
import TaskDetails from "../../components/TaskDetails";
import TouchableButton from "../../components/TouchableButton";
import { AppStackParamList } from "../../navigators/AppNavigator";

type Props = StackScreenProps<AppStackParamList, "Task Management">;

const TaskManagementScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const INITIAL_TASK = {
    id: "",
    room: { id: "" },
    title: "",
    created_at: "",
    starts_at: "",
    starts_in: { seconds: 0, minutes: 0, hours: 0, days: 0 },
  };
  const [task, setTask] = useState<Task>(INITIAL_TASK);

  useEffect(() => {
    setTask(props.route.params.taskDetails);
  }, [props.route.params.taskDetails]);

  const handleNotification = () => {
    scheduleLocalNotification(task?.starts_in, task.title);
  };

  const handleFetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTask = await fetchNewTask(task.room.id);
      setTask(fetchedTask);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"#647c76"} />
        ) : (
          <TaskDetails task={task} />
        )}
        <TouchableButton
          onPress={handleNotification}
          text="Schedule Notification"
          style={styles.touchableBackgroundColor}
        />
      </View>
      <View style={styles.footer}>
        <TouchableButton onPress={handleFetchTasks} text="Get Next Task" />
      </View>
    </View>
  );
};

export default TaskManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 0.9,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  touchableBackgroundColor: {
    backgroundColor: "#007BFF",
  },
  footer: {
    flex: 0.1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },
});

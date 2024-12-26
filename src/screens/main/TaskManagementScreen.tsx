import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigators/HomeStackNavigator";
import { scheduleLocalNotification } from "../../services/notifications";
import { fetchNextTask, Task } from "../../api/fetchTasksAPI";

type Props = StackScreenProps<HomeStackParamList, "Task Management">;

const TaskManagementScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const initialTaskValue = {
    id: "",
    room: { id: "" },
    title: "",
    created_at: "",
    starts_at: "",
    starts_in: { seconds: 0, minutes: 0, hours: 0, days: 0 },
  };
  const [task, setTask] = useState<Task>(initialTaskValue);

  useEffect(() => {
    setTask(props.route.params.taskDetails);
  }, [props.route.params.taskDetails]);

  useEffect(() => {
    console.log("task", task);
  }, [task]);

  const handleNotification = () => {
    scheduleLocalNotification(task?.starts_in, task.title);
  };

  const handleFetchTasks = async () => {
    setLoading(true);

    try {
      const fetchedTask = await fetchNextTask(task.room.id);
      console.log("fetchedTask", fetchedTask);

      setTask(fetchedTask);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 0.9, justifyContent: "center" }}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"#647c76"} />
        ) : (
          <>
            <Text
              style={{
                fontFamily: "Montserrat-Bold",
                color: "#000",
                fontSize: 28,
                textAlign: "center",
                paddingVertical: 30,
              }}
            >
              {task.title}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat-Light",
                color: "#647c76",
                fontSize: 18,
                textAlign: "center",
                paddingBottom: 40,
              }}
            >
              Starts at:{" "}
              <Text
                style={{
                  color: "#000",
                  fontFamily: "Montserrat-Regular",
                  fontSize: 20,
                }}
              >
                {new Date(task.starts_at).toLocaleString()}
              </Text>
            </Text>
          </>
        )}

        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            onPress={handleNotification}
            style={[styles.touchableOpacity, { backgroundColor: "#007BFF" }]}
          >
            <Text style={styles.touchableText}>Schedule Notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "#000",
          padding: 20,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleFetchTasks}
          style={styles.touchableOpacity}
        >
          <Text style={styles.touchableText}>Get Next Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskManagementScreen;

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#24c37e",
    // marginTop: 24,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableText: {
    fontFamily: "Montserrat-Bold",
    color: "#FFF",
    fontSize: 17,
  },
});

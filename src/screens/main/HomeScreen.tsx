import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createTaskRoom } from "../../api/createTaskRoomAPI";
import { fetchNewTask, fetchTasks, Task } from "../../api/fetchTasksAPI";
import { StackScreenProps } from "@react-navigation/stack";
import TouchableButton from "../../components/TouchableButton";
import TaskItem from "../../components/TaskItem";
import { AppStackParamList } from "../../navigators/AppNavigator";

type Props = StackScreenProps<AppStackParamList, "Home">;

const HomeScreen = (props: Props) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateTaskRoom = async () => {
    try {
      const newRoomId = await createTaskRoom();
      setRoomId(newRoomId);
      await fetchNewTask(newRoomId);
      handleFetchTasks(newRoomId);
      Alert.alert("Task Room Created", `Room ID: ${newRoomId}`);
    } catch {
      Alert.alert("Error", "Unable to create task room.");
    }
  };

  const handleFetchTasks = async (newRoomId?: string) => {
    if (!roomId) return;
    setLoading(true);
    try {
      const fetchedTasks = await fetchTasks(newRoomId || roomId);
      setTasks(fetchedTasks);
    } catch {
      Alert.alert("Error", "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      handleFetchTasks();
    }
  }, [roomId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Timer</Text>
        <TouchableButton
          onPress={handleCreateTaskRoom}
          text="Create Task Room"
          style={{ marginHorizontal: 20 }}
        />
        {roomId && <Text style={styles.roomId}>Task Room ID: {roomId}</Text>}
      </View>

      {roomId ? (
        <View style={styles.taskListContainer}>
          {loading ? (
            <ActivityIndicator size={"large"} color={"#647c76"} />
          ) : (
            <FlatList
              data={tasks}
              renderItem={({item}) => <TaskItem item={item} navigation={props.navigation}/>}
              keyExtractor={(item) => item.id}
              onRefresh={handleFetchTasks}
              refreshing={loading}
              ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
              ListHeaderComponent={<Text style={styles.listHeader}>Tasks</Text>}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      ) : (
        <Text style={styles.noRoomText}>
          Tap 'Create Task Room' to start managing your tasks.
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#0A5045",
    paddingVertical: 30,
  },
  headerTitle: {
    color: "#FFF",
    fontFamily: "Montserrat-Bold",
    marginVertical: 50,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  roomId: {
    color: "#647c76",
    fontFamily: "Montserrat-SemiBold",
    marginTop: 20,
    fontSize: 15,
    textAlign: "center",
  },
  taskListContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  listHeader: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    color: "#647c76",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 100,
  },
  noRoomText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#647c76",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 200,
    marginHorizontal: 60,
  },
});

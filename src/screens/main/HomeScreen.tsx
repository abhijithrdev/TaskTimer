import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createTaskRoom } from "../../api/createTaskRoomAPI";
import { fetchNextTask, fetchTasks, Task } from "../../api/fetchTasksAPI";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigators/HomeStackNavigator";

type Props = StackScreenProps<HomeStackParamList, "Home">;

const HomeScreen = (props: Props) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateTaskRoom = async () => {
    try {
      const newRoomId = await createTaskRoom();
      handleCreateNewTask(newRoomId);
      setRoomId(newRoomId);
      Alert.alert("Task Room Created", `Room ID: ${newRoomId}`);
      
    } catch (error) {
      Alert.alert("Error", "Unable to create task room.");
    }
  };

  const handleCreateNewTask = async (newRoomId: string) => {
    if (!newRoomId) return;
    setLoading(true);
    console.log("create new", newRoomId);
    try {
      await fetchNextTask(newRoomId);
      setTimeout(() => {
        handleFetchTasks(newRoomId);
      }, 1000);
     
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTasks = async (newRoomId?: string) => {
    if (!roomId) return;
    setLoading(true);
    console.log("3rd", newRoomId);
    try {
      const fetchedTasks = await fetchTasks(newRoomId ? newRoomId : roomId);
      setTasks(fetchedTasks);
    } catch (error) {
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

  const renderTasks = ({ item }: { item: Task }) => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate("Task Management", { taskDetails: item })
        }
        style={{
          backgroundColor: "#647c76",
          marginVertical: 5,
          padding: 15,
          borderRadius: 15,
          elevation: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            color: "#FFF",
            fontSize: 15,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat-Light",
            color: "#F5F5F5",
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {new Date(item.starts_at).toLocaleString()}
        </Text>
      </Pressable>
    );
  };

  const listEmpty = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            color: "#647c76",
            fontSize: 15,
            textAlign: "center",
            marginVertical: 100,
          }}
        >
          No tasks available
        </Text>
      </View>
    );
  };

  const headerComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            color: "#000",
            fontSize: 18,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Tasks
        </Text>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: 50 }}>
      <View
        style={{
          backgroundColor: "#0A5045",
          paddingVertical: 30,
          paddingTop: 50,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontFamily: "Montserrat-Bold",
            marginVertical: 50,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Task Timer
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            onPress={handleCreateTaskRoom}
            style={[styles.touchableOpacity]}
          >
            <Text style={styles.touchableText}>Create Task Room</Text>
          </TouchableOpacity>
        </View>

        {roomId && (
          <Text
            style={{
              color: "#647c76",
              fontFamily: "Montserrat-SemiBold",
              marginTop: 20,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Task Room ID: {roomId}
          </Text>
        )}
      </View>

      {roomId ? (
        <View style={{ flex: 1,marginHorizontal: 20, marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size={"large"} color={"#647c76"} />
          ) : (
            <FlatList
              data={tasks}
              renderItem={renderTasks}
              keyExtractor={(item) => item.id}
              onRefresh={handleFetchTasks}
              refreshing={loading}
              ListEmptyComponent={listEmpty}
              ListHeaderComponent={headerComponent}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginBottom: 0 }}
            />
          )}
        </View>
      ) : (
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              color: "#647c76",
              fontSize: 15,
              textAlign: "center",
              marginVertical: 200,
              marginHorizontal: 60,
            }}
          >
            Tap 'Create Task Room' to start managing your tasks.
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#24c37e",
    marginTop: 24,
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

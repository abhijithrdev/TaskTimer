import { StyleSheet, Text } from "react-native";
import React from "react";
import { Task } from "../api/fetchTasksAPI";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.subtitle}>
        Starts at:{" "}
        <Text style={styles.date}>
          {new Date(task.starts_at).toLocaleString()}
        </Text>
      </Text>
    </>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat-Bold",
    color: "#000",
    fontSize: 28,
    textAlign: "center",
    paddingVertical: 30,
  },
  subtitle: {
    fontFamily: "Montserrat-Light",
    color: "#647c76",
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 40,
  },
  date: {
    color: "#000",
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
  },
});

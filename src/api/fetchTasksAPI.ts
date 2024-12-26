import apiClient from "./axiosClient";

export interface Task {
  id: string;
  room: { id: string; };
  title: string;
  created_at: string;
  starts_at: string;
  starts_in: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
}

export const fetchTasks = async (roomId: string): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>(`/api/tasks/${roomId}`);
    console.log("Tasks fetched successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const fetchNewTask = async (roomId: string): Promise<Task> => {
    try {
      const response = await apiClient.get<Task>(`/api/tasks/new/${roomId}`);
      console.log("Next tasks fetched successfully:", response);
  
      return response.data;
    } catch (error) {
      console.error("Failed to fetch next tasks:", error);
      throw error;
    }
};

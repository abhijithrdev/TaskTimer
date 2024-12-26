import apiClient from "./axiosClient";

interface CreateTaskRoomResponse {
  id: string;
}

export const createTaskRoom = async (): Promise<string> => {
  try {
    const response = await apiClient.get<CreateTaskRoomResponse>(
      "api/tasks/new"
    );
    console.log("Task room created successfully:", response.data);

    return response.data.id;
  } catch (error) {
    console.error("Failed to create task room:", error);
    throw error;
  }
};

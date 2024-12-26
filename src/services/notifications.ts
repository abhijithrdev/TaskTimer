import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

type StartsInType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const initializeNotifications = async (): Promise<void> => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationCategoryAsync("taskCategory", [
      {
        identifier: "done",
        buttonTitle: "Done",
        options: { opensAppToForeground: true },
      },
      {
        identifier: "skip",
        buttonTitle: "Skip",
        options: { opensAppToForeground: false },
      },
    ]);
  }
};

export const handleNotificationResponse =
  (): Notifications.EventSubscription => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const actionId = response.actionIdentifier;

        if (actionId === "done" || actionId === "skip") {
          Notifications.dismissNotificationAsync(
            response.notification.request.identifier
          )
            .then(() =>
              console.log(
                `Notification dismissed: ${response.notification.request.identifier}`
              )
            )
            .catch((error) =>
              console.error("Failed to dismiss notification:", error)
            );

          if (actionId === "done") {
            console.log("User marked the task as done.");
          } else if (actionId === "skip") {
            console.log("User skipped the task.");
          }
        }
      }
    );
    return subscription;
  };

export const scheduleLocalNotification = async (
  startsIn: StartsInType,
  taskTitle: string
): Promise<void> => {
  const startsInSeconds =
    startsIn.days * 24 * 60 * 60 +
    startsIn.hours * 60 * 60 +
    startsIn.minutes * 60 +
    startsIn.seconds;
  console.log("seconds", startsInSeconds);

  const triggerTimestamp = new Date(
    new Date().getTime() + startsInSeconds * 1000
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Task Reminder: ${taskTitle}`,
      body: "Your task starts soon!",
      categoryIdentifier: "taskCategory",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerTimestamp,
    },
  });
};

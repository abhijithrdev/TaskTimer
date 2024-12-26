import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppNavigator from "./src/navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import {
  handleNotificationResponse,
  initializeNotifications,
} from "./src/services/notifications";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/services/AuthContext";

export default function App() {
  useEffect(() => {
    initializeNotifications();
    const subscription = handleNotificationResponse();
    return () => subscription.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});

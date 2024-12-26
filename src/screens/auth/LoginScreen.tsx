import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { loginAPI } from "../../api/authAPI";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigators/AppNavigator";
import { useAuth } from "../../services/AuthContext";

type Props = StackScreenProps<AppStackParamList, "Login">;

const LoginScreen = (props: Props) => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onLoginPress = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    try {
      await loginAPI({ username, password });
      login();
      Alert.alert("Success", "You are now logged in!");
    } catch {
      Alert.alert("Error", "Invalid username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Plan. Track. Succeed.</Text>

      <Text style={styles.headerTextSemibold}>
        <Text style={styles.headerLoginText}>Log in</Text> to begin.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputHeaderText}>Username</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#647c76"
          cursorColor="#647c76"
        />

        <Text style={styles.inputHeaderText}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#647c76"
          cursorColor="#647c76"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={onLoginPress} style={styles.touchableOpacity}>
        <Text style={styles.touchableText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0A5045",
    padding: 14,
  },
  headerText: {
    fontFamily: "Montserrat-Light",
    fontSize: 25,
    color: "#46BFAB",
    textAlign: "left",
  },
  headerTextSemibold: {
    fontFamily: "Montserrat-SemiBold",
    textAlign: "left",
    fontSize: 30,
    color: "#46BFAB",
  },
  headerLoginText: {
    color: "#FFF",
    fontFamily: "Montserrat-Bold",
  },
  inputContainer: {
    justifyContent: "center",
    marginTop: 100,
  },
  inputHeaderText: {
    color: "#647c76",
    fontFamily: "Montserrat-Regular",
    marginVertical: 2,
    fontSize: 13,
  },
  input: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#003b31",
    color: "#FFF",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    height: 45,
    marginBottom: 30
  },
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

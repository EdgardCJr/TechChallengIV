import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then(async (data) => { 
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
          Alert.alert("Login successful!");
          navigation.replace("AdminDashboard");
        } else {
          Alert.alert("Invalid credentials!");
        }
      })
      .catch(() => Alert.alert("Error during login"));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUserName}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,
               padding: 16,
               backgroundColor: "#fff",
               justifyContent: "center",
               alignItems: "center" },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default LoginScreen;

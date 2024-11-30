import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext"

const login = "/login";
const LoginScreen: React.FC = ({ navigation }: any) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await Api.post(login, { username, password });
      const data = response.data; 
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        setToken(data.token);
        console.log(data.token)
        navigation.navigate("Main");
      } else {
        Alert.alert("Invalid credentials!");
      }
    } catch (error) {
      Alert.alert("Falha ao executar o Login", error.message); 
    }
  };

  return (
    <View style={styles.containerT}>
        <View style={styles.formTitle}>
          <Text style={styles.Tytle}>App Fiap</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={username}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
      </View>
  </View>
);
};

const styles = StyleSheet.create({
  containerT: { 
              flex: 1,
              backgroundColor: "#fff",
            },
  container: { 
              flex: 1,
              padding: 16,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center" 
            },
  Tytle: { 
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center" 
  },
  formContainer: {
              width: '80%', 
              maxWidth: 400,
            },
  formTitle: {
              width: '100%',
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
              marginTop: 100
            },          
  input: {
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginBottom: 16,
              width: '100%'
            },
});

export default LoginScreen;

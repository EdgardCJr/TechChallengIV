import React, { useState, useEffect } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";

interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}
const CreateUserScreen: React.FC = () => {
  const [Usuario, setUsuario] = useState<User[]>([]);
  const { token } = useAuth();

  const handleEditUser = async () => {
    try {
      const response = await Api.put(("/user"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuario(response.data);
    } catch (error) {
      Alert.alert("Problemas ao carregar os usuários", error.message);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    if (user && user.username) {
      setAuthor(user.username); 
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Create Student" onPress={handleCreateStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default CreateStudentScreen;

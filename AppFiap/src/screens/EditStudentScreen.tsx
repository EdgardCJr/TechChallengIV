import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import fetchProtectedData from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Student {
  id: string;
  name: string;
  email: string;
}

const EditStudentScreen: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const route = useRoute();
  const navigation = useNavigation();

  const { studentId } = route.params as { studentId: string }; // Recebe o ID do estudante a ser editado

  // Função para buscar os dados do estudante
  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const data = await fetchProtectedData(`https://api.example.com/students/${studentId}`);
      setStudent(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do estudante.");
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar os dados do estudante
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedStudent = { name, email };
      const response = await fetch(`https://api.example.com/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o estudante");
      }

      Alert.alert("Sucesso", "Estudante atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados do estudante assim que a tela for carregada
  useEffect(() => {
    fetchStudentData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Estudante</Text>

      {student ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome do Estudante"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email do Estudante"
            keyboardType="email-address"
          />

          <Button title="Salvar Alterações" onPress={handleSaveChanges} />
        </>
      ) : (
        <Text>Dados do estudante não encontrados.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditStudentScreen;

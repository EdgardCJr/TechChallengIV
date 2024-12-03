import React, { useEffect, useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert, Text, ActivityIndicator  } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker'

interface User {
    _id: string;
    username: string;
    password?: string; 
    role: string;
}

const EditUserScreen: React.FC = ({ navigation }: any) => {
    const route = useRoute<RouteProp<{ params: { userId: string } }>>();
    const { token } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Add error state

    useEffect(() => {
      const { userId } = route.params;
      const loadUser = async () => {
          try {
              const response = await Api.get(`/user/${userId}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              if (!response.ok) {
                  const errorData = await response.json();
                  setError(errorData.message || response.statusText);
                  return;
              }

              const userData = await response.json();
              setUser(userData);
              setUsername(userData.username);
              setPassword(userData.password || "");
              setRole(userData.role);

          } catch (error) {
              setError("Erro ao carregar usuário. Verifique sua conexão.");
              console.log("Error loading user:", error);
          } finally {
              setIsLoading(false);
          }
      };

      if (userId) {
          loadUser();
      } else {
          setError("UserID não fornecido.");
      }
  }, [route.params]);


    const handlePut = async () => {
        try {
            if (user && user._id) {
                const updatedUser = { username, password, role };
                const response = await Api.put(`/user/${user._id}`, updatedUser, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    Alert.alert("Usuário atualizado!");
                    navigation.goBack();
                } else {
                    const errorData = await response.json();
                    Alert.alert("Erro ao atualizar usuário", errorData.message || response.statusText);
                }
            } else {
                Alert.alert("Erro", "Usuário não encontrado ou dados inválidos.");
            }
        } catch (error) {
            Alert.alert("Erro ao atualizar usuário", "Ocorreu um erro inesperado.");
            
        }
    };


    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!user) {
      return <Text>Usuário não encontrado.</Text>;
  }

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Editar Usuário</Text>

          <View style={styles.fieldContainer}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Nome do Usuário"
              />
          </View>

          <View style={styles.fieldContainer}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nova Senha (opcional)"
                  secureTextEntry
              />
          </View>

          <View style={styles.fieldContainer}>
              <Text style={styles.label}>Categoria:</Text>
              <Picker
                  selectedValue={role}
                  style={styles.picker}
                  onValueChange={(itemValue) => setRole(itemValue)}
              >
                  <Picker.Item label="Professor" value="Professor" />
                  <Picker.Item label="Aluno" value="Aluno" />
              </Picker>
          </View>

          <View style={styles.buttons}>
              <Button title="Atualizar" onPress={handlePut} color="#556" />
          </View>
                  </View>
              );
            };

            const styles = StyleSheet.create({
              container: {
                  flex: 1,
                  padding: 16,
              },
              title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
              input: {
                  height: 40,
                  borderColor: "#ccc",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  marginBottom: 16,
  },
  label: { fontWeight: 'bold', marginBottom: 4 },
  picker: {
      height: 40,
      width: "100%",
      marginBottom: 16,
  },
  buttons: { marginTop: 16 },
  fieldContainer: { marginBottom: 16 }, // Added for spacing between fields

});

export default EditUserScreen;
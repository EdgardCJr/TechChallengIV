import React, { useEffect, useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';


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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { userId } = route.params;
        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await Api.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 202) {
                    const errorData = response.data;
                    setError(errorData.message || response.statusText);
                    return;
                }
                if (response.status !== 200) {
                    const errorData = response.data;
                    setError(errorData.message || response.statusText);
                    return;
                }

                const userData = response.data;
                setUser(userData);
                setUsername(userData.username);
                setPassword(userData.password || ""); 
                setRole(userData.role);

            } catch (error) {
                setError("Erro ao carregar usuário. Verifique sua conexão.");
                console.log("Error fetching user:", `/user/${userId}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        } else {
            setError("UserID não fornecido.");
        }
    }, [route.params]);


    const handleUpdateUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (user && user._id) {
                const updatedUser = { username, password, role };
                const response = await Api.put(`/user/${user._id}`, updatedUser, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status !== 200) {
                    const errorData = response.data;
                    setError(errorData.message || response.statusText);
                    return;
                }

                Alert.alert("Usuário atualizado com sucesso!");
                navigation.goBack();
            } else {
                setError("Usuário não encontrado ou dados inválidos.");
            }
        } catch (error) {
            setError("Erro ao atualizar usuário. Tente novamente mais tarde.");
            console.error("Error updating user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>; // Style the error message
    }

    if (!user) {
        return <Text style={styles.errorText}>Usuário não encontrado.</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Nome de Usuário"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha (opcional)"
                secureTextEntry
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={role}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRole(itemValue)}
                >
                    <Picker.Item label="Professor" value="Professor" />
                    <Picker.Item label="Aluno" value="Aluno" />
                    {/* Add more roles as needed */}
                </Picker>
            </View>
            <Button title="Atualizar" onPress={handleUpdateUser} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        marginBottom: 10,
    },
    picker: {
        height: 40,
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default EditUserScreen;
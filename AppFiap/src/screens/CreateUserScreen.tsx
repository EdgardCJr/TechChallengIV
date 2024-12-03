import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native"; // Import Picker
import { Picker } from '@react-native-picker/picker'
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";

const CreateUserScreen: React.FC = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Aluno");
    const { token } = useAuth();

    const handleCreateUser = async () => {
        try {
            const newUser = { username, password, role };
            const response = await Api.post("/register", newUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                Alert.alert("Usuário criado com sucesso!");
                setUsername("");
                setPassword("");
                setRole("");
                navigation.goBack();
            } else if (response.status === 202) {
              Alert.alert("Usuário ja existe, tente outro!");
              setUsername("");
              setPassword("");
              setRole("");
            }
        } catch (error) {
            Alert.alert("Erro ao criar usuário", error.message);
            console.log("Error details:", { username, password, role });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                <Picker.Item label="Professor" value="Professor" />
                <Picker.Item label="Aluno"     value="Aluno" />
            </Picker>
            <Button title="Criar Usuário" onPress={handleCreateUser} />
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
    picker: {
        height: 40,
        width: "100%",
        marginBottom: 16,
    },
});

export default CreateUserScreen;
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView, Button, Alert, ActivityIndicator } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface User {
    _id: string;
    username: string;
    role: string;
}

const UserManagementScreen: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigation = useNavigation();

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await Api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            Alert.alert("Erro ao carregar usuários", error.message);
            console.error("Error loading users:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadUsers();
            return () => { };
        }, [])
    );

    const handleUserDelete = async (userId: string) => {
        try {
            await Api.delete(`/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Usuário deletado.");
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            Alert.alert("Erro ao deletar usuário", error.message);
            console.error("Error deleting user:", error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.createUserButtonContainer}> 
                <Button
                    title="Criar Usuário" onPress={() => navigation.navigate("CreateUser")}
                />
            </View>
            <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.username}</Text>
                        <Text style={styles.userRole}>Role: {item.role}</Text>
                        <View style={styles.buttons}>
                            <Button title="Edit" onPress={() => navigation.navigate("EditUser", { userId: item._id })} />
                            <Button title="Delete" onPress={() => handleUserDelete(item._id)} color="red" />
                        </View>
                    </View>
                )}
            />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: { fontSize: 18, fontWeight: "bold" },
  userRole: { fontSize: 14, color: "#555" },
  buttons: { marginTop: 8, flexDirection: "row", justifyContent: "space-between" },
  createUserButton: { marginTop: 16 },
  createUserButtonContainer: {
    padding: 16,
    alignItems: "center",
},
});

export default UserManagementScreen;

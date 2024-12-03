import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";
import { useUpdateContext } from "../Components/createContext";

interface Post {
    _id: string;
    title: string;
    author: string;
    content: string;
}

const AdminDashboardScreen: React.FC = ({ navigation }: any) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { user, token } = useAuth(); 
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { updatePosts } = useUpdateContext();
    

    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const response = await Api.get("/posts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            Alert.alert("Error loading posts", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user.role === "Professor") {
            loadPosts();
        } else if (user.role !== "Professor") {
            Alert.alert("Não Autorizado", "Você não possui autorização para acessar esta página");
            navigation.goBack();
        }
    }, [user, token, updatePosts]);

    const handleDelete = async (postId: string) => {
        try {
            await Api.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Postagem deletada.");
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            Alert.alert("Erro ao deletar o Post", error.message);
        }
    };


    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity style={styles.postItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.content}</Text>
                            <Text style={styles.author}>De: {item.author}</Text>
                            <View style={styles.buttons}>
                                <Button title="Editar" onPress={() => navigation.navigate("EditPost", { postId: item._id })} />
                                <Button title="Deletar" onPress={() => handleDelete(item._id)} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    loadPosts().then(() => setRefreshing(false));
                }}
            />
            <View style={styles.buttonsContainer}>
                <Button title="Criar Postagem" onPress={() => navigation.navigate("CreatePost")} />
                <Button title="Usuários" onPress={() => navigation.navigate("AdminUser")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1,
               padding: 16,
               backgroundColor: "#fff",
               borderWidth: 1, 
               borderColor: '#ccc', 
               borderRadius: 8,
              },
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonsContainer: {
    flexDirection: "row",  
    justifyContent: "space-around", 
    marginTop: 16, 
  },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555" },
  description: { fontSize: 14, color: "#777" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});

export default AdminDashboardScreen;

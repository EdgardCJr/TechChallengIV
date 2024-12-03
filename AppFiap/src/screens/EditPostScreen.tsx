import React, { useEffect, useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert, Text } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUpdateContext } from "../Components/createContext";

interface Post {
    _id: string;
    title: string;
    author: string;
    content: string;
}

const EditPostScreen: React.FC = ({ navigation }: any) => {
    const route = useRoute<RouteProp<{ params: { postId: string } }>>();
    const { token } = useAuth();
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { updatePosts } = useUpdateContext();

    useEffect(() => {
        const { postId } = route.params;

        const loadPost = async () => {
            try {
                const response = await Api.get(`/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setAuthor(response.data.author);
                setIsLoading(false);
            } catch (error) {
                Alert.alert("Error loading post", error.message);
                setIsLoading(false);
            }
        };

        loadPost();
    }, [route.params]);


    const handlePut = async () => {
        try {
            if (post && post._id) { // Verificar se post e post._id existem
                await Api.put(`/posts/${post._id}`, { title, content, author }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                Alert.alert("Postagem atualizada!");
                updatePosts();
                navigation.goBack();
            } else {
                Alert.alert("Erro", "Post não encontrado ou dados inválidos.");
            }
        } catch (error) {
            Alert.alert("Erro ao atualizar post", error.message);
        }
    };

    if (isLoading || !post) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.title}
                value={title}
                onChangeText={setTitle}
                placeholder="Título"
            />
            <TextInput
                style={styles.description}
                value={content}
                onChangeText={setContent}
                placeholder="Conteúdo"
                multiline
            />
            <TextInput
                style={styles.author}
                value={author}
                onChangeText={setAuthor}
                placeholder="Autor"
            />
            <View style={styles.buttons}>
                <Button title="Update" onPress={handlePut} color="#556" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    author: { fontSize: 14, color: "#555", marginBottom: 8 },
    description: { fontSize: 14, color: "#777", marginBottom: 8 },
    buttons: { marginTop: 16 },
});

export default EditPostScreen;

import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, Alert } from "react-native";
import Api from "../services/apiService";
import { useAuth } from "../services/authContext"; 


interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const PostDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { postId: string } }>>();
  const [post, setPost] = useState<Post | null>(null);
  const { token } = useAuth();

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
      } catch (error) {
        Alert.alert("Erro ao carregar postagem", error.message);
      }
    };
    loadPost();
  }, [route.params, token]); 

  if (!post) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.author}>De: {post.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  author: { fontSize: 16, color: "#555", marginBottom: 16 },
  content: { fontSize: 16, color: "#333" },
});

export default PostDetailsScreen;

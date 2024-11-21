import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import fetchProtectedData from "../services/apiService";

const MainPostListScreen: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  const loadPosts = async () => {
    try {
      const data = await fetchProtectedData("https://api.example.com/protected-route");
      setPosts(data);
    } catch (error) {
      Alert.alert("Erro:", error.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View>
      <Text>Lista de Posts:</Text>
      {posts.length > 0 ? (
        posts.map((post) => <Text key={post.id}>{post.title}</Text>)
      ) : (
        <Text>Carregando...</Text>
      )}
      <Button title="Refazer requisição" onPress={loadPosts} />
    </View>
  );
};

export default MainPostListScreen;

import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import Api from "../services/apiService";
import { useAuth } from '../services/authContext';

interface Post {
  _id: string;
  title: string;
  author: string;
  content: string;
}

const MainPostListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const response = await Api.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      Alert.alert("Problemas ao carregar os posts", error.message);
      console.error("Error details:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPosts();
      return () => {};
    }, [])
  );

  useEffect(() => {
    // Filtra os posts sempre que o searchTerm muda
    const filtered = posts.filter(post => {
      const searchLower = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    });
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar posts..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postItem} onPress={() => navigation.navigate("PostDetails", { postId: item._id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.content}</Text>
            <Text style={styles.author}>De: {item.author}</Text>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadPosts().then(() => setRefreshing(false));
        }}
      />
    </View>
  );
};

export default MainPostListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  postItem: {
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555" },
  description: { fontSize: 14, color: "#777" },
  header: { paddingBottom: 16 },
  headerText: { fontSize: 20, fontWeight: 'bold', paddingBottom: 8 },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  }
});

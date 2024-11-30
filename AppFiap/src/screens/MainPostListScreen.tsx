import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Api from "../services/apiService";
import { useAuth } from '../services/authContext';

interface Post {
  _id: string;
  title: string;
  author: string;
  content: string;
}

const MainPostListScreen: React.FC = () => {
  const navigation = useNavigation(); // Get navigation object
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const response = await Api.get(("/posts"), {
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
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postItem}>
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  header: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface Post {
  id: string;
  title: string;
  author: string;
  description: string;
}

const PostsListScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch posts from backend
    fetch("https://api.example.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>By: {item.author}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  postItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555" },
  description: { fontSize: 14, color: "#777" },
});

export default PostsListScreen;

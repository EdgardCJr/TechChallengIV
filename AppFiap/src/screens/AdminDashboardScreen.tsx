import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Button, Alert } from "react-native";

interface Post {
  id: string;
  title: string;
  author: string;
}

const AdminDashboardScreen: React.FC = ({ navigation }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://api.example.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = (postId: string) => {
    fetch(`https://api.example.com/posts/${postId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Post deleted successfully!");
          setPosts(posts.filter((post) => post.id !== postId));
        } else throw new Error("Failed to delete post");
      })
      .catch(() => Alert.alert("Error deleting post"));
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.postItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>By: {item.author}</Text>
          <View style={styles.buttons}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate("EditPost", { postId: item.id })}
            />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});

export default AdminDashboardScreen;

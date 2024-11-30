
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet,TouchableOpacity, Button, Alert } from "react-native";
import Api from "../services/apiService"; 
import { useAuth } from "../services/authContext"

interface Post {
  _id: string
  title: string;
  author: string;
  content: string;
}

const AdminDashboardScreen: React.FC = ({ navigation }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth(); 
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const response = await Api.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(posts);
      setPosts(response.data);
    } catch (error) {
      Alert.alert("Error loading posts", error.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await Api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Post deleted successfully!");
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      Alert.alert("Erro ao deletar o Post", error.message);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.container}>
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.content}</Text>
          <Text style={styles.author}>De: {item.author}</Text>
          <View style={styles.buttons}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate("EditPost", { postId: item._id })}
            />
            <Button title="Delete" onPress={() => handleDelete(item._id)} color="red" />
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
      <View style={styles.buttonsContainer}>
        <Button title="Create Post" onPress={() => navigation.navigate("CreatePost")} />
        <Button title="Create User" onPress={() => navigation.navigate("CreateUser")} />
        <Button title="Edit User" onPress={() => navigation.navigate("EditUser")} />
      </View>
    </View>
  );
}

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

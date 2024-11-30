import React, {useEffect, useState } from "react";
import { FlatList, TouchableOpacity, TextInput, Button, View, StyleSheet, Alert } from "react-native";
import Api from "../services/apiService"; // Import your API service
import { useAuth } from '../services/authContext';

interface Post {
  _id: string
  title: string;
  author: string;
  content: string;
}

const CreatePostScreen: React.FC = ({ navigation }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth(); 
  const [refreshing, setRefreshing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  
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

  const handlePut = async (postId: string) => {
    try {
      await Api.put(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
      Alert.alert("Post deletado!");
      navigation.goBack(); 
    } catch (error) {
      console.log(token, postId)
      Alert.alert("Error alterando post", token);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postItem}>
          <TextInput style={styles.title}
                      placeholder={item.title}
                      value={title}
                      onChangeText={setTitle}/>
          <TextInput style={styles.description}
                  placeholder={item.content}
                  value={content}
                  onChangeText={setContent}
                  multiline/>
          <TextInput style={styles.author}
                    placeholder={item.author}
                    value={author}
                    onChangeText={setAuthor}/>
          <View style={styles.buttons}>
            <Button title="Update" onPress={() => handlePut(item._id)} color="#555" />
          </View>
        </TouchableOpacity>
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
  description: { fontSize: 14, color: "#777" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});


export default CreatePostScreen;

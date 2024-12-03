import React, { useState, useEffect } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";
import Api from "../services/apiService";
import { useAuth } from '../services/authContext';
import { useUpdateContext } from '../Components/createContext';

const CreatePostScreen: React.FC = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { token, user } = useAuth();
  const { updatePosts } = useUpdateContext();

  useEffect(() => {
    // Set author from user object when it's available
    if (user && user.username) {
      setAuthor(user.username); 
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const newPost = { title, content, author };
      await Api.post("/posts", newPost, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json",
        },
      });
      Alert.alert("Publicação realizada!");
      updatePosts();
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      Alert.alert("Erro ao criar postagem", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titulo da Postagem"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteudo da Postagem"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={(text) => setAuthor(text)} 
        editable={false}
      />
      <Button title="Postar!" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default CreatePostScreen;

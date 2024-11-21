import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    const newPost = { title, content, author };
    fetch("https://api.example.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (response.ok) Alert.alert("Post created successfully!");
        else throw new Error("Failed to create post");
      })
      .catch(() => Alert.alert("Error creating post"));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Create Post" onPress={handleSubmit} />
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

import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";

const EditPostScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { postId: string } }>>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const { postId } = route.params;
    fetch(`https://api.example.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      });
  }, [route.params]);

  const handleSave = () => {
    const updatedPost = { title, content, author };
    fetch(`https://api.example.com/posts/${route.params.postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (response.ok) Alert.alert("Post updated successfully!");
        else throw new Error("Failed to update post");
      })
      .catch(() => Alert.alert("Error updating post"));
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
      <Button title="Save Changes" onPress={handleSave} />
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

export default EditPostScreen;

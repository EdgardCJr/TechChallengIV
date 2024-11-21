import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

const PostDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { postId: string } }>>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const { postId } = route.params;
    fetch(`https://api.example.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [route.params]);

  if (!post) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>By: {post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  author: { fontSize: 16, color: "#555", marginBottom: 16 },
  content: { fontSize: 16, color: "#333" },
});

export default PostDetailsScreen;

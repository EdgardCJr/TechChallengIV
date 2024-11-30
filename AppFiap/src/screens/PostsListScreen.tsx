import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import Api from "../services/apiService";
import { useAuth } from '../services/authContext';

interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
}

const PostsListScreen: React.FC = ({ navigation }: any) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const renderFooter = () => (
    <View style={styles.footer}>
      <Button title="Area Administrativa" onPress={() => navigation.navigate("CreateTeacher")} />
    </View>
  );

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
     useEffect(() => { 
       loadPosts();
     }, []); 
   
     useEffect(() => { 
       setFilteredPosts(posts);
    }, [posts]);

     return (
    <View style={styles.container}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.content }</Text>
            <Text style={styles.author}>De: {item.author}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadPosts().then(() => setRefreshing(false));
        }}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default PostsListScreen;

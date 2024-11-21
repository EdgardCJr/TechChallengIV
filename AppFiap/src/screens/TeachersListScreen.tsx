import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Button, Alert } from "react-native";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

const TeachersListScreen: React.FC = ({ navigation }: any) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetch("https://api.example.com/teachers")
      .then((response) => response.json())
      .then((data) => setTeachers(data));
  }, []);

  const handleDelete = (teacherId: string) => {
    fetch(`https://api.example.com/teachers/${teacherId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Teacher deleted successfully!");
          setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
        } else throw new Error("Failed to delete teacher");
      })
      .catch(() => Alert.alert("Error deleting teacher"));
  };

  return (
    <FlatList
      data={teachers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.teacherItem}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <View style={styles.buttons}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate("EditTeacher", { teacherId: item.id })}
            />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  teacherItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});

export default TeachersListScreen;

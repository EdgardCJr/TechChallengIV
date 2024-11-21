import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Button, Alert } from "react-native";

interface Student {
  id: string;
  name: string;
  email: string;
}

const StudentsListScreen: React.FC = ({ navigation }: any) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("https://api.example.com/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = (studentId: string) => {
    fetch(`https://api.example.com/students/${studentId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Student deleted successfully!");
          setStudents(students.filter((student) => student.id !== studentId));
        } else throw new Error("Failed to delete student");
      })
      .catch(() => Alert.alert("Error deleting student"));
  };

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.studentItem}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <View style={styles.buttons}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate("EditStudent", { studentId: item.id })}
            />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  studentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});

export default StudentsListScreen;

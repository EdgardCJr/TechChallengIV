import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";

const CreateTeacherScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateTeacher = () => {
    const newTeacher = { name, email };
    fetch("https://api.example.com/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeacher),
    })
      .then((response) => {
        if (response.ok) Alert.alert("Teacher created successfully!");
        else throw new Error("Failed to create teacher");
      })
      .catch(() => Alert.alert("Error creating teacher"));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Create Teacher" onPress={handleCreateTeacher} />
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

export default CreateTeacherScreen;

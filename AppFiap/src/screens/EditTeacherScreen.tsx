import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TextInput, Button, View, StyleSheet, Alert } from "react-native";

const EditTeacherScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { teacherId: string } }>>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { teacherId } = route.params;
    fetch(`https://api.example.com/teachers/${teacherId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      });
  }, [route.params]);

  const handleSave = () => {
    const updatedTeacher = { name, email };
    fetch(`https://api.example.com/teachers/${route.params.teacherId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeacher),
    })
      .then((response) => {
        if (response.ok) Alert.alert("Teacher updated successfully!");
        else throw new Error("Failed to update teacher");
      })
      .catch(() => Alert.alert("Error updating teacher"));
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

export default EditTeacherScreen;

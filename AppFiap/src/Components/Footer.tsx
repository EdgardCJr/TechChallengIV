import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Footer() {
  const navigation = useNavigation();
  const { token, setToken } = useAuth(); 

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
        setToken(null); 
        navigation.navigate('Login');
      } catch (error) {
        console.error('Logout error:', error);
        Alert.alert('Logout failed', 'An error occurred during logout.');
      }
    };
  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToGeolocation = () => {
    navigation.navigate('Geolocation');
  };

  const handleNavigateToRegisterUser = () => {
    navigation.navigate('RegisterUser');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerButton} onPress={handleNavigateToHome}>
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handleNavigateToGeolocation}>
        <Ionicons name="navigate" size={24} color="white" />
        <Text style={styles.footerText}>Geolocation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handleNavigateToRegisterUser}>
        <Ionicons name="person-add" size={24} color="white" /> {/* Changed icon for clarity */}
        <Text style={styles.footerText}>Register Usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="white" />
        <Text style={styles.footerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});



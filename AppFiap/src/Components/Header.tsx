import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void; 
}

const Cabecalho: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {navigation && navigation.canGoBack && (
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {navigation && ( // Ensure navigation is defined before using it
        <TouchableOpacity style={styles.menuContainer} onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    padding: 15,
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    padding: 10,
  },
  menuContainer: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cabecalho;

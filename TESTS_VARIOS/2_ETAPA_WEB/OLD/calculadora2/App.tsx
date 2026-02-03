import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import Calculator from './src/components/Calculator';
import { initDB } from './src/db/init';
import { useEffect } from 'react';

export default function App() {
  
  useEffect(() => {
    initDB();
  }, []);

  return (
    <ScrollView style={styles.background}>
      <Text  style={styles.container}>Calculadora Básica</Text>
      <Calculator />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#7f088f',
  },
  container: {
    flex: 1,
    textAlign: 'center',
    fontSize: 40,
    marginTop: 50,
    color: '#f8e7e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

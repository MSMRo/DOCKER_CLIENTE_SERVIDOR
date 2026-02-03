import { View, Text, TextInput } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import OperationButton from './OperationButton';

export default function Calculator() {
  const { a, b, resultado, error, setA, setB, operar } = useCalculator();

  return (
    <View style={{ padding: 24 }}>

      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#f8e7e7' }}>
        Ingrese valores para A y B:
      </Text>

      <TextInput
        placeholder="Número A"
        placeholderTextColor="#f8e7e7"
        value={a}
        onChangeText={setA}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Número B"
        placeholderTextColor="#f8e7e7"
        value={b}
        onChangeText={setB}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
          marginBottom: 14,
        }}
      />

      <OperationButton label="Sumar" onPress={() => operar('sumar')} />
      <OperationButton label="Restar" onPress={() => operar('restar')} />
      <OperationButton label="Multiplicar" onPress={() => operar('multiplicar')} />
      <OperationButton label="Dividir" onPress={() => operar('dividir')} />

      {resultado !== null && (
        <Text style={{ marginTop: 16, fontSize: 18 , color: '#f8e7e7' }}>
          Resultado: {resultado}
        </Text>
      )}

      {error && (
        <Text style={{ marginTop: 16, color: 'red' }}>
          {error}
        </Text>
      )}

    </View>
  );
}

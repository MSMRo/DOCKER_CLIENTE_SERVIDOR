import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export default function OperationButton({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
      }}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
        {label}
      </Text>
    </Pressable>
  );
}

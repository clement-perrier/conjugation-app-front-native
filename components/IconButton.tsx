import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IconButtonProps {
    icon: string | undefined | null,
    label?: string| null,
    onPress(): void
}

export default function IconButton({ icon, label, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={40} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 40,
  },
  iconButtonLabel: {
    color: '#fff',
    // marginTop: 12,
  },
});
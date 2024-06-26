import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Icon, IconProps } from '@expo/vector-icons/build/createIconSet';

interface IconButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap
    label?: string | null,
    onPress(): void,
    style?: ViewStyle | ViewStyle[];
}

export default function IconButton({ icon, label, onPress, style }: IconButtonProps) {
  return (
    <Pressable style={[styles.iconButton, style]} onPress={onPress}>
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
  },
});
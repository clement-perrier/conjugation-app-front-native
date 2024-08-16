import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IconButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap
    onPress?(): void,
    style?: ViewStyle | ViewStyle[],
    color?: string,
    size?: number
}

export default function IconButton({ icon, onPress, style, color, size }: IconButtonProps) {
  return (
    <Pressable 
      style={[styles.iconButton, style]} 
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={size} color={color}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
  },
  iconButtonLabel: {
    color: '#fff',
  },
});
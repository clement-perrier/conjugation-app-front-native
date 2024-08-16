import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TextIconButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap
    label: string | null,
    onPress?(): void,
    style?: ViewStyle | ViewStyle[],
    color?: string,
    iconSize?: number
}

export default function TextIconButton({ icon, label, onPress, style, color, iconSize }: TextIconButtonProps) {
  return (
    <Pressable 
      style={({pressed}) => [styles.iconButton, style, {backgroundColor: pressed ? 'black' : 'grey'}]} 
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={iconSize} color={color}/>
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 7
  },
  iconButtonLabel: {
    color: '#fff',
  },
});
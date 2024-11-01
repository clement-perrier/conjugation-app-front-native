import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import { useState } from 'react';

interface IconButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap
    onPress?: () => void,
    style?: ViewStyle | ViewStyle[] | TextStyle,
    color?: string,
    size?: number
}

export default function IconButton({ icon, onPress, style, color, size }: IconButtonProps) {

  // States
  const [isPressed, setIspressed] = useState(false)

  // Derived data
  const iconColor = color ? color : Colors.textPrimary

  return (
    <Pressable 
      style={({pressed}) => [styles.iconButton, style, {opacity: pressed ? 0.7 : 1}]} 
      onPress={onPress}
    >

      <MaterialIcons 
        style={{opacity: isPressed ? 0.7 : 1}}
        name={icon} 
        size={size} 
        color={iconColor}/>

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
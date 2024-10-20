import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import { globalstyles } from '@/utils/GlobalStyle';

interface TextIconButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap
    label: string | null,
    onPress?(): void,
    style?: ViewStyle | ViewStyle[],
    color?: string,
    backgroundColor?: string,
    iconSize?: number
}

export default function TextIconButton({ icon, label, onPress, style, color, backgroundColor, iconSize }: TextIconButtonProps) {
  return (
    <Pressable 
      style={({pressed}) => [globalstyles.flexRow, styles.iconButton, style, {backgroundColor: backgroundColor || Colors.secondary}, {opacity: pressed ? 0.6 : 1}  ]} 
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={iconSize} color={color}/>
      <Text style={[globalstyles.text, globalstyles.uppercase, {color: color}]}>{label}</Text>
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
  },
});
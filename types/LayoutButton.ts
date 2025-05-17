import { MaterialIcons } from "@expo/vector-icons"

export type LayoutButton = {
    label?: string
    onPress: () => void
    icon?: keyof typeof MaterialIcons.glyphMap
    iconSize?: number
    color?: string
    labelColor?: string
    disabled?: boolean
    iconOnly?: boolean
    focus?: boolean,
    topMessage?: string | null
}
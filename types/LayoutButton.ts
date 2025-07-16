import { MaterialIcons } from "@expo/vector-icons"
import { ComponentType, ReactElement } from "react"

export type LayoutButton = {
    label?: string
    onPress: () => void
    icon?: keyof typeof MaterialIcons.glyphMap | ComponentType<any> | ReactElement;
    iconSize?: number
    color?: string
    labelColor?: string
    disabled?: boolean
    iconOnly?: boolean
    focus?: boolean,
    topMessage?: string | null
}
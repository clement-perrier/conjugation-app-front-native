import Colors from "@/constants/Colors";
import { LayoutButton } from "@/types/LayoutButton";
import { globalstyles } from "@/utils/GlobalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useEffect, useRef } from "react";
import { Text, Pressable, StyleSheet, View, Animated } from "react-native";

export default function ListButton({label, onPress, icon, disabled, focus, color, labelColor } : LayoutButton){
    
    const borderColor = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
        // const shineAnimation = () => {
        //   Animated.sequence([
        //     Animated.timing(borderColor, {
        //       toValue: 1, // Animate to a lighter color
        //       duration: 500,
        //       useNativeDriver: false, // Use false because color animation does not support native driver
        //     }),
        //     Animated.timing(borderColor, {
        //       toValue: 0, // Animate back to the original color
        //       duration: 500,
        //       useNativeDriver: false,
        //     }),
        //   ]).start()
        // }
        // if(focus){
        //     // Start the animation
        //     shineAnimation();
                
        //     // Set up an interval to repeat the animation every 5 seconds
        //     const intervalId = setInterval(shineAnimation, 3000);

        //     // Clean up the animation when the component is unmounted
        //     return () => clearInterval(intervalId);
        // }
        
      },[])
    
      // Interpolate the border color from dark to light
      const borderColorInterpolate = borderColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.white, Colors.primaryShiny], // Change these colors for a different effect
      });
    
      // Create the animated styles
      const animatedStyle = {
        borderColor: borderColorInterpolate,
      };
      
    return (
        // <Animated.View style={focus && [{borderWidth: 2, borderRadius: 13 }, animatedStyle]}>
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.button,
                    // disabled && styles.disabled,
                    { backgroundColor: color ? color :Colors.secondary },
                    {opacity: disabled || pressed ? 0.5 : 1}
                ]}
            >
                { focus && <View style={styles.circle}></View> }
                {
                    icon
                        ? typeof icon === 'string'
                        ? <MaterialIcons name={icon} size={20} color={labelColor ?? Colors.textSecondary} style={styles.icon} />
                        : React.isValidElement(icon)
                            ? icon
                            : typeof icon === 'function'
                            ? React.createElement(icon)
                            : null
                        : null
                }
                <Text style={[
                        labelColor ? globalstyles.textNoColor : globalstyles.text, 
                        globalstyles.uppercase, 
                        focus && { textDecorationLine: 'underline', fontWeight: 'bold'},
                        {color: labelColor && labelColor}
                    ]}
                >
                    { label }
                </Text>
            </Pressable>
        // </Animated.View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 12,
        gap: 10
        // borderWidth: 1,
        // borderColor: Colors.tertiary
        // borderWidth: 5
    },
    listButton: {
        position: 'relative'
    },
    disabled: {
        opacity: 0.3,
        // borderColor: 'orange',
        // borderWidth: 3
    },
    focus: {
        // shadowColor: '#FFC107',
        borderWidth: 1,
        borderColor: Colors.primary
    },
    circle: {
        position: 'absolute',
        left: 35,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        width: 9,
        height: 9
    },
    icon: {
        // position: 'absolute',
        // right: 15
    }
})
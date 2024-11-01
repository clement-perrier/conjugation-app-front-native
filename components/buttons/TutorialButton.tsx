import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import Colors from "@/constants/Colors";
import IconButton from "./IconButton";

interface TutorialButtonProps {
    onPress(): void,
    position: {}
}
export function TutorialButton({onPress, position} : TutorialButtonProps) {

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Looping animation for scale and glow
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2, // Scale up slightly
                    duration: 700,
                    useNativeDriver: false,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Scale back down
                    duration: 700,
                    useNativeDriver: false,
                })
            ])
        ).start();
    }, [scaleAnim]);

    return (
        <Animated.View
            style={[
                {...position},
                styles.glowContainer,
                {
                    transform: [{ scale: scaleAnim }],
                    // shadowOpacity: 1
                },
            ]}
        >
            <IconButton
                color="white"
                size={15}
                icon="priority-high"
                style={styles.iconButton}
                onPress={onPress}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    glowContainer: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.primaryShiny,
        position: 'absolute',
        zIndex: 2
    },
    iconButton: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 5,
    },
});

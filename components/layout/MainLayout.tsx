import { View, StyleSheet } from 'react-native';
import type { ReactElement } from 'react';
import { LayoutButton } from '@/types/LayoutButton';
import BottomButton from '../buttons/BottomButton';


export default function MainLayout({children, contentCentered, buttons} : {children: ReactElement, contentCentered: boolean, buttons?: LayoutButton[]}){
    
    return (
        <View style={[styles.container, styles.padding20]}>

            <View style={styles.container}>
                <View style={contentCentered ? styles.content : styles.container}>{children}</View>
            </View>

            <View style={styles.buttonsContainer}>
                {buttons?.map((button, index) => 
                    <BottomButton key={index} button={{
                        label: button.label,
                        onPress: button.onPress,
                        icon: button.icon,
                        iconSize: button.iconSize,
                        color: button.color,
                        disabled: button.disabled
                    }}/>
                )}
            </View>

        </View>
    )

    
}

MainLayout.defaultProps = {
    contentCentered: true,
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
    },
    buttonsContainer: {
        display: 'flex', 
        rowGap: 5
    },
    padding20: {
        padding: 20
    }
  });
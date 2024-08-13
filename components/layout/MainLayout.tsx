import { View, StyleSheet, Text } from 'react-native';
import type { ReactElement } from 'react';
import { LayoutButton } from '@/types/LayoutButton';
import BottomButton from '../buttons/BottomButton';


export default function MainLayout({children, buttons, title} : {children: ReactElement, buttons?: LayoutButton[], title?: string}){
    
    return (
        <View style={[styles.container, styles.padding20]}>

            <Text>{title}</Text>

            <View style={styles.content}>
               {children}
            </View>

            <View style={[styles.buttonsContainer]}>
                {buttons?.map((button, index) => 
                    <BottomButton 
                        key={index}
                        label={button.label}
                        onPress={button.onPress}
                        icon={button.icon}
                        iconSize={button.iconSize}
                        color={button.color}
                        disabled={button.disabled}
                        iconOnly={button.iconOnly}
                    />
                )}
            </View>

        </View>
    )

    
}

// MainLayout.defaultProps = {
//     contentCentered: true,
// };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'white'
    },
    width100: {
        width: '100%'
    },
    content: {
        justifyContent: 'center',
        width: '100%',
        flex: 1
    },
    buttonsContainer: {
        display: 'flex', 
        rowGap: 15,
        justifyContent: 'center',
        paddingTop: 20,
        width: '100%'
    },
    padding20: {
        padding: 25
    }
  });
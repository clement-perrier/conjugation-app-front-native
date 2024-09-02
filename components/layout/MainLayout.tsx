import { View, StyleSheet, Text } from 'react-native';
import type { ReactElement } from 'react';
import { LayoutButton } from '@/types/LayoutButton';
import BottomButton from '../buttons/BottomButton';
import { globalstyles } from '@/utils/GlobalStyle';


export default function MainLayout({children, buttons, title} : {children: ReactElement, buttons?: LayoutButton[], title?: string}){
    
    return (
        <View style={[globalstyles.container]}>

            <Text style={globalstyles.title}>{title}</Text>

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      alignContent: 'center',
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
        paddingTop: 10,
        width: '100%'
    }
  });
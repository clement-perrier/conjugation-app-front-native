import { View, StyleSheet, Text } from 'react-native';
import type { ReactElement } from 'react';
import { LayoutButton } from '@/types/LayoutButton';
import BottomButton from '../buttons/BottomButton';
import { globalstyles } from '@/utils/GlobalStyle';
import Styles from '@/constants/Styles';

interface MainLayoutProps {
    children: ReactElement,
    buttons?: LayoutButton[],
    buttonsHorizontal?: boolean,
    title?: string
}

export default function MainLayout({children, buttons, buttonsHorizontal, title} : MainLayoutProps){
    
    return (
        <View style={[globalstyles.container]}>

            { 
                title && 
                    <Text style={globalstyles.title}>{title}</Text> 

            }

            <View style={styles.content}>
               {children}
            </View>

            <View style={[styles.buttonsContainer, buttonsHorizontal ? globalstyles.flexRow : globalstyles.flexColumn]}>

                {buttons?.map((button, index) => 

                    <View key={index}
                        style={[
                            {maxWidth: 500, width: buttonsHorizontal ? '50%' : '100%'}
                            // buttonsHorizontal ? globalstyles.flexRow : globalstyles.flexColumn, 
                            // {alignItems: 'center', justifyContent: 'center'}
                        ]}
                    >

                        { button.topMessage && <Text style={globalstyles.text}>{button.topMessage}</Text> }

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

                    </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Styles.mainPadding,
        width: '100%'
    }

  });
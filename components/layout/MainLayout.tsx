import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import type { ReactElement } from 'react';
import { LayoutButton } from '@/types/LayoutButton';
import BottomButton from '../buttons/BottomButton';
import { globalstyles } from '@/utils/GlobalStyle';
import Styles from '@/constants/Styles';

interface MainLayoutProps {
    children: ReactElement,
    buttons?: LayoutButton[],
    buttonsHorizontal?: boolean,
    title?: string,
    customStyle?: StyleProp<ViewStyle>
}

export default function MainLayout({children, buttons, buttonsHorizontal, title, customStyle} : MainLayoutProps){
    
    
    return (
        <View style={[globalstyles.container, customStyle]}>

            { title && <Text style={globalstyles.title}>{title}</Text>  }

            <View style={styles.content}>
               {children}
            </View>

            <View style={[styles.buttonsContainer, globalstyles.flexColumn]}>

                {buttons?.map((button, index) => 

                    <View key={index} style={{width: '100%'}}>

                        { typeof button.topMessage === 'string' && <Text style={[globalstyles.text, {marginBottom: 20}]}>{button.topMessage}</Text> }

                    
                            <BottomButton 
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
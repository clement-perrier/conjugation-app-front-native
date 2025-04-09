import BottomButton from '@/components/buttons/BottomButton';
import CustomFlatList from '@/components/layout/CustomFlatList';
import MainLayout from '@/components/layout/MainLayout';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
} from 'react-native';

interface ContentProps {
    text: string, 
    image?: {
        source: any, 
        height: number
    },
    image2?: {
        source: any, 
        height: number
    }
}

interface ScreenProps {
    title: string,
    contentList: ContentProps[]
}

const TutorialScreen = () => {

    // Hooks
    const navigation = useAppNavigation()

    // States
    const [step, setStep] = useState(0);
  
    // Data  
    const tutorialContent: ScreenProps[] = [
        {
        title: 'INTRODUCTION',
        contentList: [
            {
                text: 'Welcome to the app that will help you master conjugations for good!',
            },
            {
                text: 'Several languages are available for your learning: French, Spanish, German, and Italian.',
                image: {
                    source: require('../../assets/images/tutorial/flag_list.png'),
                    height: 40
                }
            },
            {
                text: 'The app is based on spaced repetition memorization. As this name suggests, you will practice your conjugations multiple times, but spaced out in the most optimized way possible to retain information with minimal revisions.',
                image: {
                    source: require('../../assets/images/tutorial/retention_graph.png'),
                    height: 200
                }
            }
        ],
        },
        {
        title: 'HOW IT WORKS',
        contentList: [
            {
                text: 'Once you correctly recall a conjugation table for the first time, you will need to practice it again at key intervals:',
            },
            {
                text: '• The next day (Day 1)'
            },
            {
                text: '• The day after (Day 2)'
            },
            {
                text: '• Four days later (Day 4)'
            },
            {
                text: '• One week later (Day 7)'
            },
            {
                text: '• Two weeks later (Day 15)'
            },
            {
                text: '• One month later (Day 30)'
            },
            {
                text: '• Two months later (Day 60)'
            },
            {
                text: '• And finally four months later (Day 120)',
                image: {
                    source: require('../../assets/images/tutorial/progress2.png'),
                    height: 30
                }
            },
            {
                text: `After four months of spaced repetition, you can be confident that the conjugations you've learned are fully mastered.`,
            }
        ]
        },
        {
        title: 'GETTING STARTED',
        contentList: [
            {
                text: 'After choosing the language, start by creating a new set using the "+" button in the main menu.',
                image: {
                    source: require('../../assets/images/tutorial/plus_button.png'),
                    height: 25
                }
            },
            {
                text: 'A set consists of several conjugation tables, allowing you to revise multiple tables simultaneously. You can add up to 5 conjugation tables per set; beyond that, revision can become tedious and affect your motivation.',
                image: {
                    source: require('../../assets/images/tutorial/set_list.png'),
                    height: 300
                }
            }
        ]
        },
        {
        title: 'RESULTS OF PRACTICING',
        contentList: [
            {
                text: 'There are three possibilities when you finish reviewing a set of tables:',
            },
            {
                text: '1. You recalled all the tables correctly, and the set moves to the next repetition level.',
                image: {
                    source: require('../../assets/images/tutorial/results.png'),
                    height: 280
                }
            },
            {
                text: '2. You did not recall any tables correctly; in this case, the reviewing will be postponed to the next day until you recall them correctly.',
                image2: {
                    source: require('../../assets/images/tutorial/results_wrong.png'),
                    height: 280
                }
            },
            {
                text: '3. You recalled some tables correctly and some incorrectly; two sets will be created: one for correct tables that move to the next level (as case 1.) and another for incorrect tables that need to be reviewed the next day (as case 2.).',
            }
        ]
        },
    ];

    // Derived data
    const isFirstStep = step === 0
    const isLastStep = step === tutorialContent.length - 1

    // Handles
    const backStep = () => {
        setStep(step - 1);
    };

    const nextStep = () => {
        if (!isLastStep) {
        setStep(step + 1);
        } else {
            navigation.navigate('On boarding learning language')
        }
    };

    const buttons: LayoutButton[] = [
        {
            label: !isLastStep ? 'NEXT' : 'OK', 
            onPress: nextStep,
            // icon: 'arrow-forward',
            // iconSize: !isLastStep ? 28 : 0,
        }
    ]

    !isFirstStep && buttons.unshift(
        {
            label: 'BACK',
            onPress: backStep,
            // icon: 'arrow-forward',
            // iconSize: !isLastStep ? 28 : 0,
        }
    )

    return (
        <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center'}} >
            <Text style={globalstyles.title}>{tutorialContent[step].title}</Text> 
            <CustomFlatList
                data={tutorialContent[step].contentList}
                itemSeparatorHeight={15}
                renderItem={({ item, index } : {item: ContentProps, index: number}) => (
                    <View style={globalstyles.flexColumn}>
                        <Text style={[{color: Colors.textSecondary, lineHeight: 23, textAlign: 'center', fontSize: 16, fontWeight: '400'}]}>{item.text}</Text>
                        {
                            item.image && 
                                <Image 
                                    source={item.image.source} 
                                    style={[styles.image, {height: item.image.height}]} 
                                    resizeMode="contain" 
                                />
                        }
                        {
                            item.image2 &&
                            <Image 
                                source={item.image2.source} 
                                style={[styles.image, {height: item.image2.height}]} 
                                resizeMode="contain"
                            />
                        }
                        
                    </View>
                )}
            />

            <View style={[{width: '100%', marginTop: 20}, globalstyles.flexRow, globalstyles.flexCenter]}>
                {buttons?.map((button, index) => 
                    <View style={{flex: 1, alignItems: 'center'}}>
                    {/* <View style={[isFirstStep ? {width: '100%'} : {width: '50%'}, {flex: 1, alignItems: 'center'}]}> */}
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
        // <MainLayout title={tutorialContent[step].title} buttons={buttons}>
        //     <CustomFlatList
        //         data={tutorialContent[step].contentList}
        //         itemSeparatorHeight={15}
        //         renderItem={({ item, index } : {item: ContentProps, index: number}) => (
        //             <View style={globalstyles.flexColumn}>
        //                 <Text style={[{color: Colors.textSecondary, lineHeight: 23, textAlign: 'center', fontSize: 16, fontWeight: '400'}]}>{item.text}</Text>
        //                 {
        //                     item.image && 
        //                         <Image 
        //                             source={item.image.source} 
        //                             style={[styles.image, {height: item.image.height}]} 
        //                             resizeMode="contain" 
        //                         />
        //                 }
        //                 {
        //                     item.image2 &&
        //                     <Image 
        //                         source={item.image2.source} 
        //                         style={[styles.image, {height: item.image2.height}]} 
        //                         resizeMode="contain"
        //                     />
        //                 }
                        
        //             </View>
        //         )}
        //     />
        // </MainLayout>
    );
};

const styles = StyleSheet.create({
  image: {
    width: '100%'
  },
});

export default TutorialScreen;

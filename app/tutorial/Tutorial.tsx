import BottomButton from '@/components/buttons/BottomButton';
import CustomFlatList from '@/components/layout/CustomFlatList';
import MainLayout from '@/components/layout/MainLayout';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import useDisableBackHandler from '@/hooks/useDisableBackHandler';
import { useAppSelector } from '@/state/hooks';
import { LayoutButton } from '@/types/LayoutButton';
import { Routes } from '@/types/RootStackParamList';
import { globalstyles } from '@/utils/GlobalStyle';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
} from 'react-native';

//  Interfaces
interface ImageProps {
    source: any, 
    height: number,
    imageLegend?: string
}

interface ContentProps {
    text: string, 
    image?: ImageProps,
    image2?: ImageProps,
}

interface ScreenProps {
    title: string,
    contentList: ContentProps[]
}

const TutorialScreen = () => {

    // Hooks
    const navigation = useAppNavigation()
    // Disable the back button for this screen
    useDisableBackHandler()

    // Selectors
    const user = useAppSelector(state => state.User.value)

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
              text: 'Several languages are available for your learning: French, Spanish, Italian and German.',
              image: {
                source: require('../../assets/images/tutorial/flag_list.png'),
                height: 60
              }
            }
          ]
        },
        {
          title: 'SPACED REPETITION',
          contentList: [
            {
              text: 'The app is based on spaced repetition memorization.',
            },
            {
              text: 'As the name suggests, you will practice your conjugations multiple times, but spaced out in the most optimized way possible to retain information with minimal revisions.',
              image: {
                source: require('../../assets/images/tutorial/retention_graph.png'),
                height: 240,
                imageLegend: 'Repetitions spacing is based on Ebbinghaus forgetting curve'
              }
            }
          ]
        },
        {
          title: 'HOW IT WORKS',
          contentList: [
            {
              text: 'Once you correctly recall a conjugation table for the first time, you will need to practice it again at key intervals.'
            },
            {
              text: "• The next day (D1)\n" +
                    "• The day after (D2)\n" +
                    "• Four days later (D4)\n" +
                    "• One week later (W1)\n" +
                    "• Two weeks later (W2)\n" +
                    "• One month later (M1)\n" +
                    "• Two months later (M2)\n" +
                    "• Four months later (M4)\n",
              image: {
                source: require('../../assets/images/tutorial/progress2.png'),
                height: 45
              }
            }
          ]
        },
        {
          title: 'GETTING STARTED',
          contentList: [
            {
              text: 'After choosing the language, start by creating a new set using the "+" button in the main page:',
              image: {
                source: require('../../assets/images/tutorial/plus_button.png'),
                height: 45
              }
            },
            {
              text: 'Then you can select the verbs and tenses you want to train for this set.'
            }
          ]
        },
        {
          title: 'WHAT IS A SET?',
          contentList: [
            {
              text: 'A set consists of several conjugation tables, allowing you to train multiple tables at the same time.',
              image: {
                source: require('../../assets/images/tutorial/set_list.png'),
                height: 450,
                imageLegend: 'Conjugation tables are represented by a VERB-TENSE pair'
              }
            }
          ]
        },
        {
          title: 'RESULTS AFTER PRACTICING',
          contentList: [
            {
              text: 'There are three possibilities when you finish reviewing a set of tables:',
            }
          ]
        },
        {
          title: 'CASE 1: ALL CORRECT',
          contentList: [
            {
              text: '1. You recalled all the tables correctly, and the set moves to the next repetition level.',
              image: {
                source: require('../../assets/images/tutorial/results.png'),
                height: 350
              }
            }
          ]
        },
        {
          title: 'CASE 2: NONE CORRECT',
          contentList: [
            {
              text: '2. You did not recall any tables correctly; in this case, the reviewing will be postponed to the next day until you recall them correctly.',
              image2: {
                source: require('../../assets/images/tutorial/results_wrong.png'),
                height: 350
              }
            }
          ]
        },
        {
          title: 'CASE 3: MIXED RESULTS',
          contentList: [
            {
              text: '3. You recalled some tables correctly and some incorrectly. Two sets will be created:\n\n• One for correct tables that move to the next level (as in case 1).\n\n• Another for incorrect tables to review the next day (as in case 2).'
            }
          ]
        },
        {
          title: 'READY TO MASTER CONJUGATIONS?',
          contentList: [
            {
              text: `After four months of spaced repetition, you can be confident that the conjugations you've learned are fully mastered.`
            }
          ]
        }
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
            user?.defaultLearningLanguage ? navigation.navigate(Routes.Home) : navigation.navigate(Routes.OnBoardingLearningLanguage)
        }
    };

    const buttons: LayoutButton[] = [
        {
            label: !isLastStep ? 'NEXT' : 'FINISH', 
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
        <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', padding: 20}}>

            <Text style={globalstyles.title}>{tutorialContent[step].title}</Text> 
            <CustomFlatList
                data={tutorialContent[step].contentList}
                itemSeparatorHeight={15}
                renderItem={({ item, index } : {item: ContentProps, index: number}) => (
                    <View key={index} style={[globalstyles.flexColumn, {rowGap: 5}]}>
                        <Text style={[{color: Colors.textSecondary, lineHeight: 23, textAlign: 'center', fontSize: 16, fontWeight: '400'}]}>{item.text}</Text>
                        {
                            item.image && 
                                <>
                                    <Image 
                                        source={item.image.source} 
                                        style={[styles.image, {height: item.image.height}]} 
                                        resizeMode="contain" 
                                    />
                                    { item.image?.imageLegend && <Text style={[globalstyles.text, styles.italic]}>{item.image.imageLegend}</Text> }
                                </>
                                
                            
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
                    <View  key={index} style={{flex: 1, alignItems: 'center'}}>
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
    );
};

const styles = StyleSheet.create({
  image: {
    width: '100%'
  },
  italic: {
    fontStyle: 'italic'
  }
});

export default TutorialScreen;

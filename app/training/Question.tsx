import { View, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Conjugation } from '@/types/Conjugation';
import { useRef, useState } from 'react';
import { Button } from 'react-native';

export default function Question() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // FUNCTIONS
  const shuffleArray = (array: Conjugation[]) : Conjugation[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  const getConjugationList = () : Conjugation[] => {
      return shuffleArray(selectedSet?.tableList.flatMap(table => table.conjugationList ?? []) ?? [])
  };
  
  // STATES, DATA
  const selectedSet = useAppSelector(state => state.SelectedSet.value);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionList = useRef<Conjugation[]>()
  questionList.current = getConjugationList()

  const currentQuestion = questionList.current[currentQuestionIndex]

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Question</Text>
      <Text>{currentQuestion.name}</Text>
      {
        
          <Button 
            title='ok' 
            onPress={() => 
              { 
                questionList.current && 
                  currentQuestionIndex < questionList.current.length - 1 ? 
                    setCurrentQuestionIndex(currentQuestionIndex + 1) 
                    :
                    navigation.navigate('Home')
              }
            }
          ></Button>
      }
    </View>
  );
}

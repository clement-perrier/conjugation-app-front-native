import { View, Text, TextInput, StyleSheet, Button, Animated } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Conjugation } from '@/types/Conjugation';
import { useEffect, useState, useRef } from 'react';
import { updateWithResult } from '@/state/slices/SelectedBatchSlice';
import { addBatch, updateBatchInfo } from '@/state/slices/BatchListSlice';
import addDays from '@/utils/AddDays';
import { hasCorrect, hasMistake } from '@/types/Table';
import { getIncrement, getNextDayNumber } from '@/types/DayNumber';
import { Batch } from '@/types/Batch';
import { SaveBatch, UpdateBatch } from '@/services/ApiService';
import { UserLearningLanguage } from '@/types/UserLearningLanguage';

export default function Question() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);
  const bathcList = useAppSelector(state => state.BatchList.value);
  const user = useAppSelector(state => state.User.value);

  // States
  const [currentConjugationIndex, setCurrentConjugationIndex] = useState<number>(0)
  const [conjugationList, setConjugationList] = useState<Conjugation[]>([])
  const [answer, setanswer] = useState('')
  const [answerStatus, setAnswerStatus] = useState<String | null>(null)
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null)

  //  Derived data
  const currentConjugation: Conjugation = conjugationList[currentConjugationIndex] ?? null

  // Functions
  const shuffleArray = (array: Conjugation[]) : Conjugation[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  const getConjugationList = () : Conjugation[] => {
      return shuffleArray(selectedBatch?.tableList.flatMap(table => table.conjugationList ?? []) ?? [])
  };

  const slideIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const checkAllResult = (bool : boolean) => {
    return selectedBatch.tableList.every(table => 
      table.conjugationList?.some(conjugation => 
          conjugation.correct = bool));
  }

  // Effects
  useEffect(() => {
    selectedBatch && setConjugationList(getConjugationList())
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentConjugationIndex])

  // Handlers
  const handleCheck = () => {
    let correct: boolean | null = null
    if(answer.toLowerCase() === currentConjugation.name) {
      setAnswerStatus('correct')
       correct = true
    } else {
      setAnswerStatus('incorrect')
      correct = false
    }
    dispatch(updateWithResult({id: currentConjugation.id, correct: correct}))
    slideIn()
  }

  const handleContinue = () => {
    if (currentConjugationIndex < conjugationList.length - 1){
      setCurrentConjugationIndex(currentConjugationIndex + 1) 
      setanswer('')
      setAnswerStatus(null);
    } 
    // Training is finished
    else {
      handleResults()
      navigation.navigate('Results')
    }
    slideOut()
  }

  const handleResults = () => {

    const updatedBatch: Batch = {...selectedBatch}

    const allCorrect = selectedBatch.tableList.every(table => 
                          table.conjugationList?.every(conjugation => 
                              conjugation.correct === true));
                              
    const allMistake = selectedBatch.tableList.every(table => 
                          table.conjugationList?.some(conjugation => 
                              conjugation.correct === false));

    if(allCorrect || allMistake){

      // All correct => next day number - All mistake => day number unchanged and reviewing date +1 day
      updatedBatch.dayNumber = allCorrect ? getNextDayNumber(selectedBatch.dayNumber) : selectedBatch.dayNumber
      updatedBatch.reviewingDate = addDays(selectedBatch.reviewingDate, allCorrect ? getIncrement(selectedBatch.dayNumber) : 1)  

    } else {

      // Some table correct some table mistake

      // Filtering correct table(s)
      updatedBatch.tableList = selectedBatch.tableList.filter(table => !hasMistake(table))
      // All correct table => next day number
      updatedBatch.dayNumber = getNextDayNumber(selectedBatch.dayNumber)
      updatedBatch.reviewingDate = addDays(selectedBatch.reviewingDate, getIncrement(selectedBatch.dayNumber))

      const userLearningLanguage: UserLearningLanguage = {
        userId: user.id, 
        learningLanguageId: user.defaultLearningLanguage.id
      }

      // New batch with mistaken table(s)
      const newBatch: Batch = {
        ...selectedBatch,
        id: bathcList.length,
        tableList: selectedBatch.tableList.filter(table => hasMistake(table)),
        reviewingDate: addDays(selectedBatch.reviewingDate, 1),
        userLearningLanguage
      }

      // Dispatch add new batch to BatchList
      dispatch(addBatch(newBatch))

      // Save new Batch to DB
      SaveBatch(newBatch)
      
    }

    // Dispatch updated batch to batch list
    dispatch(updateBatchInfo(updatedBatch))

    // Update batch in DB
    UpdateBatch(updatedBatch)
  }

  return (
    <View style={styles.container}>
      {
        currentConjugation ? (
          <>
            {/*  Title */}
            <View style={styles.flexRow}>
              <Text style={styles.uppercase}>{currentConjugation.verbName}</Text>
              <Text>in</Text> 
              <Text style={styles.uppercase}>{currentConjugation.tenseName}</Text>
            </View>

            {/*  Input */}
            <View style={styles.flexRow}>
              <Text>{currentConjugation.pronoun.name}</Text>
              <TextInput
                ref={inputRef}
                autoFocus
                style={styles.input}
                onChangeText={setanswer}
                value={answer}
                inlineImageLeft='react-logo'
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              {
                // Answer checked
                answerStatus ?
                  <Animated.View style={[styles.result, answerStatus === 'correct' ? styles.correct : styles.incorrect, {
                    transform: [{
                      translateY: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                      }),
                    }],
                  },]}>
                    <View style={styles.resultContent}>
                      <View style={answerStatus === 'correct' ? styles.correct : styles.incorrect}>
                        {answerStatus === 'correct' ? <Text style={styles.correct}>Correct!</Text> : <Text style={styles.incorrect}>Incorrect! Correct answer: {currentConjugation.name}</Text>}
                      </View>
                        <Button
                          title='continue' 
                          onPress={() => handleContinue()}
                        ></Button>
                      </View>
                  </Animated.View>
                // Answer not checked yet
                :
                <View style={styles.checkButton}>
                  <Button 
                    title='check' 
                    onPress={() => handleCheck()}
                    disabled={answer.length === 0}
                  ></Button>
                </View>
              }
            </View>
          </>
        ) : (
      <Text>Loading...</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems:'center',
    columnGap: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 20
  },
  result: {
    padding: 20,
    backgroundColor: '#222',
    borderWidth: 5,
    width: '100%',
    alignItems: 'center'

  },
  resultContent: {
    width: '40%',
  },
  checkButton: {
    width: '20%'
  },
  correct: {
    borderColor: 'green',
    color: 'green',
    fontWeight: 'bold'
  },
  incorrect: {
    borderColor: 'red',
    color: 'red',
    fontWeight: 'bold'
  }
});

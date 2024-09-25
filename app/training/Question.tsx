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
import BottomButton from '@/components/buttons/BottomButton';
import Colors from '@/constants/Colors';
import { globalstyles } from '@/utils/GlobalStyle';
import Styles from '@/constants/Styles';
import * as Progress from 'react-native-progress';
import {ProgressBar} from 'react-native-multicolor-progress-bar';
import { globalAgent } from 'https';
import { current } from '@reduxjs/toolkit';

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
  const [count, setCount] = useState(0)

  // Refs
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null)

  //  Derived data
  const currentConjugation: Conjugation = conjugationList[currentConjugationIndex] ?? null
  const progress = count / conjugationList.length

  // Functions
  // Method shuffling the conjugation array randomly
  const shuffleArray = (array: Conjugation[]) : Conjugation[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  // Method returning the flat and randomly shuffled conjugation list with conjugation items having correct attribute
  const getConjugationList = () : Conjugation[] => {
      return shuffleArray(selectedBatch?.tableList.flatMap(table => table.conjugationList ?? []) ?? [])
  };

  const slideIn = () => {
    slideAnimation.setValue(0); 
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    slideAnimation.setValue(1); 
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 100,
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
    if(answer.toLowerCase().replace(/\s+$/, '') === currentConjugation.name) {
      setAnswerStatus('correct')
      setConjugationList(
          conjugationList.map(conjugation => {
            if(conjugation.id === currentConjugation.id){
              return {
                ...conjugation,
                correct: true
              }
            } else {
              return conjugation
            }
          })
      )
      correct = true
    } else {
      setAnswerStatus('incorrect')
      setConjugationList(
        conjugationList.map(conjugation => {
          if(conjugation.id === currentConjugation.id){
            return {
              ...conjugation,
              correct: false
            }
          } else {
            return conjugation
          }
        })
    )
      correct = false
    }
    console.log(conjugationList)
    dispatch(updateWithResult({id: currentConjugation.id, correct: correct}))
    setCount(count + 1)
    slideIn()
  }

  const handleContinue = () => {
    // slideOut()
    setTimeout(() => {
      if (currentConjugationIndex < conjugationList.length - 1){
        setCurrentConjugationIndex(currentConjugationIndex + 1) 
        setanswer('')
        setAnswerStatus(null);
      } 
      // Training is finished
      else {
        setCurrentConjugationIndex(currentConjugationIndex + 1) 
        
        setTimeout(() => {
          handleResults()
          navigation.navigate('Results')
        }, 1000)
      }
    }, 100);
    
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
      updatedBatch.reviewingDate = addDays(allCorrect ? getIncrement(selectedBatch.dayNumber) : 1)  

    } else {

      // Some table correct some table mistake

      // Filtering correct table(s)
      updatedBatch.tableList = selectedBatch.tableList.filter(table => !hasMistake(table))
      // All correct table => next day number
      updatedBatch.dayNumber = getNextDayNumber(selectedBatch.dayNumber)
      updatedBatch.reviewingDate = addDays(getIncrement(selectedBatch.dayNumber))

      if (user){

        const userLearningLanguage: UserLearningLanguage = {
          userId: user.id, 
          learningLanguageId: user.defaultLearningLanguage.id
        }
  
        // New batch with mistaken table(s)
        const newBatch: Batch = {
          ...selectedBatch,
          id: bathcList.length,
          tableList: selectedBatch.tableList.filter(table => hasMistake(table)),
          reviewingDate: addDays(1),
          userLearningLanguage
        }
  
        // Dispatch add new batch to BatchList
        dispatch(addBatch(newBatch))
  
        // Save new Batch to DB
        SaveBatch(newBatch)

      }
      
    }

    // Dispatch updated batch to batch list
    dispatch(updateBatchInfo(updatedBatch))

    // Update batch in DB
    UpdateBatch(updatedBatch)
  }

  return (

    <View style={[globalstyles.container, globalstyles.flexColumn]}>
      {
        currentConjugation ? (
          <>
            {/* Progress Bar */}
            <View style={[globalstyles.flexRow, {columnGap: 0, width: '100%', height: 10}]}>
              {
                conjugationList.map((conjugation, index) => (
                  <Progress.Bar 
                    key={conjugation.id}
                    progress={count > index ? 1 : 0} 
                    color={count <= index ? Colors.tertiary : (conjugation.correct ? Colors.success : Colors.error)}
                    borderWidth={0}
                    borderRadius={10}
                    width={0}
                    height={10}
                    unfilledColor={Colors.tertiary}
                    style={{flex: 1}} 
                  />
                ))
              }
              {/* <Progress.Bar 
                progress={1} 
                borderWidth={0}
                borderRadius={10}
                width={0}
                height={10}
                unfilledColor={Colors.tertiary}
                style={{flex: 1}} 
              />
              <Progress.Bar 
                progress={1} 
                color={Colors.error}
                borderWidth={0}
                // borderRadius={10}
                width={0}
                height={10}
                unfilledColor={Colors.tertiary}
                style={{flex: 1}} 
              /> */}
            </View>

            {/* <ProgressBar
              arrayOfProgressObjects={[
              {
                color: 'red',
                value: 0.4,
                nameToDisplay: "40%"
              },
              {
                color: 'blue',
                value: 0.6,
                opacity: 0.5
              },
              ]}
            /> */}
       
            {/*  Title */}
            <Text style={[globalstyles.title, {marginBottom: 0}]}><Text style={{color: Colors.primary}}>{currentConjugation.verbName}</Text> in {currentConjugation.tenseName}</Text>

            {/*  Input */}
            <View style={[globalstyles.flexColumn, {flex: 1, justifyContent: 'center'}]}>
              <Text style={[globalstyles.text, {textTransform: 'uppercase'}]}>{currentConjugation.pronoun.name}</Text>
              <TextInput
                ref={inputRef}
                autoFocus
                style={[globalstyles.input, { height: 60, fontSize: 20, textAlign: 'center'}]}
                onChangeText={setanswer}
                value={answer}
              />
            </View>

            {/* Footer */}
            <View style={{height: 150, justifyContent: 'flex-end'}}>
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
                    <View style={[globalstyles.flexColumn, {width: '100%'}]}>
                      <View style={[answerStatus === 'correct' ? styles.correct : styles.incorrect, {alignItems: 'center'}]}>
                        {
                          answerStatus === 'correct'
                            ? <Text style={[{color: Colors.success}, {fontWeight: 'bold'}]}>Correct!</Text> 
                            : <View> 
                                <Text style={{color: Colors.error, textAlign: 'center', marginBottom: 5}}>Incorrect!</Text>
                                <View style={globalstyles.flexRow}> 
                                  <Text style={{color: Colors.error, textAlign: 'center'}}>Correct answer:</Text>
                                  <Text style={{color: Colors.error, fontWeight: 'bold', textTransform: 'uppercase'}}>{currentConjugation.name}</Text>
                                </View> 
                              </View>
                        }
                      </View> 
                      <View>
                      <BottomButton
                        label='continue' 
                        onPress={handleContinue}
                        color={answerStatus === 'correct' ? Colors.success : Colors.error }
                      />
                      </View>
                      </View>
                  </Animated.View>
                // Answer not checked yet
                :
                <View>
                  <BottomButton 
                    label='check' 
                    onPress={handleCheck}
                    disabled={answer.length === 0}
                  />
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
    alignItems: 'center',
    backgroundColor: 'white'
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
    // alignItems: 'center',
    // backgroundColor: Colors.secondary
    // padding: 20
  },
  result: {
    padding: 20,
    // backgroundColor: '#E8F5E9',
    // borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    height: '100%',
    borderRadius: 8
  },
  resultContent: {
    // width: '40%',
  },
  checkButton: {
    // width: '20%'
  },
  correct: {
    borderColor: Colors.success,
    backgroundColor: Colors.successBg
  },
  incorrect: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg
  }
});

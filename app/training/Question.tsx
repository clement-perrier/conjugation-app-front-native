import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Conjugation } from '@/types/Conjugation';
import React, { useEffect, useState, useRef } from 'react';
import { updateSelectedBatch, updateWithResult } from '@/state/slices/SelectedBatchSlice';
import { addBatch, updateBatchInfo } from '@/state/slices/BatchListSlice';
import addDays from '@/utils/AddDays';
import { hasMistake } from '@/types/Table';
import { getIncrement, getNextDayNumber } from '@/types/DayNumber';
import { Batch } from '@/types/Batch';
import { SaveBatch, UpdateBatch } from '@/services/ApiService';
import { UserLearningLanguage } from '@/types/UserLearningLanguage';
import BottomButton from '@/components/buttons/BottomButton';
import Colors from '@/constants/Colors';
import { globalstyles } from '@/utils/GlobalStyle';
import * as Progress from 'react-native-progress';
import Spinner from '@/components/layout/Spinner';
import CustomTooltip from '@/components/CustomTooltip';
import { updateIsNewBatchAdded } from '@/state/slices/isNewBatchAdded';
import InfoButton from '@/components/buttons/InfoButton';

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
  const [shouldFocus, setShouldFocus] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Refs
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null)

  //  Derived data
  const currentConjugation: Conjugation = conjugationList[currentConjugationIndex] ?? null
  // const progress = count / conjugationList.length

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
    if (answerStatus === null) {
      setShouldFocus(true); // Trigger focus
    } else {
      setShouldFocus(false); // Reset when answer is checked
    }
  }, [currentConjugationIndex, answerStatus]);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      // Keyboard.show();
    }
  }, [shouldFocus]);

  // Handlers
  const handleCheck = () => {
    let correct: boolean | null = null
    let userAnswer: string | null = null
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
      userAnswer = answer
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
    console.log(conjugationList);
    userAnswer 
      ? dispatch(updateWithResult({id: currentConjugation.id, correct: correct, userAnswer}))
      : dispatch(updateWithResult({id: currentConjugation.id, correct: correct}))
    setCount(count + 1)
    slideIn()
  }

  const handleContinue = () => {

      // Training continue
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

  }

  const handleResults = () => {

    const updatedBatch: Batch = {...selectedBatch}
    
    const allCorrect = selectedBatch.tableList.every(table =>
      table.conjugationList?.every(conjugation => 
          conjugation.correct === true))
          
    const allMistake = selectedBatch.tableList.every(table => hasMistake(table))
    
    if(allCorrect || allMistake){

      // All correct => next day number - All mistake => day number unchanged and reviewing date +1 day
      updatedBatch.dayNumber = allCorrect ? getNextDayNumber(selectedBatch.dayNumber) : selectedBatch.dayNumber
      updatedBatch.reviewingDate = addDays(allCorrect ? getIncrement(selectedBatch.dayNumber) : 1)  

      // Some table correct some table mistake
    } else {

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

        // Dispatch info that a new batch has been added to BatchList (needed for results screen)
        dispatch(updateIsNewBatchAdded(true))
  
        // Save new Batch to DB
        SaveBatch(newBatch)

      }
      
    }

    // Dispatch updated batch to batch list
    dispatch(updateBatchInfo(updatedBatch))

    // Dispatch updated selectedBatch
    dispatch(updateSelectedBatch(updatedBatch))

    // Update batch in DB
    UpdateBatch(updatedBatch)
  }

  return (

    <View style={[globalstyles.container, globalstyles.flexColumn]}>
      {
        currentConjugation ? (
          <>
            {/* Progress Bar */}
            <View style={[globalstyles.flexRow, styles.progressBarContainer]}>
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
       
            {/*  Title */}
            <Text style={[globalstyles.title, {marginBottom: 0}]}><Text style={{color: Colors.primary}}>{currentConjugation.verbName}</Text> in {currentConjugation.tenseName}</Text>

            {/*  Input & Info button + Tooltip*/}
            <View style={{flex: 1, justifyContent: 'center'}}>

              <View style={[globalstyles.flexRow]}>
                <Text style={[globalstyles.text, {textTransform: 'uppercase', fontWeight: 'bold'}]}>{currentConjugation.pronoun.name}</Text>
                <TextInput
                  ref={inputRef}
                  style={[globalstyles.input, { height: 60, fontSize: 20, flex: 1}]}
                  onChangeText={setanswer}
                  value={answer}
                  editable={shouldFocus}
                />
              </View>

              {/* Info button & tooltip */}
              <View style={[styles.tooltipContainer, globalstyles.flexEnd]}>
  
                <InfoButton size={25} handlePress={() => setTooltipVisible(!tooltipVisible)}/>

                <CustomTooltip 
                  label={'Tip: Press and hold letters for accents. '}
                  visible={tooltipVisible} 
                  setVisible={() => setTooltipVisible(false)}
                  position={{ top: 0, right: 30, bottom: 0}}
                  size={{}}
                />
                
              </View>
              
            </View>
            
            {/* Footer */}
            <View>
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
      // <Text>Loading...</Text>
      <Spinner text={'Loading'}/>
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
  tooltipContainer: {
    // flexDirection: 'row', 
    marginTop: 10
  },
  tooltip: {
    position: 'absolute',
    padding: 15,
    right: 0,
    top: 30,
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.tertiary,
    borderRadius: 10,
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
    // height: '100%',
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
  },
  progressBarContainer: {
    columnGap: 0, 
    width: '100%',
    height: 10,
    marginTop: 15
  }
});

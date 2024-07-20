import { View, Text, TextInput, StyleSheet, Button, Animated } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Conjugation } from '@/types/Conjugation';
import { useEffect, useState, useRef } from 'react';
import { updateWithResult } from '@/state/slices/SelectedSetSlice';

export default function Question() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors
  const selectedSet = useAppSelector(state => state.SelectedSet.value);

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
      return shuffleArray(selectedSet?.tableList.flatMap(table => table.conjugationList ?? []) ?? [])
  };

  // Effects
  useEffect(() => {
    selectedSet && setConjugationList(getConjugationList())
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
    } else {
      navigation.navigate('Results')
    }
    slideOut()
  }

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
              <Text>{currentConjugation.pronounName}</Text>
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
    alignItems: 'center'
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

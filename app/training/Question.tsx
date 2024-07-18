import { View, Text, TextInput, StyleSheet, Button, Animated } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Conjugation } from '@/types/Conjugation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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
  const currentConjugation = conjugationList[currentConjugationIndex] ?? null

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
  }, [selectedSet])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentConjugationIndex])

  // Handlers
  const handleAnswer = () => {
    if(answer === currentConjugation.name) {
      setAnswerStatus('correct')
    } else {
      setAnswerStatus('incorrect')
    }
    slideIn()
  }

  const handleContinue = () => {
    if (currentConjugationIndex < conjugationList.length - 1){
      setCurrentConjugationIndex(currentConjugationIndex + 1) 
      setanswer('')
      setAnswerStatus(null);
    } else {
      navigation.navigate('Home')
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        currentConjugation ? (
          <>
            <View style={styles.flexRow}>
              <Text style={styles.uppercase}>{currentConjugation.verbName}</Text>
              <Text>in</Text> 
              <Text style={styles.uppercase}>{currentConjugation.tenseName}</Text>
            </View>
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
            <Button 
              title='check' 
              onPress={() => handleAnswer()}
              disabled={answer.length === 0}
            ></Button>
          </>
        ) : (
      <Text>Loading...</Text>
        )
      }
      {
        answerStatus &&
          <Animated.View style={[styles.footer, answerStatus === 'correct' ? styles.correct : styles.incorrect, {
            transform: [{
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            }],
          },]}>
            <View>
              <View style={answerStatus === 'correct' ? styles.correct : styles.incorrect}>
                {answerStatus === 'correct' ? <Text style={styles.correct}>Correct!</Text> : <Text style={styles.incorrect}>Incorrect! Correct answer: {currentConjugation.name}</Text>}
              </View>
              <Button 
                title='continue' 
                onPress={() => handleContinue()}
              ></Button>
            </View>
          </Animated.View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
    backgroundColor: '#222',
    alignItems: 'center',
    borderWidth: 5,
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

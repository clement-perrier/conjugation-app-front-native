import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { dayNumberList, getLabel, getNextDayNumber, getPreviousDayNumber } from '@/types/DayNumber';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface CustomProgressStepsProps {
  currentStep: number, 
  isResult?: boolean,
  isCorrect?: boolean
}

const CustomProgressSteps = ({currentStep, isResult, isCorrect} : CustomProgressStepsProps) => {
  
  // Data
  const steps = [...dayNumberList];
  const stepsLength = steps.length
  
  const circleSize = 29

  // let { width: screenWidth } = Dimensions.get('window');
  // screenWidth = screenWidth - Styles.mainPadding * 2

  // const lineWidth = (screenWidth - steps.length * circleSize) / (steps.length - 1);

  // Functions
  // Function to dynamically calculate font size based on circle size and text length
  const calculateFontSize = (textLength: number) => {
    const baseFontSize = circleSize * 0.45; // Base font size: 60% of circle size
    // Adjust font size based on text length (reduce font size for longer text)
    return baseFontSize / Math.max(1, textLength / 2.1);
  };


  return (
    <View style={styles.container}>

      <View style={styles.progressContainer}>

        {steps.map((step, index) => {

          const label = getLabel(step)
          const isActive = step < currentStep;
          const isCurrent = step === currentStep
          const isNext = step === getNextDayNumber(currentStep)
          const isPrevious = step === getPreviousDayNumber(currentStep)
          const isLast = (isResult ? isNext : index === steps.length - 1)

          // const fontSize = calculateFontSize(step.valueOf().toLocaleString().length)
          // const isNotDisplayed = isResult && (
          //                         !isCurrent ||
          //                         !(step === getNextDayNumber(currentStep)) || 
          //                         !(step === getPreviousDayNumber(currentStep))
          //                         )

          const isDisplayed = !isResult || (
                                isResult && (
                                  isCurrent || isNext || isPrevious
                                )
                              )

            // Defining line style
            let lineStyle;
            if (isResult) {
              // In result page, correct = green line - mistake = red line
              lineStyle = isActive ? (isCorrect ? styles.successLine : styles.errorLine) : styles.inactiveLine;
            } else {
              // In start page, active = green line - inactive = grey line
              lineStyle = isActive ? styles.successLine : styles.inactiveLine;
            }

          return (
            isDisplayed && 
              <View key={index} style={[styles.stepContainer, !isLast && {flex: 1}]}>
                {/* Circle */}
                <View
                  style={[
                    styles.circle,
                    {width: circleSize, height: circleSize, borderRadius: 8,},
                    isCurrent ? ((!isResult || isCorrect) ? styles.currentCircle : styles.incorrectCircle) : (isActive ? styles.activeCircle : styles.inactiveCircle)
                  ]}
                >
                  <Text 
                    style={[
                      styles.circleText, 
                      {fontSize: 13},
                      isActive ? styles.activeCircleText : styles.circleText
                    ]}>
                      { label }
                    </Text>
                </View>

                {/* Line */}
                { !isLast && <View style={[styles.line, lineStyle]} /> }
               
              </View>
          )
        })}

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // maxWidth: 400,
    flex: 1
    // marginVertical: Styles.mainPadding
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  currentCircle: {
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.primary 
  },
  activeCircle: {
    backgroundColor: Colors.successBg,
    borderWidth: 2,
    borderColor: Colors.success,
    color: Colors.success
  },
  inactiveCircle: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.tertiary
  },
  incorrectCircle: {
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.error
  },
  circleText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  activeCircleText: {
    // color: Colors.success
  },
  line: {
    height: 2,
    width: '100%',
    flexGrow: 1
  },
  successLine: {
    backgroundColor: Colors.success,
  },
  errorLine: {
    backgroundColor: Colors.error,
  },
  inactiveLine: {
    backgroundColor: Colors.secondary,
    
  },
});

export default CustomProgressSteps; 

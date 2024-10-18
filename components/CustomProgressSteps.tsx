import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { DayNumber, dayNumberList } from '@/types/DayNumber';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { screensEnabled } from 'react-native-screens';

const CustomProgressSteps = ({currentStep} : {currentStep: number}) => {
  
  // Data
  const steps = dayNumberList;
  
  const circleSize = 29

  let { width: screenWidth } = Dimensions.get('window');
  screenWidth = screenWidth - Styles.mainPadding * 2

  const lineWidth = (screenWidth - steps.length * circleSize) / (steps.length - 1);

  // Functions
  // Function to dynamically calculate font size based on circle size and text length
  const calculateFontSize = (textLength: number) => {
    const baseFontSize = circleSize * 0.45; // Base font size: 60% of circle size
    // Adjust font size based on text length (reduce font size for longer text)
    return baseFontSize / Math.max(1, textLength / 2.1);
  };


  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => {
        console.log(step, index)
        const isActive = step < currentStep;
        const isCurrent = step === currentStep
        const fontSize = calculateFontSize(step.valueOf().toLocaleString().length)
        return (
          <View key={index} style={styles.stepContainer}>
            {/* Circle */}
            <View
              style={[
                styles.circle,
                {width: circleSize, height: circleSize, borderRadius: 8,},
                isCurrent ? styles.currentCircle : (isActive ? styles.activeCircle : styles.inactiveCircle)
              ]}
            >
              <Text 
                style={[
                  styles.circleText, 
                  {fontSize: fontSize},
                  isActive ? styles.activeCircleText : styles.circleText
                ]}>
                  D{step}
                </Text>
            </View>

            {/* Line */}
            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  isActive ? styles.activeLine : styles.inactiveLine,
                  {width: lineWidth}
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Styles.mainPadding
    // padding: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    // width: circleWidth,
    // height: circleWidth,
    // borderRadius: 35,
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
  circleText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  activeCircleText: {
    // color: Colors.success
  },
  line: {
    height: 2,
  },
  activeLine: {
    backgroundColor: Colors.success,
  },
  inactiveLine: {
    backgroundColor: Colors.tertiary,
    
  },
});

export default CustomProgressSteps;

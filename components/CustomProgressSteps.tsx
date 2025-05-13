import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { DayNumber, dayNumberList, getLabel, getNextDayNumber, getPreviousDayNumber } from '@/types/DayNumber';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface CustomProgressStepsProps {
  currentStep: number, 
  isResult?: boolean,
  isCorrect?: boolean
}

export default function CustomProgressSteps ({currentStep, isResult, isCorrect} : CustomProgressStepsProps) {
  
  // Data
  const steps = [...dayNumberList];
  const previousDayLabel = isResult ? getLabel(getPreviousDayNumber(currentStep)) : null
  const currentDayLabel = isResult ? getLabel(currentStep) : null
  const nextDayLabel = isResult ? getLabel(getNextDayNumber(currentStep)) : null

  return (
    <View style={styles.container}>

    {

      isResult ? (

        // Result page progress bar
        <View style={styles.progressContainer}>
          
          {
            currentStep === DayNumber.ZERO 
            ? 
              // Starting Point user doing Day 0
              <View style={[styles.stepContainer, styles.flex1]}>
                <View style={styles.startingPoint}/>
                <View style={[styles.stepLine, {backgroundColor: Colors.secondary}]}/>
              </View>
            : 
              // Previous day when != Day 0 - Colors always green success
              <ProgressStep 
                label={previousDayLabel}
                hasLine={true}
                lineColor={Colors.success}
                itemBorderWidth={2}
                itemBorderColor={Colors.success}
                itemBackgroundColor={Colors.successBg}
              />
          }

          {/* Current step */}
          {/* Colors based on isCorrect ? green success : red error */}
          <ProgressStep 
            label={currentDayLabel}
            hasLine={true}
            lineColor={isCorrect ? Colors.secondary : Colors.error}
            itemBorderWidth={2}
            itemBorderColor={isCorrect ? Colors.primary : Colors.error}
            itemBackgroundColor={isCorrect ? Colors.secondary : Colors.errorBg}
          />

          {/* Next Step - Neutral color */}
          <ProgressStep 
            label={nextDayLabel}
            hasLine={false}
            lineColor={null}
            itemBorderWidth={1}
            itemBorderColor={Colors.tertiary}
            itemBackgroundColor={Colors.secondary}
          />
          
        </View>

      ) : (
        // Start page Progress Bar
        <View style={styles.progressContainer}>
          
          {

            // Displaying totality of steps for Start Page
            steps.map((step, index) => {

              // DX / WX / MX format label
              const label = getLabel(step)
              // Define if browsed step has already been done by user
              const isDone = step < currentStep;
              // Define if browsed step is current user step
              const isCurrent = step === currentStep
              // Define if browsed step is last ever step (no line at the end)
              const isLast = index === steps.length - 1

              // Line Color => isDone =  green - !isDone =  grey
              const lineColor = !isLast ? (isDone ? Colors.success : Colors.secondary) : null

              // Item border width => if step done or current 2 else 1
              const itemBorderWidth = (isDone || isCurrent) ? 2 : 1

              // Item border color => if step done = green - if step current = primary - else = tertiary
              const itemBorderColor = isDone ? Colors.success : (isCurrent ? Colors.primary : Colors.tertiary) 

              // Item background color => if step done = green else = tertiary
              const itemBackgroundColor = isDone ? Colors.successBg : Colors.secondary

              return (

                <ProgressStep 
                  key={index}
                  label={label}
                  hasLine={!isLast}
                  lineColor={lineColor}
                  itemBorderWidth={itemBorderWidth}
                  itemBorderColor={itemBorderColor}
                  itemBackgroundColor={itemBackgroundColor}
                />

              )
              
            })

          }

        </View>
      )

    }
      
    </View>
  )
  
};


interface ProgressStepProps {
  // DX / WX / MX format label
  label: string | null, 
  // If no line CSS is not the same
  hasLine: boolean,
  // Color of the line going to the next step
  lineColor: string | null,  
  // Border width of the step item
  itemBorderWidth: number, 
  // Border color of the step item
  itemBorderColor: string, 
  // Border background color of the step item
  itemBackgroundColor: string 
}

export function ProgressStep (

  {
    label, 
    hasLine,
    lineColor,  
    itemBorderWidth, 
    itemBorderColor, 
    itemBackgroundColor 

  } : ProgressStepProps
  
) {

  return (

    <View style={[styles.stepContainer, hasLine && styles.flex1]}>

        {/* Step Item */}
        <View
          style={[
            styles.stepItem, 
            {
              backgroundColor: itemBackgroundColor,
              borderWidth: itemBorderWidth,
              borderColor: itemBorderColor 
            }
          ]}
        >
          {/* Step Item Label */}
          <Text style={[styles.stepItemText, {color: Colors.accent}]}> { label } </Text>

        </View>

        {/* Step Line */}
        { hasLine && <View style={[styles.stepLine, lineColor && {backgroundColor: lineColor}]} /> }
      
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    flex: 1
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    width: 31,
    height: 31,
    borderRadius: 8
  },
  stepItemText: {
    fontWeight: 'bold',
    fontSize: 13
  },
  stepLine: {
    height: 2,
    width: '100%',
    flex: 1
  },
  startingPoint: {
    height: 10, 
    width: 10, 
    borderRadius: 20,
    backgroundColor: Colors.secondary
  },
  flex1: {
    flex: 1
  }
});

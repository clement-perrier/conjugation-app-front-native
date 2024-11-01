import Colors from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ViewStyle, Animated } from 'react-native';

interface CustomTooltipProps {
  label: string,
  visible?: boolean, 
  setVisible?: () => void,
  position: {},
  height?: number,
  manual: boolean
}

export default function CustomTooltip({label, visible, setVisible, position, height = 45, manual} : CustomTooltipProps) {

  return (
    visible &&
    <>
    {/* <View style={{backgroundColor:'black', opacity: 0.1, position: 'absolute', width: '100%', height: '100%', zIndex: 1}}></View> */}
      <TouchableWithoutFeedback onPress={setVisible}> 
          <View style={[styles.tooltip, {
            ...position, 
            width: label.length * 7, 
            height
          }]}>
            <Text style={{color: Colors.textPrimary}}>{label}</Text>
          </View>
      </TouchableWithoutFeedback>
      </>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.tertiary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  }
});

import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { useState } from 'react';
import { globalstyles } from '@/utils/GlobalStyle';

export default function CustomTooltip({visible, setVisible} : {visible: boolean, setVisible: () => void}, style: ViewStyle) {

  // States
  // const [modalVisible, setModalVisible] = useState(false);

  // Derived data

  // Functions

  // Handlers

  return (

    <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={setVisible}
        style={style}
      >
        <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.tooltipContent}>
            <Text style={globalstyles.text}>Tip: Press and hold letters for accents.</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

  );
}

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  tooltipContent: {
    width: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

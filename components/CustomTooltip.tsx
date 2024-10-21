import Colors from '@/constants/Colors';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';

interface CustomTooltipProps {
  label: string,
  visible: boolean, 
  setVisible: () => void,
  position: {},
  size: {}
}

export default function CustomTooltip({label, visible, setVisible, position, size} : CustomTooltipProps) {

  // States
  // const [modalVisible, setModalVisible] = useState(false);

  // Derived data

  // Functions

  // Handlers

  return (
    visible &&
      <TouchableWithoutFeedback onPress={setVisible}> 
          <View style={[styles.tooltip, {...position, ...size, width: label.length * 7, height: 45}]}>
            <Text style={{color: Colors.textPrimary}}>{label}</Text>
          </View>
      </TouchableWithoutFeedback>
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
    alignItems: 'center'
  }
});

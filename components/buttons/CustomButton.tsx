import { StyleSheet, View, Pressable, Text } from 'react-native';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';

export default function CustomButton({ label, onPress } : {label:string, onPress?(): void}) {
  
      return (  
        // <View style={styles.buttonContainer}>
          <Pressable 
          style={({pressed}) => [
            styles.button,
            {opacity: pressed ? 0.4 : 1}
          ]}
          onPress={onPress}>
              <Text style={{color: 'white', textAlign: 'center'}}>{label}</Text>
          </Pressable>
        // {/* </View> */}
      );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // alignItems: 'flex-end', 
    // display: 'flex'
    // justifyContent: 'center',
    // flex: 1
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 10
  }
});

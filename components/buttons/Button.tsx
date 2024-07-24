import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Button({ label, linkTo, onPress } : {label:string, linkTo: string, onPress?(): void}) {
  
      return (  
        <View style={styles.buttonContainer}>
          <Link href={linkTo} asChild>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={{color: 'white'}}>{label}</Text>
            </Pressable>
          </Link>
        </View>
      );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '50%',
    height: '25%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white'
  }
});

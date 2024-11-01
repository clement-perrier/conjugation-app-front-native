import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import { Pressable, StyleSheet, Image, Text } from 'react-native';

const flags: any = {
  spain: require('../assets/images/flags/spain.png'),
  germany: require('../assets/images/flags/germany.png'),
  france: require('../assets/images/flags/france.png'),
  italy: require('../assets/images/flags/italy.png'),
  // Add more countries as needed
};

export default function Flag({countryName, onPress} : {countryName: string, onPress: () => void}) {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  const flagSource = flags[countryName]

  return (
    <Pressable onPress={onPress}>
      <Image 
        style={styles.image} 
        source={flagSource}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40, 
    height: 30,
    borderRadius: 6, 
    borderColor: 'black', 
    borderWidth: 2
  }
});

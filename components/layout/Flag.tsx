import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import { globalstyles } from '@/utils/GlobalStyle';
import { Pressable, StyleSheet, Image, Text, ImageStyle } from 'react-native';

export default function Flag({countryName} : {countryName: string}) {

  const flags: any = {
    spain: require('../../assets/images/flags/spain.png'),
    germany: require('../../assets/images/flags/germany.png'),
    france: require('../../assets/images/flags/france.png'),
    italy: require('../../assets/images/flags/italy.png'),
    // Add more countries as needed
  };

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  const flagSource = flags[countryName]

  return (
      <Image 
        style={[styles.image]} 
        source={flagSource}
      />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 27, 
    height: 17,
    borderRadius: 4, 
    // borderColor: 'black', 
    // borderWidth: 2
  }
});

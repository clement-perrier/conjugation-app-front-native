import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';

export default function Home() {

const PlaceholderImage = require('../assets/images/background-image.png');

const [selectedImage, setSelectedImage] = useState<String | null>(null);

const [showAppOptions, setShowAppOptions] = useState(false);

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  } else {
    alert('You did not select any image.');
  }
};

useEffect(() => {
  console.log(selectedImage);
}, [selectedImage])

  return (
    <View style={styles.container}>
      Home
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
import { StyleSheet, Image, ImageProps } from 'react-native';

interface ImageViewerProps { 
  placeholderImageSource: ImageProps, 
  selectedImage: String | null
}

export default function ImageViewer({ placeholderImageSource, selectedImage } :  ImageViewerProps){

  const imageSource: ImageProps | Object = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

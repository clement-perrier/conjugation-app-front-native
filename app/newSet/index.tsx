import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function Tab() {

  return (
    <View style={styles.container}>
      <Link href='newSet/customSet/verbSelection' asChild>
        <Pressable style={styles.button}>
            {/* <Text>Custom Sets</Text> */}
          Custom Set
        </Pressable>
      </Link>
      <Link href="newSet/preSet">
        <Button label='Pre Set' />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    height: 68,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white'
  },
});

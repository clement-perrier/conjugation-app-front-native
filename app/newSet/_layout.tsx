import { Stack } from 'expo-router';

export default function NewSetLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen 
        name="index"
        options={{
          title: 'Custom Set or Pre Set'
        }} 
      />
      <Stack.Screen 
        name="customSet/verbSelection"
        options={{
          title: 'Custom Set'
        }} 
      />
      <Stack.Screen 
        name="preSet/preSetList"
        options={{
          title: 'Pre Set'
        }} 
      />
    </Stack>
  );
}

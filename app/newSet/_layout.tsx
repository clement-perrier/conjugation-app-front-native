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
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="customSet/verbSelection"
        options={{
          title: 'Verb Selection'
        }} 
      />
      <Stack.Screen 
        name="preSetList"
        options={{
          title: 'Pre Set List'
        }} 
      />
    </Stack>
  );
}

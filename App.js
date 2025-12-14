import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Mini Inventory Manager',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="AddItem" component={AddItemScreen} options={{headerTitle: '',}}/>
        <Stack.Screen name="EditItem" component={EditItemScreen} options={{headerTitle: '',}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

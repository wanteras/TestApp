import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from  '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './src/tabs';
import Restaurant from './src/screens/Restaurant';
import OrderDelivery from './src/screens/OrderDelivery';

const Stack = createStackNavigator();

function Home() {
  return(
    <Tabs/>
  );
}

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name = "Home" 
          component = {Home} 
          options={{ headerMode: 'none' }}/>
      <Stack.Screen name = "Restaurant" component = {Restaurant} options={{ headerMode: 'none' }}/>
      <Stack.Screen name = "OrderDelivery" component = {OrderDelivery} options={{ headerMode: 'none'}}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
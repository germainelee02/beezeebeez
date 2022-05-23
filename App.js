import { StatusBar } from 'expo-status-bar';
import LoginScreen from './assets/screens/LoginScreen';
import SignUpScreen from './assets/screens/SignUpScreen';
import HomeScreen from './assets/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from './firebase/firebase-config';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name = 'login' component = {LoginScreen} options = {{headerShown: false}} />
        <Stack.Screen 
        name = 'signup' component = {SignUpScreen} options = {{ title: 'Sign Up', headerStyle:{backgroundColor: 'rgba(245, 233, 188, 1)'}}} />
        <Stack.Screen name = 'temp home' component = {HomeScreen} options = {{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default function App() {
  return (
      <MyStack/>
  );
}


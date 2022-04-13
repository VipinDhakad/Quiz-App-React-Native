import { View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home.js';
import Result from '../screens/Result.js';
import Quiz from '../screens/Quiz.js';
import Answer from '../screens/Answer.js';
const Stack=createNativeStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Quiz' component={Quiz} options={{headerShown:false}}/>
        <Stack.Screen name='Result' component={Result} options={{headerShown:false}}/>
        <Stack.Screen name='Answer' component={Answer} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default MyStack


import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native' ;
import { authentication } from '../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // logs in to the homescreen when the authentication state is changed (log in or sign up)
  // not really sure how this works..
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('temp home');
      }
    })
    return unsubscribe
  }, [])

  // handles log in with firebase
  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
    })
    .catch(error => alert(error.message));
  }
    return (  
      <KeyboardAvoidingView style = {styles.background} >
          <TouchableOpacity style = {styles.signUp} onPress = {() => navigation.navigate('signup')}>
              <Text style = {styles.signUpText}> Sign Up </Text>
          </TouchableOpacity>

          <Image style = {styles.image} source = {require('../bee-logo.png')} />
          <TextInput 
            placeholder = 'Email...' 
            autoCapitalize = 'none' 
            value = { email }
            onChangeText = {text => setEmail(text)}
            style = {styles.emailBox}/>
          <TextInput
           placeholder = 'Password...' 
           secureTextEntry = {true} 
           value = { password }
           onChangeText = {pass => setPassword(pass)}
           autoCapitalize = 'none' 
           style = {styles.emailBox}/>
          <TouchableOpacity 
            style = {styles.loginButton} 
            onPress = {() => handleLogin()}>
              <Text style = {styles.loginText}> Login </Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {   
        flex: 1,
        backgroundColor: 'rgba(245, 233, 188, 1)',
        justifyContent: 'center',
        alignItems: 'center'
      },
      emailBox: {
          height: 70,
          width: '100%',
          backgroundColor: 'white',
          margin: 5,
          borderRadius: 15
      },
      image: {
        height: '50%',
        width: '50%',
        margin: 0
    },
      loginButton: {
          width: '50%',
          height: 70,
          backgroundColor: 'rgb(251, 194, 8)',
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 100,
           margin: 20,
      },
      loginText: {
          fontSize: 18,
          fontWeight: 'bold'
      },
      signUpText: {
        textDecorationLine: 'underline', 
        fontSize: 18
      },
      signUp: {
        position: 'absolute',
        top: 85, 
        right: 30, 
      }
})

export default LoginScreen;
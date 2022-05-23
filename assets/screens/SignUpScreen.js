import React, {useState} from 'react';
import { Alert, View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native' ;
import { authentication } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpScreen(props) {
  // the email that is saved and used to log in
    const [email, setEmail] = useState('');

    // the password that comes with the email 
    const [password, setPassword] = useState('');

    // asking users to enter password a second time to check if it matches with the password typed in the second time
    const [repassword, setRepassword] = useState('');

    // function that uses firebase to sign up for an account
    const handleSignUp = () => {
      if (password == repassword) {
        createUserWithEmailAndPassword(authentication, email, password)
         .then(userCredentials => {
           const user = userCredentials.user;
           console.log(user.email);
         })
         .catch(error => alert(error.message));
      } else {
        Alert.alert('Error', 'Password mismatch');
      }
      }
    return (    
      <KeyboardAvoidingView style = {styles.background} >
          <Image style = {styles.image} source = {require('../bee-logo.png')} />
          <TextInput 
          placeholder = 'Email...'
          // when the user types in, it changes the `email` state at the top
          onChangeText={text => setEmail(text)}
           autoCapitalize = 'none' 
           style = {styles.emailBox}/>
          <TextInput 
          placeholder = 'Password...' 
          secureTextEntry = { true } 
          // when user types in the password, it changes `password` state at the top
          onChangeText={text => setPassword(text)}
          autoCapitalize = 'none' 
          style = {styles.emailBox}/>
          <TextInput 
          placeholder = 'Re-enter password...' 
          // changes `repassword` state at the top when user types in repassword
          secureTextEntry = { true } autoCapitalize = 'none' 
          onChangeText={text => setRepassword(text)}
          style = {styles.emailBox}/>
          <TouchableOpacity
           style = {styles.loginButton} 
           // when button is pressed, signs up
           onPress = {() => handleSignUp()}>
              <Text style = {styles.loginText}> Sign up! </Text>
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

})

export default SignUpScreen;
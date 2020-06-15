import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

const Account = ({handleAccessToken, auth0, action}) => {
  const navigation = useNavigation();
  console.log('name: ' + navigation.state);
  useEffect(() => {
    const handleLogin = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      login(action);
    });
  }, [navigation]);
  //handle login/logout
  function login(action) {
    if (action == 'logout') {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          handleAccessToken(null);
        })
        .catch(error => {
          console.log('Log out cancelled');
        });
    } else {
      auth0.webAuth
        .authorize({scope: 'openid profile email'})
        .then(
          credentials =>
            // Successfully authenticated
            // Store the accessToken
            handleAccessToken({accessToken: credentials.accessToken}),
          navigation.navigate('Dashboard'),
        )
        .catch(error => console.log(error));
    }
  }
  return (
    <View>
      <Text>Logging In</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#fff',
    height: 75,
    width: width,
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    padding: 20,
    fontSize: 20,
    fontFamily: 'FrancoisOne-Regular',
    textAlign: 'center',
  },
  profPic: {
    padding: 20,
    borderWidth: 3,
    borderColor: '#333',
    height: 50,
    width: 50,
  },
});
export default Account;

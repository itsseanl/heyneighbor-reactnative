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

const Nav = ({handleAccessToken, auth0, accessToken, userInfo}) => {
  const [hasInitialized, setHasInitialized] = useState(true);

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
        .then(credentials =>
          // Successfully authenticated
          // Store the accessToken
          handleAccessToken({accessToken: credentials.accessToken}),
        )
        .catch(error => console.log(error));
    }
  }
  console.log('access token: ' + accessToken);
  // console.log(userInfo.picture);
  return (
    <View style={styles.nav}>
      {hasInitialized &&
        (accessToken == null ? (
          <TouchableOpacity onPress={login}>
            <Text style={styles.navText}>Signup</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.navText}>Feed</Text>
          </TouchableOpacity>
        ))}
      {userInfo && (
        <Image style={styles.profPic} source={{uri: userInfo.picture}} />
      )}

      {hasInitialized &&
        (accessToken == null ? (
          <TouchableOpacity onPress={() => login('login')} title="Login">
            <Text style={styles.navText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => login('logout')} title="Logout">
            <Text style={styles.navText}>Logout</Text>
          </TouchableOpacity>
        ))}
      {/* com.heyneighborrn */}
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
export default Nav;

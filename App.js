/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import tailwind from 'tailwind-rn';
import Auth0 from 'react-native-auth0';
import Dashboard from './Dashboard';
import Feed from './Feed';

import Account from './components/Account';

import SplashPage from './components/SplashPage';
import {NavigationContainer, useLinkProps} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DOMAIN} from 'react-native-dotenv';
import {CLIENT_ID} from 'react-native-dotenv';

const auth0 = new Auth0({
  domain: `${DOMAIN}`,
  clientId: `${CLIENT_ID}`,
});

const App: () => React$Node = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRadius, setUserRadius] = useState(null);
  const Tab = createBottomTabNavigator();

  const handleAccessToken = resp => {
    if (resp != null) {
      console.log('resp: ' + Object.values(resp));
      auth0.auth
        .userInfo({token: Object.values(resp)})
        .then(data => {
          setUserInfo(data);
          // this.gotoAccount(data); // go to the Account screen
        })
        .catch(err => {
          console.log('error occurred while trying to get user details: ', err);
        });
    } else {
      setUserInfo(null);
    }
    setAccessToken(resp);
  };

  const handleUserRadius = resp => {
    setUserRadius(resp);
  };

  // console.log(accessToken);
  // console.log(userInfo);
  return (
    <>
      {/* <SplashPage /> */}
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let isDashboard;
              let iconName;
              if (route.name === 'Feed') {
                iconName = 'md-list-box';
              }
              if (route.name === 'Dashboard') {
                iconName = 'md-settings';
                isDashboard = true;
              }
              if (route.name === 'Home') {
                iconName = 'ios-home';
              }
              if (route.name === 'Login') {
                iconName = 'md-log-in';
              }
              if (route.name === 'Logout') {
                iconName = 'md-log-out';
              }

              // You can return any component that you like here!
              return (
                <>
                  {isDashboard ? (
                    // <Image
                    //   style={styles.profPic}
                    //   source={{uri: userInfo.picture}}
                    // />
                    <Ionicons name={iconName} size={size} color={color} />
                  ) : (
                    <Ionicons name={iconName} size={size} color={color} />
                  )}
                </>
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#2088c2',
            inactiveTintColor: 'gray',
          }}>
          {userInfo && (
            <>
              <Tab.Screen name="Feed">
                {() => <Feed userInfo={userInfo} />}
              </Tab.Screen>
              <Tab.Screen name="Dashboard">
                {() => (
                  <Dashboard
                    userInfo={userInfo}
                    userRadius={userRadius}
                    handleUserRadius={handleUserRadius}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen name="Logout">
                {() => (
                  <Account
                    auth0={auth0}
                    handleAccessToken={handleAccessToken}
                  />
                )}
              </Tab.Screen>
            </>
          )}
          {!userInfo && (
            <>
              <Tab.Screen name="Home" component={SplashPage} />
              <Tab.Screen name="Login">
                {() => (
                  <Account
                    auth0={auth0}
                    handleAccessToken={handleAccessToken}
                  />
                )}
              </Tab.Screen>
            </>
          )}
        </Tab.Navigator>
        {/* <Nav
          handleAccessToken={handleAccessToken}
          auth0={auth0}
          accessToken={accessToken}
          userInfo={userInfo}
        /> */}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  profPic: {
    padding: 20,
    borderWidth: 3,
    borderColor: '#333',
    height: 50,
    width: 50,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

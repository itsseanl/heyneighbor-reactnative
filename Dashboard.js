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

import Slider from '@react-native-community/slider';
import RNLocation from 'react-native-location';

const {width, height} = Dimensions.get('window');

const Dashboard = ({userInfo, userRadius, handleUserRadius}) => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(5);
  const [userLocation, setUserLocation] = useState(null);
  const handleValue = newValue => {
    setValue(newValue);
  };

  RNLocation.configure({
    distanceFilter: 5.0,
  });

  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
    },
  }).then(granted => {
    if (granted) {
      RNLocation.subscribeToLocationUpdates(locations => {
        setUserLocation(locations[0]);
        console.log(locations[0]);
        console.log(userLocation);
        // console.log(userLocation.location.location.longitude);
      });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentWrap}>
        <View style={styles.info}>
          <Text>Welcome, {userInfo.name}!</Text>
          {userInfo.picture && (
            <Image
              source={{uri: `${userInfo.picture}`}}
              style={styles.profImg}
            />
          )}
          {userLocation && (
            <View>
              <Text>{userLocation.latitude}</Text>
              <Text>{userLocation.longitude}</Text>
            </View>
          )}
        </View>

        <View style={styles.sliderView}>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={100}
            value={value}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={value => handleValue(value)}
            step={1}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2088c2',
    height: height,
  },
  contentWrap: {
    color: '#333',
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: 300,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },
  profImg: {
    width: 50,
    height: 50,
    padding: 10,
    resizeMode: 'stretch',
    zIndex: 3,
  },
});
export default Dashboard;

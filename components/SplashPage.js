import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

const SplashPage = () => {
  return (
    <>
      <Video
        source={require('../assets/city.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={styles.videoOverlay}></View>
      <View style={styles.overlayContent}>
        <Image style={styles.stretch} source={require('../assets/homey.png')} />
        <Text style={styles.homeTitle}>HeyNeighbor</Text>
        <Text style={styles.homeText}>a community-driven social network</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: height - 75,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  videoOverlay: {
    backgroundColor: '#2088c2',
    opacity: 0.9,
    height: height - 75,
  },
  overlayContent: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  homeTitle: {
    fontFamily: 'Satisfy-Regular',
    color: '#fff',
    fontSize: 60,
  },
  homeText: {
    fontFamily: 'FrancoisOne-Regular',
    color: '#fff',
    fontSize: 20,
  },

  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
});
export default SplashPage;

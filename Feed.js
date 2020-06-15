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

const Feed = ({userInfo}) => {
  return <>{userInfo.picture ? <Text>{userInfo.picture}</Text> : null}</>;
};
const styles = StyleSheet.create({});
export default Feed;

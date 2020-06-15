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

const Dashboard = ({userInfo, userRadius, handleUserRadius}) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  // 		checkUser({ username: user.name });

  // }, []);

  console.log(userInfo.name);
  return (
    <>
      <View>
        <Text>Welcome, {userInfo.name}!</Text>
      </View>
      {userInfo.picture ? (
        <Image Source={{uri: userInfo.picture}} style={styles.profImg} />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  profImg: {
    width: 100,
    height: 100,
  },
});
export default Dashboard;

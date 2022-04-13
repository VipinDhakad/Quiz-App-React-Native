import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../Components/title';
import Button from '../Components/button';

const Result = ({route,navigation}) => {
  const { score,results, total } = route.params;
  return (
    <View style={styles.container}>
      <Title title="Result" />
      <View style={styles.bannerContainer}>
        <Image style={styles.banner} source={require('../Images/results.png')} />
      </View>
      <Text style={styles.score}>Your Score is: {JSON.stringify(score)}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.btnText}> Go to HomeScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Answer', {results:results, total:total})} style={styles.button}>
        <Text style={styles.btnText}> Show Answers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#52B69A',
    padding: 12,
    margin: 12,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'600',
    textAlign: 'center',
  },
  score:{
    fontSize:30,
    fontWeight:'500',
    textAlign:'center',
  }
});

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Title from '../Components/title';

const Item = ({data}) => (
  <View style={styles.item}>
    <Text style={styles.content}>{decodeURIComponent(data)}</Text>
  </View>
);
function Answer({navigation, route}) {
  const {results, total} = route.params;
  var questionData = [];

  for (let i = 0; i < total; i++) {
    questionData.push(i+1+"). "+results[i].question);
    questionData.push(results[i].correct_answer);
  }
  questionData[total]=1;

  const renderItem = ({item}) => (
    <>
      <Item data={item} />
    </>
  );
  return (
    <>
      {questionData[total]==1?
      <SafeAreaView style={styles.container}>
      <Title title="Answers" />
      <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.btnText}> Go to HomeScreen</Text>
        </TouchableOpacity>
        <FlatList data={questionData} renderItem={renderItem} />
      </SafeAreaView>:
      <ActivityIndicator size={50} style={{height: '100%'}}/>}
    </>
  );
}

export default Answer;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#52B69A',
    padding: 12,
    margin: 12,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#DCDADA',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  content: {
    fontSize: 23,
    color: 'black',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
});

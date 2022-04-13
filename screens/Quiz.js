import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import React from 'react';
import Title from '../Components/title';
import Button from '../Components/button';
import {useEffect, useState, useContext, createContext} from 'react';


const Quiz = ({route, navigation}) => {
  const [questions, setQuestions] = useState();
  const [options, setOptions] = useState([]);
  const [qno, setQno] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const noOfQues = route.params.noOfQues;
  const cat = route.params.cat;
  const dif = route.params.dif;

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const getQuiz = async () => {
    setIsLoading(true);
    const url =
      cat == 8
        ? `https://opentdb.com/api.php?type=multiple&encode=url3986&amount=${noOfQues}&difficulty=${dif}`
        : `https://opentdb.com/api.php?type=multiple&encode=url3986&amount=${noOfQues}&category=${cat}&difficulty=${dif}`;
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionandShuffle(data.results[0]));
    setIsLoading(false);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleSkipPress = () => {
    setQno(qno + 1);
    setOptions(generateOptionandShuffle(questions[qno + 1]));
  };

  const handleSelectedOption = _option => {
    if (_option === questions[qno].correct_answer) {
      setScore(score + 10);
    }
    if (qno != noOfQues - 1) {
      setTimeout(() => {
        setQno(qno + 1);
        setOptions(generateOptionandShuffle(questions[qno + 1]));
      }, 200);
    }
    if (qno == noOfQues - 1) {
      setTimeout(() => {
        navigation.navigate('Result', {score: score, results:questions, total:noOfQues});
      }, 200);
    }
  };
  const generateOptionandShuffle = _question => {
    const options_data = [..._question.incorrect_answers];
    options_data.push(_question.correct_answer);
    shuffleArray(options_data);
    return options_data;
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={50} style={{height: '100%'}} />
      ) : (
        questions && (
          <View style={styles.parent}>
            <View style={styles.quesContainer}>
              <Title title="Quiz" />
              <View style={styles.tagsContainer}>
                <Text style={styles.tags}>
                  Difficulty :{' '}
                  {questions[qno].difficulty.charAt(0).toUpperCase() +
                    questions[qno].difficulty.slice(1)}
                </Text>
              </View>
              <View style={styles.tagsContainer}>
                <Text style={styles.tags}>
                  Category : {decodeURIComponent(questions[qno].category)}
                </Text>
              </View>
              <Text selectable style={styles.question}>
                Q{qno + 1}. {decodeURIComponent(questions[qno].question)}
              </Text>
              <View style={styles.optionContainer}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectedOption(options[0])}>
                  <Text style={styles.optionText}>
                    A.{decodeURIComponent(options[0])}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectedOption(options[1])}>
                  <Text style={styles.optionText}>
                    B.{decodeURIComponent(options[1])}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectedOption(options[2])}>
                  <Text style={styles.optionText}>
                    C.{decodeURIComponent(options[2])}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectedOption(options[3])}>
                  <Text style={styles.optionText}>
                    D.{decodeURIComponent(options[3])}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContainer}>
              {qno != noOfQues - 1 && (
                <TouchableOpacity
                  onPress={handleSkipPress}
                  style={styles.button}>
                  <Text style={styles.btnText}> Skip</Text>
                </TouchableOpacity>
              )}
              {qno == noOfQues - 1 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Result', {score: score, results:questions, total:noOfQues})}
                  style={styles.button}>
                  <Text style={styles.btnText}> End Quiz</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  quesContainer: {
    height: '90%',
  },
  parent: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  question: {
    fontSize: 30,
    color: 'black',
    paddingHorizontal: 10,
  },
  optionContainer: {
    padding: 5,
  },
  optionText: {
    padding: 10,
    fontSize: 17,
    color: 'white',
    fontWeight: '400',
  },
  option: {
    margin: 10,
    backgroundColor: '#52B69A',
    borderRadius: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,

    marginBottom: 20,
  },
  button: {
    backgroundColor: '#52B69A',
    padding: 12,
    margin: 12,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  tags: {
    backgroundColor: '#cccccc',
    fontSize: 14,
    margin: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagsContainer: {
    alignSelf: 'flex-start',
  },
});

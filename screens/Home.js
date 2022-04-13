import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import Title from '../Components/title';
import SelectDropdown from 'react-native-select-dropdown';
const numberOfQuestion = [5, 10, 15, 20, 25];
const difficulty = ['Easy', 'Medium', 'Hard'];
const category = [
  'Any Category',
  'General Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Entertainment: Musicals & Theatres',
  'Entertainment: Television',
  'Entertainment: Video Games',
  'Entertainment: Board Games',
  'Science & Nature',
  'Science: Computers',
  'Science: Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Art',
  'Celebrities',
  'Animals',
  'Vehicles',
  'Entertainment: Comics',
  'Science: Gadgets',
  'Entertainment: Japanese Anime & Manga',
  'Entertainment: Cartoon & Animations'
];
const Home = ({navigation}) => {
  const [noOfQues,setnoOfQues]=useState(10);
  const [cat,setcat]=useState(8);
  const [dif,setdif]=useState("");


  return (
    <View style={styles.container}>
      <Title title="QUIZZLER" />
      <View style={styles.bannerContainer}>
        <Image style={styles.banner} source={require('../Images/banner.png')} />
      </View>
      <View style={styles.typeSelector}>
        <Text style={styles.Text}> No. of Questions :</Text>
        <SelectDropdown
          data={numberOfQuestion}
          onSelect={(selectedItem,index) => {
            setnoOfQues(selectedItem);
          }}
          defaultValue={10}
          buttonStyle={styles.dropDown}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View style={styles.typeSelector}>
        <Text style={styles.Text}> Category :</Text>
        <SelectDropdown
          data={category}
          onSelect={(selectedItem,index) => {
            setcat(index+8);
          }}
          defaultValue="Any Category"
          buttonStyle={styles.dropDown}
          dropdownStyle={styles.dropdownStyle}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View style={styles.typeSelector}>
        <Text style={styles.Text}> Difficulty :</Text>
        <SelectDropdown
          data={difficulty}
          onSelect={(selectedItem, index) => {
            setdif(selectedItem.charAt(0).toLowerCase()+selectedItem.slice(1));
          }}
          defaultValue='Easy'
          buttonStyle={styles.dropDown}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() =>{
          navigation.navigate('Quiz' ,{noOfQues:noOfQues, dif:dif, cat: cat});
        }
        }
        style={styles.button}>
        <Text style={styles.btnText}> Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    padding: 15,
    margin: 12,
    borderRadius: 6,
    width: '90%',
  },
  btnText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  Text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    width:"100%",
  },
  dropDown: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: '100%',
  },
  typeSelector: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal:10,
    width: '100%',
  },
  dropdownStyle: {
    width: '100%',
  },
});

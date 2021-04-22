import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '',
      phonetics: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View style={{backgroundColor:'#89ACFF',width:'100%',height:'100%',marginTop:'5',marginBottom:'auto'}}>
        <Header
          backgroundColor={'lightblue'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: {
              backgroundColor: 'lightblue',
              fontFamily: 'Rockwell',
              fontSize: 20,
              color: '#0900BC',
            },
          }}
        />
        <Image
          style={{
            width: 260,
            height: 260,
            borderColor: 'black',
            borderWidth: 4,
            marginTop: 20,
            marginLeft: 60,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/d/dd/Gray_book.png',
          }}
        />

        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          placeholder="Enter The Word..."
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> Search </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word.toUpperCase()}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 60,
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 20,
    borderWidth: 4,
    borderColor: 'black',
    outline: 'none',
    backgroundColor: 'white',
    borderRadius:20
  },
  searchButton: {
    width: '40%',
    height: 40,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'darkblue',
    alignItems:'center',
    justifyContent:'center'
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color:'white'
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 20,
    color: 'white',
    textAlign:'center'
  },
});

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { white, purple, orange } from '../utils/colors'
import { AsyncStorage } from 'react-native';

const DECK_KEY = 'FlashCards:decks'

class NewQuestion extends Component {
    state = {
        question: '',
        answer: '',
        decks: false,
        isMounted: false
    }
    
    getDecks() {
        AsyncStorage.getItem(DECK_KEY).then((decks) => {
            if (decks !== null){
                let d = JSON.parse(decks)
                this.setState({decks:d})
            } else { 
                console.warn("Looks like something went wrong with getting decks. Try reloading.")
                return false
            }
        })
    }

    componentDidMount() {
        this.getDecks()
        this.setState({ isMounted: true })
    }

    componentWillUnmount(){
        this.setState({ isMounted: false })
    }

    addCard = async (deckTitle, question, answer) => {
        let decks = this.state.decks
        const card = {
            'question': question, 
            'answer': answer
        }
        decks[deckTitle].questions.push(card)        
        await AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks)).then(
            this.props.navigation.navigate('DeckView',{title: deckTitle, count: decks[deckTitle].questions.length}),
        )
    }
    
    onPressButton = () => {
        this.addCard(this.props.navigation.state.params.title, this.state.question, this.state.answer)           
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Enter Your Question and Answer:</Text>
          <Text>(Neither can be empty)</Text>
          {this.state.isMounted && 
          <View>
          <TextInput style={styles.forms} placeholder='Question' onChangeText={(text) => this.setState({question: text})}/>  
          <TextInput style={styles.forms} placeholder='Answer' onChangeText={(text) => this.setState({answer: text})}/>  
          </View>
          }
          <TouchableOpacity onPress={this.onPressButton} underlayColor="white"
          disabled={this.state.question === '' || this.state.answer === ''}>
            <Text style={styles.clickable}>Click to Add</Text>
          </TouchableOpacity>
        </View>
        
      )
    }
  }
  
const styles = StyleSheet.create({  
    heading: {
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center'
    },

    clickable: {
        fontSize: 30,
        marginTop: 50,
        marginBottom: 70,
        color: orange
    },

    forms: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'      
    },
  
    item: {
      backgroundColor: white,
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
    },
    noDataText: {
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20
    }
  })

  export default NewQuestion
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { white, purple, orange } from '../utils/colors'
import { AsyncStorage } from 'react-native';

const DECK_KEY = 'FlashCards:decks'

class NewDeck extends Component {
    state = {
        decks: false,
        title: '',
        isMounted: false
    }

  getDecks() {
    AsyncStorage.getItem(DECK_KEY).then((decks) => {
        if (decks !== null){
            console.log("now getting decks")
            let d = JSON.parse(decks)
            console.log(d)
            console.log("these are the decks")
            this.setState({decks:d})
        } else { 
            console.warn("Looks like something went wrong with getting decks. Try reloading.")
            return false
        }
    })
  }

  componentDidMount() {
    console.log("state of decks", this.state.decks)
    //getDecks().then((decks) => this.setState({decks}, () => console.log("After setState: ", this.state.decks))
    //getDecks().then((decks) => console.log("whomst", decks)      )
    //getDecks().then((decks) => console.log("whomst", decks))
    
    console.log("erwerewqer")

    // AsyncStorage.getItem('FlashCards:decks').then((decks) => {
    //   if (decks !== null){
    //     console.log(JSON.parse(decks))

    //   }})
    
    this.getDecks()  
    this.setState({ isMounted: true })
  }
  componentWillUnmount(){
    this.setState({ isMounted: false })
  }

  onPressButton = async () => {
    //console.log("we",this.props.navigation.state.params.title," was: ",this.state.question, "kangz: ", this.state.answer)
    let decks = this.state.decks
    let title = this.state.title

    let newDeck = {
        [title]:{            
            title: title,
            questions: []
        }
    }    
    console.log(decks)
    console.log(newDeck)
    //console.log("hmm: ",decks+newDeck)
    //console.log("eaw: ",JSON.stringify(newDeck))

    await AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(newDeck));
    console.log("merged")

    // decks[deckTitle].questions.push(card)        
    // //await AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks)).then(console.log("done, ",decks))
    // await AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks)).then(
    //     this.props.navigation.navigate('DeckView',{title: deckTitle, count: decks[deckTitle].questions.length}),
    //     console.log("should look like: ",decks)
    // )
    this.props.navigation.navigate('DeckView',{title, count: 0})
}
  
    render() {
      return (
          
        <View style={styles.container}>
        {this.state.isMounted &&
            <View>
            <Text style={styles.heading}>Enter the New Deck Title:</Text>          
            
            
            <TextInput style={styles.forms} placeholder='Title' onChangeText={(text) => this.setState({title: text})}/>  
            
            <TouchableOpacity onPress={this.onPressButton} underlayColor="white"
            disabled={this.state.title === ''}>
                <Text style={styles.clickable}>Create Deck</Text>
            </TouchableOpacity>
            </View>}
        </View>
        
//The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.

//Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
      )
    }
  }
  
const styles = StyleSheet.create({  
    heading: {
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center',
        color: purple
    },

    clickable: {
        fontSize: 30,
        marginTop: 50,
        color: orange
    },

    forms: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
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
  
  export default NewDeck
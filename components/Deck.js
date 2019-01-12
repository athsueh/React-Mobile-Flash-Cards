import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native'
import { white, purple } from '../utils/colors'

class Deck extends Component {
    state = {
      ready: false,
    }

    onPressButton = () => {
        console.log("hehe: ", this.props.title)
        //Alert.alert('You tapped the button!')

        this.props.navigation.navigate('DeckView',{title: this.props.title, count: this.props.count})
    }
    
    render() {
        
        let title = this.props.title
        console.log(title)

        
      return (
          //<Text style={{color: purple, fontSize: 25}}>{title}</Text>
        <TouchableOpacity onPress={this.onPressButton} underlayColor="white">
            <Text style={{color: purple, fontSize: 50}}>{title}</Text>
        </TouchableOpacity>
        //display deck name, number of cards
        // clicking on a deck should bring it to the deck view
      )
    }
  }
  
const styles = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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


  export default Deck
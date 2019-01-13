import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native'
import { white, purple, orange } from '../utils/colors'

class DeckView extends Component {
    state = {
      deck: '',
    }
    onPressButton = () => {
        if (this.props.navigation.state.params.count === 0){
        Alert.alert('You cannot start a quiz with 0 question deck.')
        }
        else {
          this.props.navigation.navigate('Quiz',{title: this.props.navigation.state.params.title})
        }
    }

    onPressButton2 = () => {
        this.props.navigation.navigate('NewQuestion',{title: this.props.navigation.state.params.title})
    }
    
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Title: {this.props.navigation.state.params.title}</Text>
          <Text style={styles.heading}>Card(s) In the Deck: {this.props.navigation.state.params.count}</Text>
          <TouchableOpacity onPress={this.onPressButton} underlayColor="white">
            <Text style={styles.clickable}>Click to Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressButton2} underlayColor="white">
            <Text style={styles.clickable}>Click to Add a Card to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({  
    heading: {
        fontSize: 40,
        marginBottom: 10
    },

    clickable: {
        fontSize: 30,
        marginTop: 50,
        color: orange
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
  
  export default DeckView
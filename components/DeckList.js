import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, AsyncStorage, Button, Alert } from 'react-native'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { white, orange } from '../utils/colors'
import { AppLoading} from 'expo'
import { generateDecks } from '../utils/helpers'
import Deck from './Deck'
import { NavigationEvents } from 'react-navigation'


const DECK_KEY = 'FlashCards:decks'

class DeckList extends Component {
  state = {
    decks: false,
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
    
    console.log("AYAYAYA")

    // AsyncStorage.getItem('FlashCards:decks').then((decks) => {
    //   if (decks !== null){
    //     console.log(JSON.parse(decks))

    //   }})
    
    this.getDecks()
    console.log("current deck list is: ",this.state.decks)  
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) {
  //     this.getDecks();
  //     console.log("refreshed decks: ",this.state.decks)
  //   }
  // }
  
  

  displayDecks = (d) => {
    if(d !== false){
      console.log("yeets")
      d = Object.values(d)
      console.log(d)
      //d.map(key => {return <Deck key = {key.title}/>  }   ) 
      
      //console.log(d[0].title)
      //console.log("weee: ",d[0].questions.length)

      const { navigation } = this.props
      
    return d.map((t) => {
      return <Deck key = {t.title} title = {t.title} count = {t.questions.length} navigation = {navigation}/>      
      }
    ) 
   
    } else {
      <Text>No Decks. Why not make one?</Text>
    }
  }
 

  render() {
    let d = this.state.decks

    return (
      <View style={styles.container}>
       <NavigationEvents
        onWillBlur={console.log("efjiwaokl;fjewkl;fajwkl;")}      
        />
        <Text style={styles.clickable} >Please Select a Deck:</Text>
        {this.displayDecks(d)}
        <Text>{"\n"}</Text>
        <Button onPress={() => (
          Alert.alert('Decks have now be refreshed.'),
          this.getDecks()
        )
        } title='Refresh Decks'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({  
  clickable: {
    fontSize: 30,
    marginTop: 50,    
  },
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

export default DeckList;
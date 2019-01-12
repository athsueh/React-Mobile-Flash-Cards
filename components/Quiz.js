import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Button, AsyncStorage } from 'react-native'
import { white, purple, orange } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'


const DECK_KEY = 'FlashCards:decks'

class Quiz extends Component {
    state = {
      decks: false,
      score: 0,
      reveal: false,
      cardsLeft: -1,
      deckLength: -1,
      isMounted: false,
      idx: -1
    }

    async getDecks() {
        await AsyncStorage.getItem(DECK_KEY).then((decks) => {
            if (decks !== null){
                console.log("now getting decks")
                let d = JSON.parse(decks)
                console.log(d)
                console.log("these are the decks")               
                let cl = d[this.props.navigation.state.params.title].questions.length
                console.log(cl)
                this.setState({decks:d})
                this.setState({cardsLeft:cl})  
                this.setState({deckLength:cl})         
                let idx = this.getIdx()   
                this.setState({ idx })
                
            } else { 
                console.warn("Looks like something went wrong with getting decks. Try reloading.")
                return false
            }
        })
    }

    getIdx = () =>{
        let decks = this.state.decks        
        let title = this.props.navigation.state.params.title            
        let cards = decks[title].questions
        let siz = cards.length
        let randIndex = Math.floor(Math.random() * siz)
        let idx = (randIndex + this.state.cardsLeft) % siz
        console.log("idx: ",idx)
        return idx        
    }

    componentDidMount() {
        this.getDecks()
        this.setState({ isMounted: true })

    }

    componentWillUnmount(){
        this.setState({ isMounted: false })
    }

    showQ = (card) => {        
        console.log("card.question: ",card.question)
        if (this.state.reveal){
            return (                
                <Text style={styles.body}>{card.answer} </Text>
            )
        }
        else {
            return (
                <Text style={styles.body}>{card.question} </Text>
            )
        }
    }

    quizOver = () => {
        clearLocalNotification().then(setLocalNotification);
        return (
            <View>
            <Text style={styles.body}>
                No Cards Left. Final Score: {this.state.score/this.state.deckLength*100}%. 
            </Text>
            {this.state.isMounted && 
            <View style={styles.adjacent}>  
            <Button
                onPress={() =>this.setState({score: 0,cardsLeft: this.state.deckLength,reveal: false})}
                title='Restart Quiz'           
            />
            <Button
                onPress={() =>
                    this.props.navigation.navigate(
                    'DeckView',{title: this.props.navigation.state.params.title,
                    count: this.state.deckLength})}
                title='Back to Deck'           
            />
            </View>
            }
            </View>
        )
    }

    showQuestions = () => {
        let title = this.props.navigation.state.params.title
        let decks = this.state.decks
        //console.log(decks)

        if (decks !== false && this.state.idx !== -1){
            let cards = decks[title].questions

            if (this.state.cardsLeft === 0){
                console.log("it be over")
                return this.quizOver()

            }
            //console.log(decks[title].questions)
            //console.log(decks[title].questions[0].answer)
           //return decks[title].questions.map(card => this.showQ(card))
            let siz = cards.length
        //    //console.log(siz)
        //    let randIndex = Math.floor(Math.random() * siz)
            
        //    console.log("cardsleft: ",this.state.cardsLeft)
        //    console.log("size: ",siz)
           
           //let idx = (randIndex + this.state.cardsLeft) % siz 
           let idx = (this.state.idx + this.state.cardsLeft) % siz 
            console.log("card at idx+cardsleft: ",cards[idx])
           return this.showQ(cards[idx])
           
        }
    }

    scoreControls = () =>{
        console.log("cardsleft: ",this.state.cardsLeft)
        return (
            <View style={styles.container}>
                {this.state.isMounted && <View style={styles.adjacent}>
                <Button
                    onPress={() =>this.setState({score: this.state.score+1, cardsLeft: this.state.cardsLeft-1, reveal: false})}
                    title='Correct'           
                />
                <Button
                    onPress={() =>this.setState({cardsLeft: this.state.cardsLeft-1, reveal: false})}
                    title='Incorrect'           
                />
                </View>
                }
            </View>
        )
    }


    render() {
      return (
        <View style={styles.container}>

        <Text style={styles.heading}>Quiz: {this.props.navigation.state.params.title}</Text>
        <Text>Current Score: {this.state.score}</Text>
        <Text>Questions Left: {this.state.cardsLeft}</Text>
        {this.showQuestions()}
        {this.state.cardsLeft !== 0 &&    
        <Button
            onPress={() => this.state.reveal ? this.setState({reveal: false}) : this.setState({reveal: true})}
            title={this.state.reveal ? 'Hide Answer':'Show Answer' }         
        />}
        {this.state.cardsLeft !== 0 && this.scoreControls()}
        </View>
        	
// The Quiz view starts with a question from the selected deck.
// The question is displayed, along with a button to show the answer.
// Pressing the 'Show Answer' button displays the answer.
// Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
// The view displays the number of questions remaining.
// When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
// When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
// Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.
      )
    }
  }

  const styles = StyleSheet.create({  
    heading: {
        fontSize: 40,
        marginBottom: 10
    },

    body: {
        fontSize: 35,
        marginTop: 50,
        marginBottom: 50,
        color: purple,
        textAlign: 'center'
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

    adjacent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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

  export default Quiz
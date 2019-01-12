// utils/helpers.js
import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'FlashCards:notifications'
const DECK_KEY = 'FlashCards:decks'

const defaultDecks = {
    Math:{
        title: 'Math',
        questions: [
            {
                question: '(2+2)-1',
                answer: '3'
            },
            {
                question: '123456 * 0',
                answer: '0'
            },
        ]
    },


    Japanese:{
        title: 'Japanese',
        questions: [
            {
                question: 'Monogatari',
                answer: 'Story'
            }
        ]
    }
}

export function generateDecks() {
    let decks = defaultDecks
    AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks)) 
    console.log("generating decks")       
}

// export function getDecks() {
//     AsyncStorage.getItem(DECK_KEY).then((decks) => {
//         if (decks !== null){
//             console.log("now getting decks")
//             let d = JSON.parse(decks)
//             console.log(d)
//             console.log("these are the decks")
//             return d
//         } else { 
//             console.warn("Looks like something went wrong with getting decks. Try reloading.")
//             return false
//         }
//     })
// }

// export async function newDeck(title) {
//     let newDeck = {
//         title,
//         questions: []
//     }    
//     await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
//     console.log("merged")
// }

// export async function addCard(deckTitle, question, answer) {
//     let decks = await getDecks()
//     let card = [question, answer]

//     decks[deckTitle].questions.push(card)
//     console.log(decks)
//     await AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks));
// }


// export function isBetween (num, x, y) {
//     if (num >= x && num <= y) {
//       return true
//     }
  
//     return false
//   }
  
//   export function calculateDirection (heading) {
//     let direction = ''
  
//     if (isBetween(heading, 0, 22.5)) {
//       direction = 'North'
//     } else if (isBetween(heading, 22.5, 67.5)) {
//       direction = 'North East'
//     } else if (isBetween(heading, 67.5, 112.5)) {
//       direction = 'East'
//     } else if (isBetween(heading, 112.5, 157.5)) {
//       direction = 'South East'
//     } else if (isBetween(heading, 157.5, 202.5)) {
//       direction = 'South'
//     } else if (isBetween(heading, 202.5, 247.5)) {
//       direction = 'South West'
//     } else if (isBetween(heading, 247.5, 292.5)) {
//       direction = 'West'
//     } else if (isBetween(heading, 292.5, 337.5)) {
//       direction = 'North West'
//     } else if (isBetween(heading, 337.5, 360)) {
//       direction = 'North'
//     } else {
//       direction = 'Calculating'
//     }
  
//     return direction
//   }
  
//   export function timeToString (time = Date.now()) {
//     const date = new Date(time)
//     const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
//     return todayUTC.toISOString().split('T')[0]
//   }


  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Study your cards!',
      body: "👋 don't forget to study your flashcards for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(12)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )                
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

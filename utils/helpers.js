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
}

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

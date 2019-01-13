import React from 'react'
import { View, Platform, StatusBar, StyleSheet } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, createAppContainer  } from 'react-navigation'
import { purple, white } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification, generateDecks, clearLocalNotification } from './utils/helpers'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})


const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  componentDidMount() {
    clearLocalNotification()
    setLocalNotification()    
    generateDecks()
  }
  render() {
    return (
        <View style={{flex: 1}}>
         <UdaciStatusBar backgroundColor={purple} barStyle="light-content" /> 
         <AppContainer/>
        </View>
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
});

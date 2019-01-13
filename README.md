# Mobile Flash Cards Project With React Native

This is Project 3, the final project for Udacity's React fundamentals course, specifically covering React Native.

This app was tested using a Google Pixel 1 XL on Android firmware 8.1.0 using Expo. It was not tested on iOS.

## Installation
Once the repository has been cloned, it can be installed with:
```
npm install
```
Simply run the following command:
```
npm start
```

## Known Issues
Decks will not automatically render a refresh when creating new decks, thus a refresh button has been implemented onto the Deck List page for the sake of convenience.

Old decks that were created in previous instances of running the app may persist and be clickable, but they will disappear upon clicking refresh, as intended.

Notifications will not immediately be displayed at the exact second, but will still correctly display within a reasonable amount of time.


## Usage
This app is a simple flash card interface, allowing the user to work with the 5 different possible views: DeckList, DeckView, NewQuestion, NewDeck, and Quiz.
The Decklist displays all the decks, which can be viewed in detail with the DeckView. Each Deckview enables adding a NewQuestion or taking a Quiz for the respective Deck. Lastly, NewDeck is self explanatory, and allows for additional Decks. Two default decks have been added for testing convenience.

For more information, please refer to the outline below:

**Taken from the project starter code's outline:**
For the UdaciCards project, you will build a mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

Why this project?
This project encompasses the fundamental aspects of building a native application including handling infinite lists, routing, and user input. By building this project, you will gain an understanding of how to use React Native to build an iOS and Android application.

Specific Requirements
Use create-react-native-app to build your project.
Allow users to create a deck which can hold an unlimited number of cards.
Allow users to add a card to a specific deck.
The front of the card should display the question.
The back of the card should display the answer.
Users should be able to quiz themselves on a specific deck and receive a score once they're done.
Users should receive a notification to remind themselves to study if they haven't already for that day.

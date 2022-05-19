import React, { useState, useRef, useEffect} from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native-web";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

import {direction as importedDirection} from "../constants/constants";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randNum = Math.random() * (max - min) + min;
  const randNumFloored = Math.floor(randNum);

  if (randNumFloored === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNumFloored;
  }

}

const GameScreen = ({ selectedNumber, onGameOver }) => {

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(currentLow.current, currentHigh.current, selectedNumber));
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (currentGuess === selectedNumber) {
      onGameOver(rounds)
    }
  }, [currentGuess])

  const nextGuess = direction => {
    if ((direction === importedDirection.higher && currentGuess > selectedNumber) ||
      (direction === importedDirection.lower && currentGuess < selectedNumber)) {
      // Alert('Pls don\t lie, You know that\s wrong', [{ text: 'Sorry', style: 'cancel'}])
      alert('Pls don\'t lie')
      return
    }

    if (direction === importedDirection.lower) {
      currentHigh.current = currentGuess;

    } else {
      currentLow.current = currentGuess;
    }

    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setRounds(currentRounds => currentRounds + 1)
    setCurrentGuess(nextNum);

  }


  return (
    <View style={styles.screen}>
      <Text>Computer Guess: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='Lower' onPress={() => { nextGuess(importedDirection.lower) }}></Button>
        <Button title='Higher' onPress={() => { nextGuess(importedDirection.higher) }}></Button>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  }
})

export default GameScreen
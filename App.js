import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(undefined)
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)

  const startGameHandler = (number) => {
    setSelectedNumber(number);
  };

  const gameOverHandler = (rounds) => {
    setNumberOfGuesses(rounds);
  };

  const restartGame = () => {
    setNumberOfGuesses(0)
    setSelectedNumber()
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (selectedNumber && numberOfGuesses === 0) {
    content = <GameScreen selectedNumber={selectedNumber} onGameOver={gameOverHandler} />
  } else if (selectedNumber && numberOfGuesses > 0) {
    content = <GameOverScreen rounds={numberOfGuesses} number={selectedNumber} onGameRestart={restartGame}  />
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess the number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
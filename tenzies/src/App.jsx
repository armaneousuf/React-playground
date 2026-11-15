import { nanoid } from "nanoid";
import Die from "./Die";
import { useState } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if(!gameWon) {
      setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : {
              ...die,
              value: Math.ceil(Math.random() * 6),
            };
      }),
    );
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      }),
    );
  }

  const diceElement = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));
  return (
    <main>
      {gameWon && <Confetti />}
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';
import SelectionButton from './SelectionButton';

const App = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const options = ['rock', 'paper', 'scissors'];

  const iconMappings = {
    rock: faHandRock,
    paper: faHandPaper,
    scissors: faHandScissors,
  };

  const getRandomChoice = () => options[Math.floor(Math.random() * options.length)];

  const handleUserChoice = (choice) => {
    const computerChoice = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(computerChoice);
    determineWinner(choice, computerChoice);
  };

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult("Empate!");
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('Você venceu!');
      setPlayerScore(playerScore + 1);
    } else {
      setResult('Computador venceu!');
      setComputerScore(computerScore + 1);
    }
    setGameStarted(true);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setGameStarted(false);
  };

  useEffect(() => {
    if (gameStarted) {
      const playerIcon = document.querySelector('.show i');
      const computerIcon = document.querySelector('.computer .show i');
      if (playerIcon && computerIcon) {
        playerIcon.className = `fas fa-hand-${userChoice}`;
        computerIcon.className = `fas fa-hand-${computerChoice}`;
      }
    }
  }, [userChoice, computerChoice, gameStarted]);

  return (
    <div className="App">
      <h1>Pedra Papel Tesoura</h1>
      <h2 id="demo">Tente a sorte!</h2>
      <div className="container">
        <div className="section">
          <div className="info">
            <h3>Você :</h3><span id="playerScore">{playerScore}</span>
          </div>
          <div className="show">
            <FontAwesomeIcon icon={userChoice ? iconMappings[userChoice] : faHandRock} size="4x" />
          </div>
        </div>

        <div className="section">
          <div className="info">
            <h3>Computador :</h3><span id="computerScore">{computerScore}</span>
          </div>
          <div className="show computer">
            <FontAwesomeIcon icon={computerChoice ? iconMappings[computerChoice] : faHandScissors} size="4x" />
          </div>
        </div>
      </div>
      <h2
        style={{
          color:
            result === "Empate!"
              ? 'orange'
              : result === 'Você venceu!'
              ? 'rgb(1, 146, 1)'
              : 'red',
        }}
        id="demo2"
      >
        {result || (gameStarted ? 'Escolha um!' : 'Clique para jogar!')}
      </h2>
      <div className="selection">
        {options.map((choice) => (
          <SelectionButton
            key={choice}
            onClick={() => handleUserChoice(choice)}
          >
            <FontAwesomeIcon icon={iconMappings[choice]} size="2x" />
          </SelectionButton>
        ))}
      </div>
    </div>
  );
};

export default App;

document.addEventListener("DOMContentLoaded", function() {
    var startBtn = document.getElementById("start-btn");
    var guessBtn = document.getElementById("guess-btn");
  
    startBtn.addEventListener("click", startGame);
    guessBtn.addEventListener("click", guessWord);
  
    var wordLabel = document.getElementById("word-label");
    var guessInput = document.getElementById("guess-input");
    var attemptsLabel = document.getElementById("attempts-label");
    var messageLabel = document.getElementById("message-label");
    var gameOverText = document.getElementById("game-over-text");
    var hangmanImg = document.getElementById("hangman-img");
  
    var word, attempts, guessedLetters, wrongLetters;
  
    function selectWord(difficulty) {
      var wordList = {
        Easy: ["python", "hangman", "programming", "computer", "game"],
        Medium: ["apple", "banana", "orange", "grape", "melon"],
        Hard: ["elephant", "giraffe", "rhinoceros", "hippopotamus", "crocodile"]
      };
      return wordList[difficulty][Math.floor(Math.random() * wordList[difficulty].length)];
    }
  
    function updateWordLabel() {
      var guessedWord = word
        .split("")
        .map(function(letter) {
          return guessedLetters.includes(letter) ? letter : "_";
        })
        .join(" ");
      // Display the first letter as a hint
      var hintWord = word[0] + " " + guessedWord.substring(2);
      wordLabel.textContent = hintWord;
    }
  
    function startGame() {
      word = selectWord(document.getElementById("difficulty").value);
      attempts = 3;
      guessedLetters = [];
      wrongLetters = [];
  
      wordLabel.textContent = "";
      attemptsLabel.textContent = "Attempts left: " + attempts;
      messageLabel.textContent = "";
      gameOverText.textContent = "";
  
      updateWordLabel();
    }
  
    function guessWord() {
      var guess = guessInput.value.toLowerCase().trim();
      guessInput.value = "";
  
      if (guess.length === 0 || !guess.match(/^[a-zA-Z]+$/)) {
        messageLabel.textContent = "Invalid input. Please enter a valid word.";
        messageLabel.style.color = "red";
      } else {
        if (guess === word) {
          messageLabel.textContent = "Congratulations! You guessed the word:";
          messageLabel.style.color = "green";
          attemptsLabel.textContent = "Attempts left: " + attempts;
          gameOverText.textContent = word;
          gameOverText.style.color = "green";
          setTimeout(startGame, 2000);
        } else {
          attempts--;
          attemptsLabel.textContent = "Attempts left: " + attempts;
          if (attempts === 0) {
            messageLabel.textContent = "Game over! You ran out of attempts.";
            messageLabel.style.color = "red";
            gameOverText.textContent = "The word was: " + word;
            gameOverText.style.color = "red";
            setTimeout(startGame, 2000);
          }
        }
      }
    }
  });
  
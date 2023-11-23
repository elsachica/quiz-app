// quiz-application.js

class QuizApplication extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <nickname-form id="nicknameForm"></nickname-form>
        <countdown-timer id="countdownTimer"></countdown-timer>
        <quiz-question id="quizQuestion"></quiz-question>
        <high-score id="highScore"></high-score>
      `;
    }
  
    connectedCallback() {
      // Logic for initializing the quiz application
      const nicknameForm = this.shadowRoot.getElementById('nicknameForm');
      const countdownTimer = this.shadowRoot.getElementById('countdownTimer');
      const quizQuestion = this.shadowRoot.getElementById('quizQuestion');
      const highScore = this.shadowRoot.getElementById('highScore');
  
      // Add event listeners and other initialization logic
    }
  }
  
  customElements.define('quiz-application', QuizApplication);
  

  // -------------------------------- andra lösningen ------------------------------ //

  // quiz-application.js

class QuizApplication extends HTMLElement {
    constructor() {
      super();
      this.nickname = '';
      this.currentQuestion = null;
      this.timer = 20; // Default timer value in seconds
      this.timerInterval = null;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <div id="quiz-container">
          <nickname-form id="nicknameForm"></nickname-form>
          <countdown-timer id="timer" limit="${this.timer}"></countdown-timer>
          <quiz-question id="question"></quiz-question>
          <high-score id="highScore"></high-score>
        </div>
      `;
    }
  
    connectedCallback() {
      this.startGame();
    }
  
    startGame() {
      this.shadowRoot.getElementById('nicknameForm').addEventListener('nickname-chosen', (event) => {
        this.nickname = event.detail.nickname;
        this.fetchNextQuestion();
        this.startTimer();
      });
  
      this.shadowRoot.getElementById('question').addEventListener('answer-submitted', (event) => {
        const isCorrect = this.submitAnswer(event.detail.answer);
        if (isCorrect) {
          this.fetchNextQuestion();
        } else {
          this.endGame();
        }
      });
    }
  
    fetchNextQuestion() {
      // Use fetch API to get the next question from the server
      fetch('https://courselab.lnu.se/quiz/question/1') // Adjust the URL accordingly
        .then(response => response.json())
        .then(data => {
          this.currentQuestion = data;
          this.shadowRoot.getElementById('question').question = this.currentQuestion;
        })
        .catch(error => console.error('Error fetching question:', error));
    }
  
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer--;
  
        if (this.timer <= 0) {
          this.endGame();
        }
  
        this.shadowRoot.getElementById('timer').setAttribute('value', this.timer);
      }, 1000);
    }
  
    submitAnswer(answer) {
      // Use fetch API to submit the user's answer to the server
      // Adjust the URL and method based on server requirements
      const requestBody = {
        nickname: this.nickname,
        answer: answer,
      };
  
      return fetch('https://example.com/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => data.correct);
    }
  
    endGame() {
      clearInterval(this.timerInterval);
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer);
    }
  }
  
  customElements.define('quiz-application', QuizApplication);
  
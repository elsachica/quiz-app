/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

import './nickname-form.js'
import './countdown-timer.js'
import './quiz-question.js'
import './high-score.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    /* Add your styles for the quiz question component */
  </style>
  <div>
  </div>
`

customElements.define('quiz-application',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))



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
      `
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
  
    async fetchNextQuestion() {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch('https://courselab.lnu.se/quiz/question/1'); // Justera URL:en efter behov
        const data = await response.json()
    
        // Sätt aktuell fråga och uppdatera webbkomponenten med frågan
        this.currentQuestion = data
        this.shadowRoot.getElementById('question').question = this.currentQuestion
      } catch (error) {
        // Om det uppstår ett fel, logga felet till konsolen
        console.error('Error fetching question:', error)
      }
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
    
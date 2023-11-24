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
        <nickname-form id="nicknameForm"></nickname-form>
        <countdown-timer id="timer" limit="${this.timer}"></countdown-timer>
        <quiz-question id="question"></quiz-question>
        <high-score id="highScore"></high-score>
  </div>
`

customElements.define('quiz-application',
  class extends HTMLElement {
    constructor() {
      super()

      this.nickname = ''
      this.currentQuestion = null
      // this.timer = 20; // Default timer value in seconds
      // this.timerInterval = null

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
  
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

    /**
   * Fetches the next question from the server using the fetch API.
   * @async
   * @returns {Promise<void>}
   */
    async fetchNextQuestion() {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch('https://courselab.lnu.se/quiz/question/1') // Justera URL:en efter behov
        const data = await response.json()
    
        // Sätt aktuell fråga och uppdatera webbkomponenten med frågan
        this.currentQuestion = data
        this.shadowRoot.getElementById('question').question = this.currentQuestion
        console.log(data)
      } catch (error) {
        // Om det uppstår ett fel, logga felet till konsolen
        console.error('Error fetching question:', error)
      }
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
  
    async submitAnswer(answer) {
      const requestBody = {
        nickname: this.nickname,
        answer: answer,
      };
    
      try {
        const response = await fetch('https://example.com/submit-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
    
        const data = await response.json();
        return data.correct;
      } catch (error) {
        console.error('Error submitting answer:', error);
        return false
      }
    }
  
    endGame() {
      clearInterval(this.timerInterval);
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer);
    }
  })
    
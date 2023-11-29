/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'
import '../quiz-question/index.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
    /* .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .form__input {
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        width: 100%;
        max-width: 20rem;
        margin-bottom: 1rem;
    }
    .form__button {
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        width: 100%;
        max-width: 20rem;
        margin-bottom: 1rem;
    }
    .form__button:hover {
        background-color: #ccc;
    }
    .form__button:active {
        background-color: #ccc; 
    }
    */
</style>

<div>
        <nickname-form id="nicknameForm"></nickname-form>
        <quiz-question id="question"></quiz-question>
        <quiz-question-answer id="answer"></quiz-question-answer>
</div>
`
customElements.define('quiz-application',

class extends HTMLElement {
    #nickname
    // #timer
    // #timerInterval
  #handleNicknameForm


    constructor () {

      super()
      this.#nickname = ''
      // this.#timer = 20; // Default timer value in seconds
      // this.#timerInterval = null

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      const nicknameForm = this.shadowRoot.querySelector('#nicknameForm')

      this.#handleNicknameForm = (event) => {
        this.startGame(event)
      }
      nicknameForm.addEventListener('nickname-form', this.#handleNicknameForm)
    }

    disconnectedCallback() {
      const nicknameForm = this.shadowRoot.querySelector('#nickname-form')

      nicknameForm.removeEventListener('nickname-form', this.handleNicknameForm)
    }

    async startGame(event) {
      this.#nickname = event.detail.nickname;
      const div = this.shadowRoot.querySelector('div')
      const nicknameForm = document.querySelector('nickname-form');
      div.remove(nicknameForm)
      this.nextQuestion()
    }

    async nextQuestion (questionData) {
      const savedQuestion = await this.fetchNextQuestion(questionData)
      this.showQuestion(savedQuestion)
      this.startTimer()
      this.controllAnswer()
    }

    async fetchNextQuestion(url = 'https://courselab.lnu.se/quiz/question/1') {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch(url)
        const questionData = await response.json()

        return questionData
      } catch (error) {
        // Om det uppstår ett fel, logga felet till konsolen
        console.error('Error fetching question:', error)
      }
    }

    async controllAnswer(nextURL, answer) {
      try {
        const response = await fetch('nextURL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(answer)
        });
    
        const data = await response.json();
    
        if (data.correct) {
          const nextURL = data.nextURL;
          const question = await this.fetchNextQuestion(nextURL);
          this.showQuestion(question);
        } else {
          this.endGame();
        }
      } catch (error) {
        console.error('Error controlling answer:', error);
        // Handle the error as needed
      }
    }

    startTimer () {
      this.timerInterval = setInterval(() => {
        this.timer--

        if (this.timer <= 0) {
          this.endGame()
        }

        this.shadowRoot.getElementById('timer').setAttribute('value', this.timer)
      }, 1000)
    }

    endGame () {
      clearInterval(this.timerInterval)
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer)
    }
})


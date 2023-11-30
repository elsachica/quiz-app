/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'
import '../quiz-question/index.js'
// import '../high-score/index.js'
// import '../countdown-timer/index.js'

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
        <nickname-form></nickname-form>
        <quiz-question  ></quiz-question>
        <high-score> </high-score>
        <countdown-timer> </countdown-timer>
</div>
`
customElements.define('quiz-application',

class extends HTMLElement {
    #nickname
    // #timer
    // #timerInterval
    #handleNicknameForm

    #nicknameForm
    #quizQuestion
    #highScore
    #countdownTimer
    

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
      this.#highScore = this.shadowRoot.querySelector('high-score')
      this.#countdownTimer = this.shadowRoot.querySelector('countdown-timer')

      this.#quizQuestion.addEventListener('answer', (event) => {
        event.preventDefault()
        console.log(event.detail)
        this.controllAnswer(event.detail.nextURL, event.detail.answer)
      })

      this.#nicknameForm.addEventListener('submitNicknameClicked', (event) => this.startGame(event))
    }

    connectedCallback() {
    }

    disconnectedCallback() {
      this.#nicknameForm.removeEventListener('submitNicknameClicked', (event) => this.startGame(event))
    }

    async startGame(event) {
      console.log(event.detail)
      this.#nickname = event.detail
      this.#nicknameForm.remove()
      this.nextQuestion('https://courselab.lnu.se/quiz/question/1')
    }

    async nextQuestion (url) {
      const savedQuestion = await this.fetchNextQuestion(url)
      this.#quizQuestion.showQuestion(savedQuestion)
      // this.#countdownTimer.startTimer()
      this.controllAnswer()
    }

    async fetchNextQuestion(url = 'https://courselab.lnu.se/quiz/question/1') {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch(url)
        const questionData = await response.json()

        console.log(questionData)
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

    endGame () {
      clearInterval(this.timerInterval)
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer)
    }
})


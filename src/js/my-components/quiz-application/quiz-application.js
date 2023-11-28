/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'
import '../quiz-question/index.js'
import '../quiz-question-answer/index.js'

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

    // connectedCallback anropas när webbkomponenten är ansluten till DOM
    connectedCallback() {
      // Hämta referensen till elementet med id 'nicknameForm' i skuggDOMen
      const nicknameForm = this.shadowRoot.querySelector('#nicknameForm')

      // Skapa en namngiven funktion handleNicknameForm som tar emot ett event och anropar startGame med det
      this.#handleNicknameForm = (event) => {
        this.startGame(event)
      };

      // Lägg till händelselyssnare för 'nickname-form'-händelsen och anropa handleNicknameForm vid inträffande
      nicknameForm.addEventListener('nickname-form', this.#handleNicknameForm)
    }

    // disconnectedCallback anropas när webbkomponenten tas bort från DOM
    disconnectedCallback() {
      // Hämta referensen till elementet med id 'nicknameForm' i skuggDOMen
      const nicknameForm = this.shadowRoot.querySelector('#nickname-form')

      // Ta bort händelselyssnare för 'nickname-form'-händelsen med handleNicknameForm som referens
      nicknameForm.removeEventListener('nickname-form', this.handleNicknameForm)
    }


    startGame (event) { // acync await
      this.#nickname = event.detail.nickname
      //remove this.nickname-form plcoka bort dom-föreläsning remove 
      this.fetchNextQuestion()
      const savedQuestion = this.fetchNextQuestion()
      this.startTimer()
      //controllAnswer()
    }

    async question (data) {
      const question = await this.fetchNextQuestion(data)
      const fetchedQuestion = this.shadowRoot.querySelector('#question')
      fetchedQuestion.setQuestion(question)
    }

    async fetchNextQuestion(url = 'https://courselab.lnu.se/quiz/question/1') {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch(url)
        const data = await response.json()

        return data
      } catch (error) {
        // Om det uppstår ett fel, logga felet till konsolen
        console.error('Error fetching question:', error)
      }
    }

    async submitAnswer(url, data) {
      try {
        const response = await fetch('https://courselab.lnu.se/quiz/answer/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        if (data.correct) {
          // Om svaret är korrekt, hämta nästa fråga
          this.fetchNextQuestion()
        } else {
          // Om svaret är fel, avsluta spelet
          this.endGame()
        }
      } catch (error) {
        console.error('Error submitting answer:', error)
        return false
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


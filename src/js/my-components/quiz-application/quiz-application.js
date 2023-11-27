/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'

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
    <h1>Start game</h1>
        <nickname-form id="nicknameForm"></nickname-form>
</div>
`
customElements.define('quiz-application',

class extends HTMLElement {
    constructor () {
      super()
      this.nickname = ''
      this.currentQuestion = null
      // this.timer = 20; // Default timer value in seconds
      // this.timerInterval = null

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback () {
      window.addEventListener('nickname', (event) => {
        this.startGame(event)
      })
    }

    startGame (event) {
      this.nickname = event.detail.nickname
      this.fetchNextQuestion()
      this.startTimer()
    }

    async fetchNextQuestion() {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch('https://courselab.lnu.se/quiz/question/1')
        const data = await response.json()

        // Uppdatera direkt frågekomponenten med frågan
        this.shadowRoot.getElementById('question').question = this.currentQuestion
      } catch (error) {
        // Om det uppstår ett fel, logga felet till konsolen
        console.error('Error fetching question:', error)
      }
    }

    async submitAnswer(answer) {
      const requestBody = {
        nickname: this.nickname,
        answer: answer,
      }

      try {
        const response = await fetch('https://courselab.lnu.se/quiz/question/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
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

    // startTimer () {
    //   this.timerInterval = setInterval(() => {
    //     this.timer--

    //     if (this.timer <= 0) {
    //       this.endGame()
    //     }

    //     this.shadowRoot.getElementById('timer').setAttribute('value', this.timer)
    //   }, 1000)
    // }

    endGame () {
      clearInterval(this.timerInterval)
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer)
    }
})


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

const INITIAL_QUESTION_URL = 'https://courselab.lnu.se/quiz/question/1'

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
    #nextURL
    

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
        this.controllAnswer(event)
      })

      this.#nicknameForm.addEventListener('submitNicknameClicked', async (event) => await this.startGame(event))
    }

    connectedCallback() {
    }

    disconnectedCallback() {
      this.#nicknameForm.removeEventListener('submitNicknameClicked', async (event) => await this.startGame(event))
    }

    async startGame(event) {
      this.#nickname = event.detail
      this.#nicknameForm.remove()
      this.nextQuestion(INITIAL_QUESTION_URL)
    }

    async nextQuestion (url) {
      const savedQuestion = await this.fetchNextQuestion(url)
      this.#nextURL = savedQuestion.nextURL
      this.#quizQuestion.showQuestion(savedQuestion)
      // this.#countdownTimer.startTimer()
    }

    async fetchNextQuestion(url) {
      try {
        // Använd fetch API för att hämta nästa fråga från servern
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`status: ${response.status} statusText: ${response.statusText}`)
        }

        return await response.json()
      } catch (error) {
        console.error(error)
      }
    }

    async controllAnswer(event) {
      try {
        const response = await fetch(this.#nextURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answer: event.detail
          })
        })

        if (response.status === 400) {
          this.endGame();
        } else if (response.status === 200) {
          const data = await response.json();
          this.#nextURL = data.nextURL;
          await this.nextQuestion(this.#nextURL);
        } else {
          throw new Error(`status: ${response.status} statusText: ${response.statusText}`);
        }
        // if (response.status === 400) {
        //   this.endGame()
        // }

        // if (!response.ok) {
        //   throw new Error(`status: ${response.status} statusText: ${response.statusText}`)
        // }

        // const data = await response.json()
        // this.#nextURL = data.nextURL
        // await this.nextQuestion(this.#nextURL)
      } catch (error) {
        console.error(error)
      }
    }

    endGame () {
      this.#quizQuestion.remove()
      this.#countdownTimer.remove()
      this.#highScore // visa

      clearInterval(this.timerInterval)
      this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer)
    }
})


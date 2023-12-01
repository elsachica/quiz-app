/**
 * The quiz-application component module.
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
        <quiz-question></quiz-question>
        <h3 class="textGameOver" style="display: none;"> Game over - try again</h3>
        <high-score> </high-score>
        <countdown-timer> </countdown-timer>
</div>
`
customElements.define('quiz-application',

class extends HTMLElement {
    #nickname
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

      this.#quizQuestion.addEventListener('answer', (event) => { // tar emot eventet answer från quiz-question som innehåller användarens svar. Skickar sedan vidare det till controllAnswer
        event.preventDefault()
        this.controllAnswer(event)
      })

      this.#nicknameForm.addEventListener('submitNicknameClicked', async (event) => await this.startGame(event)) // tar emot eventet submitNicknameClicked från nickname-form som innehåller användarens namn. Skickar sedan vidare det till startGame
      this.#countdownTimer.addEventListener('timeout', async (event) => { await this.startTimer(event) }) // när användaren har skrivit in sitt namn och klickat på submit så startas nedräkningen
    }

    connectedCallback() {
    }

    disconnectedCallback() {
      this.#nicknameForm.removeEventListener('submitNicknameClicked', async (event) => await this.startGame(event)) // eventet försvinner från DOM när användaren har skrivit in sitt namn och klickat på submit
      this.#countdownTimer.removeEventListener('timeout', async (event) => { await this.startTimer(event) })
    }

    async startGame(event) {
      this.#nickname = event.detail
      this.#nicknameForm.remove()
      this.nextQuestion(INITIAL_QUESTION_URL)
    }

    async nextQuestion (url) {
      try {
        const savedQuestion = await this.fetchNextQuestion(url)
        await this.showQuestion(savedQuestion)
        await this.startTimer()

        this.#countdownTimer.startTimer(() => { // Starta timer och skicka med en callback-funktion
          this.endGame()
        })
      } catch (error) {
        console.error(error)
      }
    //   const savedQuestion = await this.fetchNextQuestion(url)
    //   this.#nextURL = savedQuestion.nextURL
    //   this.#quizQuestion.showQuestion(savedQuestion)
    //   this.#countdownTimer.startTimer() // starta timer
    // }
    }

    async fetchNextQuestion (url) {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`status: ${response.status} statusText: ${response.statusText}`)
        }

        return await response.json()
      } catch (error) {
        console.error(error)
      }
    }

    async controllAnswer (event) {
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
          const gameOverText = document.querySelector('.textGameOver')
          gameOverText.style.display = 'block'
          
          setTimeout(() => { // we use setTimeout() to wait for 5 seconds (5000 milliseconds) before executing the function inside the callback. Inside the callback, we hide the "Game over - try again" text by setting the display property to "none" and then call the startGame() function.
            gameOverText.style.display = 'none'
            this.startGame()
          }, 5000)
          // this.startGame() // starta om spelet?
          // this.endGame()
          // const gameOverText = document.querySelector('.textGameOver') // måste inte detta ske under några sekunder innan man skickas tillbaka till formuläret?
          // gameOverText.style.display = 'block' // we set the display property of the selected element to "block" to make it visible.
        } else if (response.status === 200) {
          const data = await response.json()
          this.#nextURL = data.nextURL
          await this.nextQuestion(this.#nextURL)
        } else {
          throw new Error(`status: ${response.status} statusText: ${response.statusText}`)
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

    async endGame() {
      this.#quizQuestion.remove()
      this.#countdownTimer.remove()

      await this.#highScore.updateHighScore(this.nickname, this.timer) // kolla om det finns en metod updateHighScore i high-score. samt hur man stoppar in värdet in i den metoden

      // clearInterval(this.timerInterval) // har inte timerInterval som privat fält
      // this.shadowRoot.getElementById('highScore').updateHighScore(this.nickname, this.timer)
    }
})


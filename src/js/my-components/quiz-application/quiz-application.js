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
    #nicknameForm // Privat fält

    constructor () {
      super()

      this.nickname = ''
      this.currentQuestion = null

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Hämta referens till det privata fältet inom skuggdomen
      this.#nicknameForm = this.shadowRoot.getElementById('nicknameForm')
      // Nu kan du använda this.#nicknameForm för att referera till ditt element
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

})


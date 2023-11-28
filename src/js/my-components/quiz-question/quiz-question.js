/**
 * The quiz-question component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    /* stil */
  </style>
    <div>
      <h2 id="question-title"></h2>
      <div id="question-answer"></div>
      <div id="answer-container"></div>
    </div>
`
// lägg in en from med distpatchevent och eventlisnentnensr
//submitknapp utlöser en hädelse samma som i nicknameform
customElements.define('quiz-question',
  /**
   *
   */
  class extends HTMLElement {
    #questionTitle
    #questionAnswer
    #answerContainer

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
      
      this.#questionTitle = this.shadowRoot.querySelector('question-title')
      this.#questionAnswer = this.shadowRoot.querySelector('question-answer')
      this.#answerContainer = this.shadowRoot.querySelector('answer-container')
    }

    /**
     *
     * @param data
     */
    setQuestion (data) {
      this.#questionTitle = document.createElement('h2')
      this.#questionTitle.textContent = data.question
      this.#questionAnswer.showAnswer(data) // (url, data)??
    }

    showAnswer (data) {
      this.#answerContainer.innerHTML = '' // Rensa tidigare svar

      if (data.options && data.options.length > 1) { //alternatives
        // Visa radiobuttons för flera alternativ
        data.options.forEach((option, index) => {
          const radioButton = document.createElement('input')
          radioButton.type = 'radio'
          radioButton.name = 'answerOption'
          radioButton.value = option.key
          radioButton.id = `option${index}`

          const label = document.createElement('label')
          label.textContent = option.text
          label.htmlFor = `option${index}`

          this.#answerContainer.appendChild(radioButton)
          this.#answerContainer.appendChild(label)
        })
      } else {
        // Visa ett textfält om det inte finns flera alternativ
        const textField = document.createElement('input')
        textField.type = 'text'
        textField.id = 'textAnswer'

        this.#answerContainer.appendChild(textField)
      }
    }
  }
)

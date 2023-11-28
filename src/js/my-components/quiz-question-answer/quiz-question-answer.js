/**
 * The quiz-question-answered component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <div id="answer-container"></div>
`

customElements.define('quiz-question-answer',
  /**
   *
   */
  class extends HTMLElement {
    #answerContainer

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#answerContainer = this.shadowRoot.getElementById('answer-container')
    }

    /**
     *
     * @param data
     */
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

/**
 * The quiz-question component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .hidden {
      display: none;
    }
    
  </style>
    <div>
    <h2 id="question"></h2>
      <form id="question-form" hidden>
      </form>
    </div>
`

customElements.define('quiz-question',
  /**
   *
   */
  class extends HTMLElement {
    #question
    #userAnswer
    #questionForm

    /**
     *
     */
    constructor () {
      super()
      this.#userAnswer = ''

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#question = this.shadowRoot.querySelector('#question')
      this.#questionForm = this.shadowRoot.querySelector('#question-form')

      this.#questionForm.addEventListener('submit', (event) => {
        event.preventDefault()
        this.submitAnswer()
      })
    }

    connectedCallback() {
    }
    

    disconnectedCallback () {
    }

    /**
     *
     * @param question
     */

    showQuestion(savedQuestion) {
      this.#questionForm.hidden = false

      this.#questionForm.innerHTML = ''

      // skapar frågans titel
      this.#question.textContent = savedQuestion.question

      if (savedQuestion.alternatives) {
        Object.entries(savedQuestion.alternatives).forEach(([key, value]) => {
          const radioButton = document.createElement('input')
          radioButton.type = 'radio'
          radioButton.name = 'answerOption'
          radioButton.value = key
          radioButton.id = `option${value}`

          radioButton.addEventListener('change', () => {
            this.#userAnswer = radioButton.value
          })

          const label = document.createElement('label')
          label.textContent = value
          label.htmlFor = `option${value}`

          this.#questionForm.appendChild(radioButton)
          this.#questionForm.appendChild(label)
        }
        )
      } else {
        // Handle questions with a text field
        const textField = document.createElement('input')
        textField.type = 'text'
        textField.id = 'answerInput'
        textField.addEventListener('input', () => {
          this.#userAnswer = textField.value
        }
        )
        this.#questionForm.appendChild(textField)
      }
      const submitButton = document.createElement('input')
      submitButton.type = 'submit'
      this.#questionForm.appendChild(submitButton)
    }

    submitAnswer() {
      // Get the selected answer
      // this.selectedAnswer
      // const userAnswer = this.#userAnswer.value
      this.dispatchEvent(new CustomEvent('answer', { detail: this.#userAnswer }))
    }
  }
)


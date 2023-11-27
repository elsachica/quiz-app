/**
 * The quiz-question component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */


const template = document.createElement('template')
template.innerHTML = `
  <style>
    /* Add your styles for the quiz question component */
  </style>
    <div>
      <h2 id="question-title"></h2>
      <div id="question-answer"></div>
    </div>
`

customElements.define('quiz-question',
  /**
   *
   */
  class extends HTMLElement {
    #questionTitle
    #questionAnswer

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
      
      this.#questionTitle = this.shadowRoot.getElementById('question-title')
      this.#questionAnswer = this.shadowRoot.getElementById('question-answer')
    }

    /**
     *
     * @param data
     */
    setQuestion (data) {
      this.#questionTitle.textContent = data.question
      this.#questionAnswer.setAnswer(data)
    }
  }
)

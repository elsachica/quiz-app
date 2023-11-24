/**
 * The answered quesition component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    /* Add your styling for the nickname form here */
  </style>
  <div>
  </div>
`

customElements.define('quiz-question-answer',

  /**
   *
   */
  class extends HTMLElement {
    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)

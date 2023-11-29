/**
 * The quiz-question component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
  </style>
    <div>
      <form>
        <h2 id="question-title"></h2>
        <div id="question-answer"></div>
        <input id="submitAnswer" type="submit" class="hidden" value="Submit" />
      </form>
    </div>
`
// lägg in en from med distpatchevent och eventlisnentnensr
// submitknapp utlöser en hädelse samma som i nicknameform
customElements.define('quiz-question',
  /**
   *
   */
  class extends HTMLElement {
    #questionTitle
    #questionAnswer
    #submitAnswer
    #selectedAnswer

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#questionTitle = this.shadowRoot.querySelector('#question-title')
      this.#questionAnswer = this.shadowRoot.querySelector('#question-answer')
      // this.#answerContainer = this.shadowRoot.querySelector('#answer-container')
      this.#submitAnswer = this.shadowRoot.querySelector('#submit-answer')
      this.#selectedAnswer = this.shadowRoot.querySelector('#selected-answer')
    }

    connectecCallback () {
      this.#submitAnswer.addEventListener('click', this.submitAnswer.bind(this))
    }

    disconnectedCallback () {
      if (this.#submitAnswer) {
        this.#submitAnswer.removeEventListener('click', this.submitAnswer.bind(this))
      }
    }

    /**
     *
     * @param question
     */

    showQuestion(savedQuestion) {
      this.#questionAnswer.textContent = '' // Clear previous answer

      // skapar frågans titel
      this.#questionTitle.textContent = savedQuestion.question
    
      if (savedQuestion.alternatives) {
        // Handle questions with multiple alternatives
        Object.entries(savedQuestion.alternatives).forEach(([key, value]) => {
          const radioButton = document.createElement('input');
          radioButton.type = 'radio';
          radioButton.name = 'answerOption';
          radioButton.value = key;
          radioButton.id = `option${value}`;
    
          const label = document.createElement('label');
          label.textContent = `${key}: ${value}`;
          label.htmlFor = `option${value}`;
          // When a radio button's state changes (i.e., when it is selected or deselected), the event listener's callback function is executed. In this case, the callback function assigns the value of the selected radio button to the selectedAnswer property of the quiz-question component.
          // By doing this, the selectedAnswer property is updated with the value of the selected radio button, allowing you to retrieve the user's answer later when needed.
          radioButton.addEventListener('change', () => {
            this.selectedAnswer = radioButton.value;
          }
          )
        }
        )
      } else {
        // Handle questions with a text field
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.id = 'answerInput';
        textField.addEventListener('input', () => {
          this.selectedAnswer = textField.value;
        }
        )
      }
    }

    submitAnswer() {
      // Get the selected answer
      this.selectedAnswer
      // Dispatch the answer to the parent
      this.dispatchEvent(new CustomEvent('answer', { detail: answer }));
    }
  }
)
      

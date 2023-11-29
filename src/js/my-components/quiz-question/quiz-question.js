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
        <div id="answerContainer">
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
    #questionAnswer
    #answerContainer
    #submitAnswer

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#questionAnswer = this.shadowRoot.querySelector('question-answer')
      this.#answerContainer = this.shadowRoot.querySelector('answer-container')
      this.#submitAnswer = this.shadowRoot.querySelector('submit-answer')
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

    showQuestion(question) {
      this.#questionAnswer.textContent = '' // Clear previous answer
    
      const questionTitle = document.createElement('h2');
      questionTitle.textContent = question.question;
      this.#questionAnswer.appendChild(questionTitle);
    
      const answerContainer = document.createElement('div');
      answerContainer.id = 'answer-container'
      this.#questionAnswer.appendChild(answerContainer);
    
      if (question.alternatives) {
        // Handle questions with multiple alternatives
        Object.entries(question.alternatives).forEach(([key, value]) => {
          const radioButton = document.createElement('input');
          radioButton.type = 'radio';
          radioButton.name = 'answerOption';
          radioButton.value = key;
          radioButton.id = `option${value}`;
    
          const label = document.createElement('label');
          label.textContent = `${key}: ${value}`;
          label.htmlFor = `option${value}`;
    
          answerContainer.appendChild(radioButton);
          answerContainer.appendChild(label);
        });
      } else {
        // Handle questions with a text field
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.id = 'answerInput';
    
        answerContainer.appendChild(textField);
      }
    }

    submitAnswer() {
      // Get the answer from the user input
      const answerInput = this.shadowRoot.querySelector('#answerInput');
      const answer = answerInput.value;

       this.dispatchEvent(new CustomEvent('submit-answer', { detail: data }))

      // Send the answer to the server or perform any necessary actions
      // Here, I'm just logging the answer to the console
      console.log('Submitted answer:', answer)
      
    }
  }
)
      

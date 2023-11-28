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
      <form>
        <h2 id="question-title"></h2>
        <div id="question-answer"></div>
        <div id="answerContainer">
        <input id="submitAnswer" type="submit" value="Submit" />
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

      this.#submitAnswer.addEventListener('click', this.submitAnswer.bind(this)) // bind(this) för att kunna använda this i funktionen.
    }

    connectecCallback () {
      // this.#submitAnswer.addEventListener('click', () => {
      //   this.submitAnswer()
      // } 
      // )
        // event.preventDefault() // preventDefault förhindrar att sidan laddas om
        // this.dispatchEvent(new CustomEvent('submitAnswer', { detail: this.#answerContainer.value }))
      }
    
    /**
     *
     * @param data
     */

    showQuestion(data) {
      this.#questionAnswer.innerHTML = ''; // Clear previous answer
    
      const questionTitle = document.createElement('h2');
      questionTitle.textContent = data.question;
      this.#questionAnswer.appendChild(questionTitle);
    
      const answerContainer = document.createElement('div');
      answerContainer.id = 'answer-container' //shadowRoot?
      this.#questionAnswer.appendChild(answerContainer);
    
      if (data.alternatives) {
        // Handle questions with multiple alternatives
        Object.entries(data.alternatives).forEach(([key, value]) => {
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

    // setQuestion (data) { // showQuestionTitle
    //   this.#questionTitle = document.createElement('h2')
    //   this.#questionTitle.textContent = data.question
    //   this.#questionAnswer.showAnswer(data) // (url, data)??
    // }

    // showAnswer(data) {
    //   this.#questionAnswer.innerHTML = '' // Clear previous answer

    //   if (data.alternatives) {
    //     // Handle questions with multiple alternatives
    //     Object.entries(data.alternatives).forEach(([key, value]) => {
    //       const radioButton = document.createElement('input')
    //       radioButton.type = 'radio'
    //       radioButton.name = 'answerOption'
    //       radioButton.value = key
    //       radioButton.id = `option${value}`

    //       const label = document.createElement('label')
    //       label.textContent = `${key}: ${value}`
    //       label.htmlFor = `option${value}`

    //       this.#questionAnswer.appendChild(radioButton)
    //       this.#questionAnswer.appendChild(label);
    //     })
    //   } else {
    //     // Handle questions with a text field
    //     const textField = document.createElement('input')
    //     textField.type = 'text'
    //     textField.id = 'answerInput'

    //     this.#questionAnswer.appendChild(textField)
    //   }
    // }

    submitAnswer() {
      // // Get the answer from the user input
      // const answerInput = this.shadowRoot.querySelector('#answerInput');
      // const answer = answerInput.value;

      //  this.dispatchEvent(new CustomEvent('submit-answer', { detail: data }))

      // // Send the answer to the server or perform any necessary actions
      // // Here, I'm just logging the answer to the console
      // console.log('Submitted answer:', answer)
      // 
    }
  }
)
      

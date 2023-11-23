// quiz-question.js

class QuizQuestion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <!-- Your quiz question UI goes here -->
      `;
    }
  
    // Add methods and logic to handle displaying questions and receiving user input
  }
  
  customElements.define('quiz-question', QuizQuestion);
  

    // -------------------------------- andra lösningen ------------------------------ //
    <!-- quiz-question.js -->

    <!-- Define template for the quiz-question component -->
    <template id="quiz-question-template">
      <style>
        /* Add any styling you need for the question here */
        .question-container {
          margin: 20px 0;
        }
    
        .options-container {
          margin-top: 10px;
        }
      </style>
      <div class="question-container">
        <p id="question-text"></p>
        <div class="options-container" id="options-container"></div>
        <button id="submit-button">Submit Answer</button>
      </div>
    </template>
    
    <!-- Define the quiz-question web component -->
    <script>
      class QuizQuestion extends HTMLElement {
        constructor() {
          super();
    
          // Attach a shadow DOM to the element
          this.attachShadow({ mode: 'open' });
    
          // Clone the template content into the shadow DOM
          this.shadowRoot.appendChild(
            document.getElementById('quiz-question-template').content.cloneNode(true)
          );
    
          // Get references to relevant elements
          this.questionTextElement = this.shadowRoot.getElementById('question-text');
          this.optionsContainerElement = this.shadowRoot.getElementById('options-container');
          this.submitButton = this.shadowRoot.getElementById('submit-button');
    
          // Event listener for the submit button
          this.submitButton.addEventListener('click', () => this.submitAnswer());
        }
    
        // Attributes to monitor for changes
        static get observedAttributes() {
          return ['question'];
        }
    
        // Handle changes to observed attributes
        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'question') {
            this.renderQuestion(newValue);
          }
        }
    
        // Method to render the question and options
        renderQuestion(question) {
          const parsedQuestion = JSON.parse(question);
    
          // Set the question text
          this.questionTextElement.textContent = parsedQuestion.text;
    
          // Clear previous options
          this.optionsContainerElement.innerHTML = '';
    
          // Create radio buttons for each option
          parsedQuestion.options.forEach((option, index) => {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'options';
            radioInput.value = `alt${index + 1}`;
            this.optionsContainerElement.appendChild(radioInput);
    
            const label = document.createElement('label');
            label.textContent = option;
            this.optionsContainerElement.appendChild(label);
    
            this.optionsContainerElement.appendChild(document.createElement('br'));
          });
        }
    
        // Method to submit the answer
        submitAnswer() {
          const selectedOption = this.shadowRoot.querySelector('input[name="options"]:checked');
    
          if (selectedOption) {
            const answer = selectedOption.value;
            // Dispatch a custom event to notify the parent component about the answer
            this.dispatchEvent(new CustomEvent('answer-submitted', { detail: answer }));
          } else {
            // Handle case where no option is selected
            console.error('Please select an option before submitting.');
          }
        }
      }
    
      // Define the custom element
      customElements.define('quiz-question', QuizQuestion);
    </script>
    
    // This code assumes that you will set the question as an attribute when using the component, like this:
    // <quiz-question question='{"text": "What is the capital of France?", "options": ["Berlin", "Madrid", "Paris", "Rome"]}'>
    // </quiz-question>

        // -------------------------------- tredje lösningen ------------------------------ //

        // quiz-question.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Add your styles for the quiz question component */
  </style>
  <div id="question-container">
    <p id="question-text"></p>
    <div id="options-container"></div>
  </div>
`;

customElements.define('quiz-question',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.questionContainer = this.shadowRoot.getElementById('question-container');
      this.questionText = this.shadowRoot.getElementById('question-text');
      this.optionsContainer = this.shadowRoot.getElementById('options-container');

      this.questionData = null; // Store the current question data here
    }

    /**
     * Set the question data and update the component.
     * @param {Object} data - The question data.
     */
    setQuestion(data) {
      this.questionData = data;
      this.render();
    }

    /**
     * Render the question and options.
     */
    render() {
      if (this.questionData) {
        this.questionText.textContent = this.questionData.question;

        // Clear previous options
        this.optionsContainer.innerHTML = '';

        // Check if the question has options
        if (this.questionData.options && this.questionData.options.length > 0) {
          this.questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.handleOptionClick(index));
            this.optionsContainer.appendChild(optionElement);
          });
        }
      }
    }

    /**
     * Handle the user's click on an option.
     * @param {number} index - The index of the selected option.
     */
    handleOptionClick(index) {
      // Notify the parent component about the selected option
      const event = new CustomEvent('optionSelected', {
        detail: {
          questionId: this.questionData.id,
          selectedOption: index,
        },
      });
      this.dispatchEvent(event);
    }
  }
);

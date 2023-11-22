// nickname-form.js

class NicknameForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <!-- Your nickname form UI goes here -->
      `;
    }
  
    // Add methods and logic for handling nickname input
  }
  
  customElements.define('nickname-form', NicknameForm);

  
          // -------------------------------- andra lösningen ------------------------------ //

          // nickname-form.js

// Define template.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Add your styling for the nickname form here */
  </style>
  <div>
    <label for="nickname">Enter your nickname:</label>
    <input type="text" id="nickname" />
    <button id="submitNickname">Submit</button>
  </div>
`;

customElements.define('nickname-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The form element.
     *
     * @type {HTMLFormElement}
     */
    #form;

    /**
     * The input element for the nickname.
     *
     * @type {HTMLInputElement}
     */
    #nicknameInput;

    /**
     * The submit button.
     *
     * @type {HTMLButtonElement}
     */
    #submitButton;

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super();

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));

      // Get elements in the shadow root.
      this.#form = this.shadowRoot.querySelector('div');
      this.#nicknameInput = this.shadowRoot.querySelector('#nickname');
      this.#submitButton = this.shadowRoot.querySelector('#submitNickname');

      // Bind the event handlers.
      this.#form.addEventListener('submit', this.#handleSubmit.bind(this));
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      // Additional initialization logic can go here.
    }

    /**
     * Handles the form submission.
     *
     * @param {Event} event - The submit event.
     */
    #handleSubmit(event) {
      event.preventDefault();

      const nickname = this.#nicknameInput.value.trim();

      if (nickname !== '') {
        // Dispatch an event with the entered nickname.
        this.dispatchEvent(new CustomEvent('nicknameSubmitted', {
          detail: { nickname },
          bubbles: true,
          composed: true,
        }));
      }
    }

    /**
     * Gets the current nickname.
     *
     * @returns {string} The nickname value.
     */
    get nickname() {
      return this.#nicknameInput.value.trim();
    }

    /**
     * Sets the initial value for the nickname.
     *
     * @param {string} value - The initial nickname.
     */
    set nickname(value) {
      this.#nicknameInput.value = value;
    }
  }
);

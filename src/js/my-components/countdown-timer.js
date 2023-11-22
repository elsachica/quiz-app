// countdown-timer.js

class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <div id="timer">20</div>
      `;
      this.timerElement = this.shadowRoot.getElementById('timer');
      this.timeRemaining = 20;
    }
  
    connectedCallback() {
      this.startTimer();
    }
  
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining -= 1;
          this.timerElement.textContent = this.timeRemaining;
        } else {
          // Time's up logic
          this.dispatchEvent(new Event('timeout'));
          clearInterval(this.timerInterval);
        }
      }, 1000);
    }
  }
  
  customElements.define('countdown-timer', CountdownTimer);

  // -------------------------------- andra lösningen ------------------------------ //
// countdown-timer.js

/**
 * The countdown-timer web component module.
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .timer {
      font-size: 1.5em;
      color: #333;
    }
  </style>
  <div class="timer"></div>
`;

customElements.define('countdown-timer',
  /**
   * Represents a countdown-timer element.
   */
  class extends HTMLElement {
    /**
     * The timer element.
     *
     * @type {HTMLDivElement}
     */
    #timerElement;

    /**
     * The time limit for the timer.
     *
     * @type {number}
     */
    #timeLimit;

    /**
     * The current time left on the timer.
     *
     * @type {number}
     */
    #currentTime;

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super();

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));

      // Get the timer element in the shadow root.
      this.#timerElement = this.shadowRoot.querySelector('.timer');
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes() {
      return ['limit'];
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      if (!this.hasAttribute('limit')) {
        this.setAttribute('limit', 20);
      }

      this.#timeLimit = parseInt(this.getAttribute('limit'), 10);
      this.#currentTime = this.#timeLimit;

      this.#updateTimerDisplay();
      this.#startTimer();
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'limit' && oldValue !== newValue) {
        this.#timeLimit = parseInt(newValue, 10);
        this.#currentTime = this.#timeLimit;
        this.#updateTimerDisplay();
        this.#startTimer();
      }
    }

    /**
     * Updates the timer display.
     */
    #updateTimerDisplay() {
      this.#timerElement.textContent = this.#currentTime;
    }

    /**
     * Starts the countdown timer.
     */
    #startTimer() {
      this.#timerInterval = setInterval(() => {
        this.#currentTime--;

        if (this.#currentTime < 0) {
          this.#currentTime = 0;
          this.dispatchEvent(new Event('timeout'));
          clearInterval(this.#timerInterval);
        }

        this.#updateTimerDisplay();
      }, 1000);
    }
  }
);

/**
 * The nickname-form component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
  div {
    text-align: center;
    margin: 20px;
  }

  form {
    display: inline-block;
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  input[type="submit"] {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }

  p {
    color: red;
    margin-top: 10px;
  }  </style>
  <div>
    <form>
        <label for="nickname">Please write your nickname:</label>
        <input id="nickname" type="text" placeholder="Enter your nickname" />
        <input id="submitNickname" type="submit" value="Submit" />
    </form>
    <p></p>
  </div>
`

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
    #form

    /**
     * The input element for the nickname.
     *
     * @type {HTMLInputElement}
     */
    #nicknameInput

    /**
     * The submit button.
     *
     * @type {HTMLButtonElement}
     */
    #submitNickname

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#nicknameInput = this.shadowRoot.querySelector('#nickname')
      this.#submitNickname = this.shadowRoot.querySelector('#submitNickname')
      this.#form = this.shadowRoot.querySelector('form')
    }

    /**
     * Attaches an event listener to the submit button to handle the click event.
     *
     * @returns {void}
     */
    connectedCallback () {
      this.#form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.getNickname(event)
      })
    }

    /**
     * Removes the event listener for the nickname button when the element is disconnected from the DOM.
     *
     * @returns {void}
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', (event) => {
        event.preventDefault()
        this.getNickname(event)
      })
    }

    /**
     * Retrieves the nickname from the input field and dispatches a 'nickname' event with the nickname as the event detail.
     *
     * @param {Event} event - The event object.
     */
    getNickname (event) {
      event.preventDefault()
      if (this.#nicknameInput.value) {
        this.dispatchEvent(new CustomEvent('submitNicknameClicked', {
          detail: this.#nicknameInput.value
        }))
      } else {
        const alertMissingNickname = this.shadowRoot.querySelector('p')
        alertMissingNickname.textContent = 'Please enter a nickname'
      }
    }
  }
)

/**
 * The main script file of the application.
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.1.0
 */

import './my-components/nickname-form/index.js'
import './my-components/quiz-application/index.js'

const nicknameform = document.createElement('nickname-form')
document.body.appendChild(nicknameform)
window.addEventListener('nickname', (event) => {
  console.log('hej')
})
/**
 * The high-score component module.
 *
 * @author Elsa Gas Wikström <eg223ps@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Add any custom styles for the high score component here */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  </style>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
`;

customElements.define('high-score', 

class extends HTMLElement {
  #highScores;

  constructor() {
    this.#highScores = []

    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));

    this.tableBody = this.shadowRoot.querySelector('tbody');
  }

  connectedCallback() {
    this.loadHighScores();
    this.renderHighScores();
  }

  disconnectedCallback() {
    // Cleanup or additional actions when the component is removed
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // React to attribute changes if needed
  }

  loadHighScores() {
    // Load high scores from Web Storage or IndexDB API
    const storedScores = localStorage.getItem('highScores');
    this.#highScores = storedScores ? JSON.parse(storedScores) : [];
  }

  saveHighScores() {
    // Save high scores to Web Storage or IndexDB API
    localStorage.setItem('highScores', JSON.stringify(this.#highScores));
  }

  addHighScore(username, score) {
    // Add a new high score to the list
    this.#highScores.push({ username, score });
    // Sort the high scores in ascending order
    this.#highScores.sort((a, b) => a.score - b.score);
    // Keep only the top 5 scores
    this.#highScores = this.#highScores.slice(0, 5);
    // Save the updated high scores
    this.saveHighScores();
    // Update the displayed high scores
    this.renderHighScores();
  }

  renderHighScores() {
    // Clear the existing table rows
    this.tableBody.innerHTML = '';
    
    // Render each high score as a table row
    this.#highScores.forEach((score, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.username}</td>
        <td>${score.score}</td>
      `;
      this.tableBody.appendChild(row);
    });
  }
});


// ------------------ Andra lösningen ------------------ //


// // high-score.js

// const template = document.createElement('template');
// template.innerHTML = `
//   <style>
//     #highScoreContainer {
//       border: 1px solid #ddd;
//       padding: 10px;
//       margin-top: 20px;
//     }

//     #highScoreTable {
//       width: 100%;
//       border-collapse: collapse;
//     }

//     #highScoreTable th, #highScoreTable td {
//       border: 1px solid #ddd;
//       padding: 8px;
//       text-align: left;
//     }
//   </style>

//   <div id="highScoreContainer">
//     <h2>High Score</h2>
//     <table id="highScoreTable">
//       <thead>
//         <tr>
//           <th>Rank</th>
//           <th>Username</th>
//           <th>Time</th>
//         </tr>
//       </thead>
//       <tbody id="highScoreBody"></tbody>
//     </table>
//   </div>
// `;

// class extends HTMLElement {
//   constructor() {
//     super();

//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.appendChild(template.content.cloneNode(true));

//     this.highScoreContainer = this.shadowRoot.getElementById('highScoreContainer');
//     this.highScoreBody = this.shadowRoot.getElementById('highScoreBody');
//   }

//   static get observedAttributes() {
//     return ['scores'];
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name === 'scores') {
//       this.renderHighScores(JSON.parse(newValue));
//     }
//   }

//   renderHighScores(scores) {
//     this.highScoreBody.innerHTML = '';

//     scores.forEach((score, index) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${score.username}</td>
//         <td>${score.time} seconds</td>
//       `;
//       this.highScoreBody.appendChild(row);
//     });
//   }
// }

// customElements.define('high-score', HighScore);

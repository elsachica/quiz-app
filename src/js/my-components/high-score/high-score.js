// high-score.js

// class HighScore extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//       this.shadowRoot.innerHTML = `
//         <style>
//           /* Add your styles here */
//         </style>
//         <!-- Your high score UI goes here -->
//       `;
//     }
  
//     // Add methods and logic for displaying and updating high scores
//   }
  
//   customElements.define('high-score', HighScore);
  
// // -------------------------------- andra lösningen ------------------------------ //

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

// class HighScore extends HTMLElement {
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

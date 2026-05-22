// Stap 1: Selecteer alle elementen met de class 'leaderboard-button'
const knoppen = document.querySelectorAll('.leaderboard-button');

// Stap 2: Loop door elke knop heen
knoppen.forEach(button => {
  
  // Stap 3: Wat moet er gebeuren als er geklikt wordt?
  button.addEventListener('click', function() {
    
    // A. Verwijder de 'actief' class van ALLE knoppen
    knoppen.forEach(k => k.classList.remove('active'));
    
    // B. Voeg de 'actief' class toe aan de knop waar NU op geklikt is
    this.classList.add('active');
  });
  
});
function createGameBoard() {
  const gameCanvas = document.getElementById("gameCanvas");
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    row.classList.add("row");
    gameCanvas.appendChild(row);
  }
}
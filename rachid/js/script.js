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
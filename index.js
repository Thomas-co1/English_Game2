// Elements DOM
const roulette = document.getElementById("roulette");
const popup = document.getElementById("popup");
const colorBox = document.getElementById("colorBox");
const zoneName = document.getElementById("zoneName");
const questionTheme = document.getElementById("questionTheme");
const questionText = document.getElementById("questionText");
const questionType = document.getElementById("questionType");

// Les segments de la roulette
const segments = [
  { color: '#1e87f0', colorName: 'BLUE' },
  { color: '#fda066', colorName: 'ORANGE' },
  { color: '#a259ff', colorName: 'PURPLE' },
  { color: '#32d296', colorName: 'GREEN' },
  { color: '#000000', colorName: 'BLACK' },
  { color: '#1e87f0', colorName: 'BLUE' },
  { color: '#fda066', colorName: 'ORANGE' },
  { color: '#a259ff', colorName: 'PURPLE' },
  { color: '#32d296', colorName: 'GREEN' },
  { color: '#1e87f0', colorName: 'BLUE' },
  { color: '#fda066', colorName: 'ORANGE' },
  { color: '#a259ff', colorName: 'PURPLE' },
  { color: '#32d296', colorName: 'GREEN' },
  { color: '#000000', colorName: 'BLACK' },
  { color: '#1e87f0', colorName: 'BLUE' },
  { color: '#fda066', colorName: 'ORANGE' },
  { color: '#a259ff', colorName: 'PURPLE' },
  { color: '#32d296', colorName: 'GREEN' }
];

// Fonction pour déterminer la zone
function getZoneFromAngle(angle) {
  if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle < 45)) return 'Right Hand';
  else if (angle >= 45 && angle < 135) return 'Right Foot';
  else if (angle >= 135 && angle < 225) return 'Left Foot';
  else return 'Left Hand';
}

// Charger le JSON côté client
let questionsData = null;
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    questionsData = data;
    console.log('Data loaded:', questionsData);
  })
  .catch(err => console.error('Error loading JSON:', err));

roulette.addEventListener("click", () => {
  const spinDeg = Math.floor(Math.random() * 360) + 360 * (3 + Math.random() * 5);
  roulette.style.transform = `rotate(${spinDeg}deg)`;

  setTimeout(() => {
    const normalizedDeg = (360 - (spinDeg % 360)) % 360;
    const segmentIndex = Math.floor(normalizedDeg / 20) % segments.length;
    const segment = segments[segmentIndex];
    const zone = getZoneFromAngle(normalizedDeg);

    colorBox.style.background = segment.color;
    zoneName.textContent = zone;

    // Récupérer une question aléatoire pour cette couleur
    if (!questionsData) {
      questionTheme.textContent = '';
      questionText.textContent = 'No question data loaded';
      questionType.textContent = '';
      popup.style.display = "block";
      return;
    }

    let questions = [];
    switch(segment.colorName) {
      case 'ORANGE': questions = questionsData.questions_artificial_intelligence || []; break;
      case 'BLUE': questions = questionsData.questions_general_knowledge || []; break;
      case 'PURPLE': questions = questionsData.questions_dangers_internet || []; break;
      case 'GREEN': questions = questionsData.questions_utility_applications || []; break;
      case 'BLACK': questions = questionsData.questions_good_luck || []; break;
      default: questions = questionsData.questions_general_knowledge || [];
    }

    if (questions.length === 0) {
      questionTheme.textContent = '';
      questionText.textContent = 'No questions found';
      questionType.textContent = '';
    } else {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomIndex];
      questionTheme.textContent = question.theme;
      questionText.textContent = question.question;
      questionType.textContent = `Type: ${question.type} | Difficulty: ${question.difficulty ?? 'N/A'}`;
    }

    popup.style.display = "block";
  }, 4000);
});

function closePopup() {
  popup.style.display = "none";
}


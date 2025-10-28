//console.log("Hello World");
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//Selecting DOM EElements
const btn = document.querySelector(".btn-open");
const contactBtn = document.querySelector(".btn-contact");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

//Create DOM Elemts: Render facts in list
factsList.innerHTML = "";

//Load data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://hwfgktjilvrinhiptfaj.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZmdrdGppbHZyaW5oaXB0ZmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMjYzNjgsImV4cCI6MjA2MzcwMjM2OH0.vVml3K4EcfBoWw-ffiMEWig9ZsVkwutjIiqZJhAGQHU",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZmdrdGppbHZyaW5oaXB0ZmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMjYzNjgsImV4cCI6MjA2MzcwMjM2OH0.vVml3K4EcfBoWw-ffiMEWig9ZsVkwutjIiqZJhAGQHU",
      },
    }
  );
  const data = await res.json();
  console.log(res);
}

//createFactsList(initialFacts); //das übergebene Array wird gelooped mit '.map()'
function createFactsList(dataArray) {
  //factsList.insertAdjacentHTML("afterbegin", "<li>Jonas</li>");
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">  
     <p>
     ${fact.text}
          <a
            class="source"
            href="${fact.source}"
            target="_blank"
            >(Source)</a>
            </p>
              <span class="tag" style="background-color: #3b82f6"
              >${fact.category}</span>
    </li>`
  );
  console.log(htmlArr);
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

//Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

// CAPTCHA functionality
let captchaData = {
  correctAnswers: [],
  selectedImages: [],
};

// Fallback für mathematisches CAPTCHA
let captchaAnswer = 0;
let preloadedImages = [];

// Cooldown-System für CAPTCHA-Fehler
let captchaFailureCount = 0;
let isInCooldown = false;
let cooldownTimer = null;

// Kategorie-Namen für CAPTCHA-Fragen
const categoryNames = {
  animals: "Tiere",
  vehicles: "Fahrzeuge",
  food: "Essen",
};

// Bilddatenbank mit verschiedenen Kategorien
const imageDatabase = {
  animals: [
    {
      src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop",
      alt: "Katze",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop",
      alt: "Hund",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=150&h=150&fit=crop",
      alt: "Vogel",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=150&h=150&fit=crop",
      alt: "Elefant",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=150&h=150&fit=crop",
      alt: "Löwe",
      category: "animals",
    },
    {
      src: "https://images.unsplash.com/photo-1518717757756-8c1920ad4234?w=150&h=150&fit=crop",
      alt: "Pferd",
      category: "animals",
    },
  ],
  vehicles: [
    {
      src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=150&h=150&fit=crop",
      alt: "Auto",
      category: "vehicles",
    },
    {
      src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=150&h=150&fit=crop",
      alt: "Motorrad",
      category: "vehicles",
    },
    {
      src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=150&h=150&fit=crop",
      alt: "Fahrrad",
      category: "vehicles",
    },
    {
      src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop",
      alt: "Bus",
      category: "vehicles",
    },
    {
      src: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=150&h=150&fit=crop",
      alt: "LKW",
      category: "vehicles",
    },
    {
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=150&h=150&fit=crop",
      alt: "Flugzeug",
      category: "vehicles",
    },
  ],
  food: [
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop",
      alt: "Pizza",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=150&h=150&fit=crop",
      alt: "Burger",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=150&h=150&fit=crop",
      alt: "Pommes",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=150&h=150&fit=crop",
      alt: "Salat",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=150&h=150&fit=crop",
      alt: "Obst",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop",
      alt: "Sandwich",
      category: "food",
    },
  ],
};

// Preloading-Funktion für Bilder - garantiert dass alle Slots Bilder haben
function preloadImages(images) {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const totalImages = images.length;
    const loadedImages = [];

    if (totalImages === 0) {
      resolve([]);
      return;
    }

    images.forEach((imageData, index) => {
      const img = new Image();

      img.onload = function () {
        loadedImages[index] = {
          ...imageData,
          element: img,
        };
        loadedCount++;

        if (loadedCount === totalImages) {
          resolve(loadedImages);
        }
      };

      img.onerror = function () {
        console.log("Bild konnte nicht geladen werden:", imageData.src);
        // Verwende ein Fallback-Bild oder Platzhalter
        loadedImages[index] = {
          ...imageData,
          element: img,
          src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzg3MTZjIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTgyOTllIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CSUxEPC90ZXh0Pgo8L3N2Zz4K",
          alt: "Bild nicht verfügbar",
        };
        loadedCount++;

        if (loadedCount === totalImages) {
          resolve(loadedImages);
        }
      };

      img.src = imageData.src;
    });
  });
}

// Zufällige mathematische Aufgabe mit variierender Klammer-Setzung und Reihenfolge
function generateRandomMathQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const num3 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-", "*"];

  // Zufällige Auswahl der Operationen
  const operation1 = operations[Math.floor(Math.random() * operations.length)];
  const operation2 = operations[Math.floor(Math.random() * operations.length)];

  // Zufällige Klammer-Setzung (60% Chance für Klammern)
  const useBrackets = Math.random() < 0.6;

  let question = "";
  let answer = 0;

  if (useBrackets) {
    // Mit Klammern - verschiedene Muster
    const bracketPatterns = [
      // Pattern 1: (a op b) op c
      () => {
        switch (operation1) {
          case "+":
            switch (operation2) {
              case "+":
                return [
                  `(${num1} + ${num2}) + ${num3} = ?`,
                  num1 + num2 + num3,
                ];
              case "-":
                return [
                  `(${num1} + ${num2}) - ${num3} = ?`,
                  num1 + num2 - num3,
                ];
              case "*":
                return [
                  `(${num1} + ${num2}) × ${num3} = ?`,
                  (num1 + num2) * num3,
                ];
            }
            break;
          case "-":
            const larger1 = Math.max(num1, num2);
            const smaller1 = Math.min(num1, num2);
            switch (operation2) {
              case "+":
                return [
                  `(${larger1} - ${smaller1}) + ${num3} = ?`,
                  larger1 - smaller1 + num3,
                ];
              case "-":
                return [
                  `(${larger1} - ${smaller1}) - ${num3} = ?`,
                  larger1 - smaller1 - num3,
                ];
              case "*":
                return [
                  `(${larger1} - ${smaller1}) × ${num3} = ?`,
                  (larger1 - smaller1) * num3,
                ];
            }
            break;
          case "*":
            switch (operation2) {
              case "+":
                return [
                  `(${num1} × ${num2}) + ${num3} = ?`,
                  num1 * num2 + num3,
                ];
              case "-":
                return [
                  `(${num1} × ${num2}) - ${num3} = ?`,
                  num1 * num2 - num3,
                ];
              case "*":
                return [
                  `(${num1} × ${num2}) × ${num3} = ?`,
                  num1 * num2 * num3,
                ];
            }
            break;
        }
      },
      // Pattern 2: a op (b op c)
      () => {
        switch (operation1) {
          case "+":
            switch (operation2) {
              case "+":
                return [
                  `${num1} + (${num2} + ${num3}) = ?`,
                  num1 + num2 + num3,
                ];
              case "-":
                return [
                  `${num1} + (${num2} - ${num3}) = ?`,
                  num1 + num2 - num3,
                ];
              case "*":
                return [
                  `${num1} + (${num2} × ${num3}) = ?`,
                  num1 + num2 * num3,
                ];
            }
            break;
          case "-":
            const larger2 = Math.max(num2, num3);
            const smaller2 = Math.min(num2, num3);
            switch (operation2) {
              case "+":
                return [
                  `${num1} - (${larger2} + ${smaller2}) = ?`,
                  num1 - larger2 - smaller2,
                ];
              case "-":
                return [
                  `${num1} - (${larger2} - ${smaller2}) = ?`,
                  num1 - larger2 + smaller2,
                ];
              case "*":
                return [
                  `${num1} - (${larger2} × ${smaller2}) = ?`,
                  num1 - larger2 * smaller2,
                ];
            }
            break;
          case "*":
            switch (operation2) {
              case "+":
                return [
                  `${num1} × (${num2} + ${num3}) = ?`,
                  num1 * (num2 + num3),
                ];
              case "-":
                return [
                  `${num1} × (${num2} - ${num3}) = ?`,
                  num1 * (num2 - num3),
                ];
              case "*":
                return [
                  `${num1} × (${num2} × ${num3}) = ?`,
                  num1 * num2 * num3,
                ];
            }
            break;
        }
      },
    ];

    const selectedPattern =
      bracketPatterns[Math.floor(Math.random() * bracketPatterns.length)];
    const result = selectedPattern();
    question = result[0];
    answer = result[1];
  } else {
    // Ohne Klammern - verschiedene Reihenfolgen
    const noBracketPatterns = [
      // Standard-Reihenfolge: a op b op c
      () => {
        switch (operation1) {
          case "+":
            switch (operation2) {
              case "+":
                return [`${num1} + ${num2} + ${num3} = ?`, num1 + num2 + num3];
              case "-":
                return [`${num1} + ${num2} - ${num3} = ?`, num1 + num2 - num3];
              case "*":
                return [`${num1} + ${num2} × ${num3} = ?`, num1 + num2 * num3];
            }
            break;
          case "-":
            const larger1 = Math.max(num1, num2);
            const smaller1 = Math.min(num1, num2);
            switch (operation2) {
              case "+":
                return [
                  `${larger1} - ${smaller1} + ${num3} = ?`,
                  larger1 - smaller1 + num3,
                ];
              case "-":
                return [
                  `${larger1} - ${smaller1} - ${num3} = ?`,
                  larger1 - smaller1 - num3,
                ];
              case "*":
                return [
                  `${larger1} - ${smaller1} × ${num3} = ?`,
                  (larger1 - smaller1) * num3,
                ];
            }
            break;
          case "*":
            switch (operation2) {
              case "+":
                return [`${num1} × ${num2} + ${num3} = ?`, num1 * num2 + num3];
              case "-":
                return [`${num1} × ${num2} - ${num3} = ?`, num1 * num2 - num3];
              case "*":
                return [`${num1} × ${num2} × ${num3} = ?`, num1 * num2 * num3];
            }
            break;
        }
      },
      // Umgekehrte Reihenfolge: c op a op b
      () => {
        switch (operation1) {
          case "+":
            switch (operation2) {
              case "+":
                return [`${num3} + ${num1} + ${num2} = ?`, num3 + num1 + num2];
              case "-":
                return [`${num3} - ${num1} + ${num2} = ?`, num3 - num1 + num2];
              case "*":
                return [`${num3} + ${num1} × ${num2} = ?`, num3 + num1 * num2];
            }
            break;
          case "-":
            const larger2 = Math.max(num3, num1);
            const smaller2 = Math.min(num3, num1);
            switch (operation2) {
              case "+":
                return [
                  `${larger2} - ${smaller2} + ${num2} = ?`,
                  larger2 - smaller2 + num2,
                ];
              case "-":
                return [
                  `${larger2} - ${smaller2} - ${num2} = ?`,
                  larger2 - smaller2 - num2,
                ];
              case "*":
                return [
                  `${larger2} - ${smaller2} × ${num2} = ?`,
                  (larger2 - smaller2) * num2,
                ];
            }
            break;
          case "*":
            switch (operation2) {
              case "+":
                return [`${num3} × ${num1} + ${num2} = ?`, num3 * num1 + num2];
              case "-":
                return [`${num3} × ${num1} - ${num2} = ?`, num3 * num1 - num2];
              case "*":
                return [`${num3} × ${num1} × ${num2} = ?`, num3 * num1 * num2];
            }
            break;
        }
      },
      // Gemischte Reihenfolge: b op c op a
      () => {
        switch (operation1) {
          case "+":
            switch (operation2) {
              case "+":
                return [`${num2} + ${num3} + ${num1} = ?`, num2 + num3 + num1];
              case "-":
                return [`${num2} - ${num3} + ${num1} = ?`, num2 - num3 + num1];
              case "*":
                return [`${num2} + ${num3} × ${num1} = ?`, num2 + num3 * num1];
            }
            break;
          case "-":
            const larger3 = Math.max(num2, num3);
            const smaller3 = Math.min(num2, num3);
            switch (operation2) {
              case "+":
                return [
                  `${larger3} - ${smaller3} + ${num1} = ?`,
                  larger3 - smaller3 + num1,
                ];
              case "-":
                return [
                  `${larger3} - ${smaller3} - ${num1} = ?`,
                  larger3 - smaller3 - num1,
                ];
              case "*":
                return [
                  `${larger3} - ${smaller3} × ${num1} = ?`,
                  (larger3 - smaller3) * num1,
                ];
            }
            break;
          case "*":
            switch (operation2) {
              case "+":
                return [`${num2} × ${num3} + ${num1} = ?`, num2 * num3 + num1];
              case "-":
                return [`${num2} × ${num3} - ${num1} = ?`, num2 * num3 - num1];
              case "*":
                return [`${num2} × ${num3} × ${num1} = ?`, num2 * num3 * num1];
            }
            break;
        }
      },
    ];

    const selectedPattern =
      noBracketPatterns[Math.floor(Math.random() * noBracketPatterns.length)];
    const result = selectedPattern();
    question = result[0];
    answer = result[1];
  }

  return { question, answer };
}

// Mathematisches CAPTCHA als Fallback
function generateMathCaptcha() {
  const mathResult = generateRandomMathQuestion();
  captchaAnswer = mathResult.answer;

  // Setze die Frage für mathematisches CAPTCHA
  const questionElement = document.getElementById("captchaQuestion");
  if (questionElement) {
    questionElement.textContent = mathResult.question;
  }
}

function switchToMathCaptcha() {
  console.log("Wechsle zu mathematischem CAPTCHA");

  // Verstecke Loading-Indikator
  document.getElementById("captchaLoading").classList.add("hidden");

  // Entferne Bild-Container und ersetze mit Eingabefeld
  const imagesContainer = document.getElementById("captchaImages");
  const actionsContainer = document.querySelector(".captcha-actions");

  // Erstelle Eingabefeld-Container
  const answerContainer = document.createElement("div");
  answerContainer.className = "captcha-answer";
  answerContainer.innerHTML = `
    <input type="number" id="captchaInput" placeholder="Ihre Antwort" />
  `;

  // Ersetze Bilder mit Eingabefeld
  imagesContainer.parentNode.replaceChild(answerContainer, imagesContainer);

  // Aktualisiere Actions-Container
  actionsContainer.innerHTML = `
    <button id="captchaSubmit" class="btn btn-captcha">Verifizieren</button>
    <button id="captchaRefresh" class="btn btn-captcha-refresh">🔄 Neue Aufgabe</button>
  `;

  // Zeige CAPTCHA-Challenge
  document.getElementById("captchaChallenge").classList.remove("hidden");

  // Generiere zufällige mathematische Aufgabe
  const mathResult = generateRandomMathQuestion();
  captchaAnswer = mathResult.answer;

  // Setze die Frage direkt
  const questionElement = document.getElementById("captchaQuestion");
  if (questionElement) {
    questionElement.textContent = mathResult.question;
  }

  // Generiere mathematische Aufgabe und setze Event Listeners (nachdem HTML-Elemente existieren)
  setTimeout(() => {
    // Entferne alte Event Listeners und setze neue
    const submitBtn = document.getElementById("captchaSubmit");
    const refreshBtn = document.getElementById("captchaRefresh");
    const inputField = document.getElementById("captchaInput");

    if (submitBtn && refreshBtn && inputField) {
      // Clone und replace um Event Listeners zu entfernen
      const newSubmitBtn = submitBtn.cloneNode(true);
      const newRefreshBtn = refreshBtn.cloneNode(true);
      const newInputField = inputField.cloneNode(true);

      submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
      refreshBtn.parentNode.replaceChild(newRefreshBtn, refreshBtn);
      inputField.parentNode.replaceChild(newInputField, inputField);

      // Neue Event Listeners setzen
      newSubmitBtn.addEventListener("click", verifyMathCaptcha);
      newRefreshBtn.addEventListener("click", generateMathCaptcha);

      // Enter-Taste für Eingabefeld - nur bei gültiger Eingabe
      newInputField.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Verhindere Standard-Verhalten
          verifyMathCaptcha();
        }
      });
    }
  }, 100);
}

function verifyMathCaptcha() {
  const inputElement = document.getElementById("captchaInput");
  const userInput = inputElement.value.trim();
  const errorDiv = document.getElementById("captchaError");

  // Prüfe auf leere Eingabe
  if (userInput === "") {
    errorDiv.textContent = "Feld darf nicht leer sein!";
    errorDiv.classList.remove("hidden");
    return;
  }

  // Prüfe auf gültige Zahl
  const userAnswer = parseInt(userInput);
  if (isNaN(userAnswer)) {
    errorDiv.textContent = "Bitte geben Sie eine gültige Zahl ein!";
    errorDiv.classList.remove("hidden");
    return;
  }

  if (userAnswer === captchaAnswer) {
    // Erfolgreich gelöst - Reset Fehlerzähler
    captchaFailureCount = 0;
    hideCaptcha();
    window.location.href = "profil-page.html";
  } else {
    captchaFailureCount++;
    errorDiv.textContent = "Falsche Antwort! Bitte versuchen Sie es erneut.";
    errorDiv.classList.remove("hidden");

    if (captchaFailureCount >= 3) {
      // 3x Fehler - Cooldown aktivieren
      activateCooldown();
    } else {
      generateMathCaptcha();
      inputElement.value = "";
    }
  }
}

async function generateImageCaptcha() {
  const categories = Object.keys(imageDatabase);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const categoryImages = imageDatabase[randomCategory];

  // Mische die Bilder und wähle 10 zufällige aus der Zielkategorie
  const shuffledImages = [...categoryImages].sort(() => Math.random() - 0.5);
  const selectedImages = shuffledImages.slice(0, 10);

  // Füge 6 Störbilder aus anderen Kategorien hinzu (für 16 Bilder total)
  const otherCategories = categories.filter((cat) => cat !== randomCategory);
  const disturbanceImages = [];

  // Verteile Störbilder auf andere Kategorien
  otherCategories.forEach((category) => {
    const categoryImages = imageDatabase[category];
    const shuffled = [...categoryImages].sort(() => Math.random() - 0.5);
    disturbanceImages.push(...shuffled.slice(0, 2));
  });

  // Falls nicht genug Störbilder, wiederhole aus anderen Kategorien
  while (disturbanceImages.length < 6) {
    const randomCategory =
      otherCategories[Math.floor(Math.random() * otherCategories.length)];
    const categoryImages = imageDatabase[randomCategory];
    const shuffled = [...categoryImages].sort(() => Math.random() - 0.5);
    disturbanceImages.push(...shuffled.slice(0, 1));
  }

  const finalDisturbanceImages = disturbanceImages.slice(0, 6);

  const allImages = [...selectedImages, ...finalDisturbanceImages].sort(
    () => Math.random() - 0.5
  );

  captchaData.correctAnswers = selectedImages.map((img) => img.src);
  captchaData.selectedImages = [];

  // Preload Bilder mit 1.5s Timeout - ALLE 16 Slots haben garantiert Bilder
  try {
    console.log("Starte Bild-Preloading mit", allImages.length, "Bildern");
    const preloadPromise = preloadImages(allImages);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Preload timeout")), 1500)
    );

    preloadedImages = await Promise.race([preloadPromise, timeoutPromise]);
    console.log(
      "Preloading erfolgreich:",
      preloadedImages.length,
      "Bilder geladen"
    );

    // Prüfe ob alle 16 Slots Bilder haben (inklusive Fallback-Bilder)
    if (preloadedImages.length !== 16) {
      throw new Error(
        `Nicht alle Bild-Slots gefüllt: ${preloadedImages.length}/16`
      );
    }

    // Zeige Bild-CAPTCHA (Frage wird dort gesetzt)
    showImageCaptcha(randomCategory);
  } catch (error) {
    console.log("Preloading fehlgeschlagen:", error.message);
    // Fallback zu mathematischem CAPTCHA
    switchToMathCaptcha();
  }
}

function showImageCaptcha(randomCategory) {
  // Verstecke Loading-Indikator
  document.getElementById("captchaLoading").classList.add("hidden");

  // Setze die Frage für Bild-CAPTCHA
  document.getElementById(
    "captchaQuestion"
  ).textContent = `Klicken Sie auf alle Bilder mit ${categoryNames[randomCategory]}:`;

  // Zeige CAPTCHA-Challenge
  document.getElementById("captchaChallenge").classList.remove("hidden");

  // Rendere die bereits geladenen Bilder
  renderPreloadedImages();

  // Setze Event Listeners NACH dem Rendern
  setupCaptchaEventListeners();
}

function renderPreloadedImages() {
  const container = document.getElementById("captchaImages");
  container.innerHTML = "";

  preloadedImages.forEach((imageData, index) => {
    const imgElement = document.createElement("img");
    imgElement.className = "captcha-image";
    imgElement.dataset.index = index;
    imgElement.dataset.src = imageData.src;
    imgElement.dataset.alt = imageData.alt;

    // Verwende das bereits geladene Bild-Element oder Fallback-Bild
    imgElement.src = imageData.src || imageData.element.src;
    imgElement.dataset.src = imageData.src || imageData.element.src; // WICHTIG: Konsistente Quelle für Verifikation
    imgElement.alt = imageData.alt;

    imgElement.addEventListener("click", function () {
      toggleImageSelection(this);
    });

    container.appendChild(imgElement);
  });
}

function toggleImageSelection(imgElement) {
  const imageSrc = imgElement.dataset.src;
  const isSelected = captchaData.selectedImages.includes(imageSrc);

  if (isSelected) {
    // Entferne aus Auswahl
    captchaData.selectedImages = captchaData.selectedImages.filter(
      (src) => src !== imageSrc
    );
    imgElement.classList.remove("selected");
  } else {
    // Füge zur Auswahl hinzu
    captchaData.selectedImages.push(imageSrc);
    imgElement.classList.add("selected");
  }
}

function showCaptcha() {
  const modal = document.getElementById("captchaModal");
  modal.classList.remove("hidden");

  // Vollständiger Reset aller CAPTCHA-Zustände
  resetCaptchaState();

  // Zeige Loading-Indikator
  document.getElementById("captchaLoading").classList.remove("hidden");
  document.getElementById("captchaChallenge").classList.add("hidden");
  document.getElementById("captchaError").classList.add("hidden");

  // Starte Preloading
  generateImageCaptcha();

  // Event Listeners werden in showImageCaptcha() gesetzt, nicht hier
}

// Reset-Funktion für CAPTCHA-Zustände
function resetCaptchaState() {
  // Reset CAPTCHA-Daten
  captchaData.correctAnswers = [];
  captchaData.selectedImages = [];
  preloadedImages = [];

  // Verstecke alle CAPTCHA-Elemente
  document.getElementById("captchaLoading").classList.add("hidden");
  document.getElementById("captchaChallenge").classList.add("hidden");
  document.getElementById("captchaError").classList.add("hidden");

  // Stelle sicher, dass der Images-Container existiert und leer ist
  const imagesContainer = document.getElementById("captchaImages");
  if (imagesContainer) {
    imagesContainer.innerHTML = "";
  } else {
    // Falls der Images-Container nicht existiert (z.B. nach switchToMathCaptcha), erstelle ihn neu
    const challengeDiv = document.getElementById("captchaChallenge");
    const answerContainer = document.querySelector(".captcha-answer");

    if (answerContainer) {
      // Erstelle neuen Images-Container
      const newImagesContainer = document.createElement("div");
      newImagesContainer.className = "captcha-images";
      newImagesContainer.id = "captchaImages";

      // Ersetze das Eingabefeld mit dem Images-Container
      answerContainer.parentNode.replaceChild(
        newImagesContainer,
        answerContainer
      );
    }
  }

  // Reset Actions-Container auf Standard-Bild-CAPTCHA
  const actionsContainer = document.querySelector(".captcha-actions");
  if (actionsContainer) {
    actionsContainer.innerHTML = `
      <button id="captchaSubmit" class="btn btn-captcha">Verifizieren</button>
      <button id="captchaRefresh" class="btn btn-captcha-refresh">🔄 Neue Aufgabe</button>
    `;
  }

  // Entferne alle Event Listener von Input-Feldern (falls vorhanden)
  const inputField = document.getElementById("captchaInput");
  if (inputField) {
    const newInputField = inputField.cloneNode(true);
    inputField.parentNode.replaceChild(newInputField, inputField);
  }
}

function hideCaptcha() {
  const modal = document.getElementById("captchaModal");
  modal.classList.add("hidden");

  // Reset CAPTCHA-Zustände beim Schließen
  resetCaptchaState();
}

function verifyCaptcha() {
  const errorDiv = document.getElementById("captchaError");

  // Prüfe ob überhaupt Bilder ausgewählt wurden
  if (captchaData.selectedImages.length === 0) {
    errorDiv.textContent = "Bitte wählen Sie mindestens ein Bild aus!";
    errorDiv.classList.remove("hidden");
    return;
  }

  // Prüfe ob alle korrekten Bilder ausgewählt wurden
  const correctSelected = captchaData.correctAnswers.every((src) =>
    captchaData.selectedImages.includes(src)
  );

  // Prüfe ob keine falschen Bilder ausgewählt wurden
  const noWrongSelected = captchaData.selectedImages.every((src) =>
    captchaData.correctAnswers.includes(src)
  );

  if (correctSelected && noWrongSelected) {
    // Erfolgreich gelöst - Reset Fehlerzähler
    captchaFailureCount = 0;
    hideCaptcha();
    window.location.href = "profil-page.html";
  } else {
    captchaFailureCount++;

    // Spezifische Fehlermeldungen
    if (!correctSelected && !noWrongSelected) {
      errorDiv.textContent =
        "Falsche Auswahl! Bitte wählen Sie nur die richtigen Bilder aus.";
    } else if (!correctSelected) {
      errorDiv.textContent =
        "Sie haben nicht alle richtigen Bilder ausgewählt!";
    } else if (!noWrongSelected) {
      errorDiv.textContent = "Sie haben falsche Bilder ausgewählt!";
    }

    errorDiv.classList.remove("hidden");

    if (captchaFailureCount >= 3) {
      // 3x Fehler - Cooldown aktivieren
      activateCooldown();
    } else {
      // Markiere falsche Auswahlen
      document.querySelectorAll(".captcha-image").forEach((img) => {
        const src = img.dataset.src;
        if (
          captchaData.selectedImages.includes(src) &&
          !captchaData.correctAnswers.includes(src)
        ) {
          img.classList.add("wrong");
          setTimeout(() => img.classList.remove("wrong"), 2000);
        }
      });

      setTimeout(() => {
        generateImageCaptcha();
      }, 2000);
    }
  }
}

// Cooldown-Funktionen
function activateCooldown() {
  isInCooldown = true;
  hideCaptcha();

  // Button grau machen und deaktivieren
  const contactBtn = document.querySelector(".btn-contact");
  contactBtn.style.backgroundColor = "#78716c";
  contactBtn.style.cursor = "not-allowed";
  contactBtn.disabled = true;

  // Countdown starten
  let countdown = 10;
  contactBtn.textContent = `Warten... ${countdown}s`;

  cooldownTimer = setInterval(() => {
    countdown--;
    contactBtn.textContent = `Warten... ${countdown}s`;

    if (countdown <= 0) {
      clearInterval(cooldownTimer);
      resetCooldown();
    }
  }, 1000);
}

function resetCooldown() {
  isInCooldown = false;
  captchaFailureCount = 0;

  // Button wieder aktivieren
  const contactBtn = document.querySelector(".btn-contact");
  contactBtn.style.backgroundColor = "";
  contactBtn.style.cursor = "";
  contactBtn.disabled = false;
  contactBtn.textContent = "Mein Kontakt";
}

//Contact button functionality
contactBtn.addEventListener("click", function () {
  if (!isInCooldown) {
    showCaptcha();
  }
});

// CAPTCHA event listeners - werden dynamisch gesetzt
function setupCaptchaEventListeners() {
  const submitBtn = document.getElementById("captchaSubmit");
  const refreshBtn = document.getElementById("captchaRefresh");

  if (submitBtn && refreshBtn) {
    // Entferne alte Event Listeners durch Clone
    const newSubmitBtn = submitBtn.cloneNode(true);
    const newRefreshBtn = refreshBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    refreshBtn.parentNode.replaceChild(newRefreshBtn, refreshBtn);

    // Setze neue Event Listeners für Bild-CAPTCHA
    newSubmitBtn.addEventListener("click", verifyCaptcha);
    newRefreshBtn.addEventListener("click", generateImageCaptcha);
  }
}

// Close CAPTCHA button
document.getElementById("captchaClose").addEventListener("click", hideCaptcha);

// Close CAPTCHA when clicking outside
document.getElementById("captchaModal").addEventListener("click", function (e) {
  if (e.target === this) {
    hideCaptcha();
  }
});

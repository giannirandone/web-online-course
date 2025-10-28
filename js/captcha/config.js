// CAPTCHA Configuration
export const CAPTCHA_CONFIG = {
  // Timeouts and thresholds
  IMAGE_PRELOAD_TIMEOUT: 1500,
  MAX_FAILURES: 3,
  COOLDOWN_DURATION: 10, // seconds

  // Image selection
  TARGET_IMAGES_COUNT: 10,
  DISTURBANCE_IMAGES_COUNT: 6,
  TOTAL_IMAGES_COUNT: 16,

  // Math generation
  MATH_BRACKET_PROBABILITY: 0.6,
  MATH_NUMBER_RANGE: { min: 1, max: 10 },

  // UI delays
  ERROR_DISPLAY_DURATION: 2000,
  EVENT_LISTENER_DELAY: 100,
};

// Error messages
export const ERROR_MESSAGES = {
  EMPTY_INPUT: "Feld darf nicht leer sein!",
  INVALID_NUMBER: "Bitte geben Sie eine gültige Zahl ein!",
  WRONG_ANSWER: "Falsche Antwort! Bitte versuchen Sie es erneut.",
  NO_IMAGES_SELECTED: "Bitte wählen Sie mindestens ein Bild aus!",
  NOT_ALL_CORRECT: "Sie haben nicht alle richtigen Bilder ausgewählt!",
  WRONG_IMAGES: "Sie haben falsche Bilder ausgewählt!",
  MIXED_ERRORS:
    "Falsche Auswahl! Bitte wählen Sie nur die richtigen Bilder aus.",
  PRELOAD_TIMEOUT: "Preload timeout",
  INSUFFICIENT_IMAGES: "Nicht alle Bild-Slots gefüllt",
};

// Category names for CAPTCHA questions
export const categoryNames = {
  animals: "Tiere",
  vehicles: "Fahrzeuge",
  food: "Essen",
};

// Image database with various categories
export const imageDatabase = {
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

// Fallback image for failed loads
export const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzg3MTZjIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTgyOTllIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CSUxEPC90ZXh0Pgo8L3N2Zz4K";

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

//Contact button functionality
contactBtn.addEventListener("click", function () {
  window.location.href = "profil-page.html";
});

/*

let voteInteresting = 23;
let votesMindblowing = 5;
const text = "lisbon is the capital of Portugal";

voteInteresting = voteInteresting + 1;
voteInteresting++;
console.log(voteInteresting);

let totalUpvotes = voteInteresting + votesMindblowing;
console.log("Upvotes: ", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse < totalUpvotes;
console.log(isCorrect);

console.log(parseInt("24.533ccc"));
*/
/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  //return currentYear - year;
  return age < 0
    ? `Yor're not in the future bre... Year need to be less or equal ${currentYear}.`
    : age;
}

const age1 = calcFactAge(2015);
console.log(age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Yor're not in the future bre... Year need to be less or equal ${new Date().getFullYear()}.`;

console.log(calcFactAge2(2015));
console.log(calcFactAge2(2037));
*/
/*
let voteInteresting = 20;
let votesMindblowing = 5;

if (voteInteresting === votesMindblowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (voteInteresting > votesMindblowing) {
  console.log("Interesting fact!");
} else if (voteInteresting < votesMindblowing) {
  console.log("Mindblowing fact!!");
}

// falsy values: o, "", null, undefined

if (votesMindblowing) {
  console.log("MINDBLOWING FACT!!!");
} else {
  console.log("Not so special...");
}

let votesFalse = 7;
const totalUpvotes = voteInteresting + votesMindblowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";

//alert(message);

const text = "lisbon is the capital of Portugal";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is  ${calcFactAge(
  2015
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct." : "not true."
}`;
console.log(str);
*/

/*
const fact = ["Lisbon is the capital of Portugal", 2015, true, "something"];
console.log(fact[0]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [text, createdIn] = fact;
const newFact = [...fact, "society"];
console.log(newFact);

/*[2, 4, 6, 8].forEach(function (el) {
  console.log(el);
});*/

/*const times10 = [2, 4, 6, 8].map(function (el) {
  return el * 10;
});*/
/*
const times10 = [2, 4, 6, 8].map((el) => el * 10);
console.log(times10);

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

console.log(CATEGORIES.map((el) => el.name));
console.log(CATEGORIES.map((el) => el.color));

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

const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `You're not in the future bre... Year need to be less or equal ${new Date().getFullYear()}.`;

console.log(initialFacts.map((el) => calcFactAge2(el.createdIn)));

*/

/*
const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category "${this.category.toUpperCase()}"`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());
*/

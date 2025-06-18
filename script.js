console.log("Hello World");

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
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

const fact = ["Lisbon is the capital of Portugal", 2015, true, "something"];
console.log(fact);
console.log(fact[0]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [text, createdIn] = fact;
console.log(text, createdIn);

const newFact = [...fact, "society"];
console.log(newFact);

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

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

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  //return currentYear - year;
  return age < 0 ? "Yor're not in the future bre" : age;
}

const age1 = calcFactAge(2015);
console.log(age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

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

let votesFalse = 77;
const totalUpvotes = voteInteresting + votesMindblowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";

//alert(message);

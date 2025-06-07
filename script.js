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

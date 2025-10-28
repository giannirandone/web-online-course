// Facts Management
import { initialFacts, CATEGORIES, SUPABASE_CONFIG } from "./facts-config.js";

export class FactsManager {
  constructor() {
    this.factsList = document.querySelector(".facts-list");
    this.form = document.querySelector(".fact-form");
    this.btn = document.querySelector(".btn-open");
  }

  async initialize() {
    if (this.factsList) {
      this.factsList.innerHTML = "";
    }

    await this.loadFacts();
    this.setupFormToggle();
  }

  async loadFacts() {
    try {
      const res = await fetch(SUPABASE_CONFIG.url, {
        headers: SUPABASE_CONFIG.headers,
      });
      const data = await res.json();
      console.log("Facts loaded:", res);

      // Use loaded data if available, otherwise use initial facts
      const factsToDisplay = data && data.length > 0 ? data : initialFacts;
      this.createFactsList(factsToDisplay);
    } catch (error) {
      console.log(
        "Failed to load facts from Supabase, using initial facts:",
        error
      );
      this.createFactsList(initialFacts);
    }
  }

  createFactsList(dataArray) {
    if (!this.factsList) return;

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

    const html = htmlArr.join("");
    this.factsList.insertAdjacentHTML("afterbegin", html);
  }

  setupFormToggle() {
    if (!this.btn || !this.form) return;

    this.btn.addEventListener("click", () => {
      if (this.form.classList.contains("hidden")) {
        this.form.classList.remove("hidden");
        this.btn.textContent = "Close";
      } else {
        this.form.classList.add("hidden");
        this.btn.textContent = "Share a fact";
      }
    });
  }

  getCategories() {
    return CATEGORIES;
  }

  getInitialFacts() {
    return initialFacts;
  }
}

// Main Application Entry Point
import { CaptchaController } from "./captcha/captcha-controller.js";
import { FactsManager } from "./facts/facts-manager.js";

class App {
  constructor() {
    this.captchaController = new CaptchaController();
    this.factsManager = new FactsManager();
  }

  async initialize() {
    try {
      // Initialize facts management
      await this.factsManager.initialize();

      // Initialize CAPTCHA system
      await this.captchaController.initialize();

      // Set up contact button
      this.setupContactButton();

      console.log("App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize app:", error);
    }
  }

  setupContactButton() {
    const contactBtn = document.querySelector(".btn-contact");
    if (contactBtn) {
      contactBtn.addEventListener("click", () => {
        this.captchaController.show();
      });
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const app = new App();
  await app.initialize();
});

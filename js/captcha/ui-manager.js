// CAPTCHA UI Management with AbortController
import { CAPTCHA_CONFIG, ERROR_MESSAGES } from "./config.js";

export class CaptchaUI {
  constructor() {
    this.abortController = null;
    this.elements = {
      modal: null,
      loading: null,
      challenge: null,
      question: null,
      images: null,
      actions: null,
      error: null,
      close: null,
    };

    this.initializeElements();
  }

  initializeElements() {
    this.elements.modal = document.getElementById("captchaModal");
    this.elements.loading = document.getElementById("captchaLoading");
    this.elements.challenge = document.getElementById("captchaChallenge");
    this.elements.question = document.getElementById("captchaQuestion");
    this.elements.images = document.getElementById("captchaImages");
    this.elements.actions = document.querySelector(".captcha-actions");
    this.elements.error = document.getElementById("captchaError");
    this.elements.close = document.getElementById("captchaClose");
  }

  show() {
    this.elements.modal.classList.remove("hidden");
  }

  hide() {
    this.elements.modal.classList.add("hidden");
  }

  showLoading() {
    this.elements.loading.classList.remove("hidden");
    this.elements.challenge.classList.add("hidden");
    this.elements.error.classList.add("hidden");
  }

  hideLoading() {
    this.elements.loading.classList.add("hidden");
  }

  showChallenge() {
    this.elements.challenge.classList.remove("hidden");
  }

  hideChallenge() {
    this.elements.challenge.classList.add("hidden");
  }

  showError(message) {
    this.elements.error.textContent = message;
    this.elements.error.classList.remove("hidden");
  }

  clearError() {
    this.elements.error.classList.add("hidden");
  }

  setQuestion(text) {
    if (this.elements.question) {
      this.elements.question.textContent = text;
    }
  }

  renderImages(preloadedImages, onImageClick) {
    if (!this.elements.images) return;

    this.elements.images.innerHTML = "";

    preloadedImages.forEach((imageData, index) => {
      const imgElement = document.createElement("img");
      imgElement.className = "captcha-image";
      imgElement.dataset.index = index;
      imgElement.dataset.src = imageData.src || imageData.element.src;
      imgElement.dataset.alt = imageData.alt;
      imgElement.src = imageData.src || imageData.element.src;
      imgElement.alt = imageData.alt;

      imgElement.addEventListener("click", onImageClick);
      this.elements.images.appendChild(imgElement);
    });
  }

  renderMathInput() {
    if (!this.elements.images) return;

    // Create input container
    const answerContainer = document.createElement("div");
    answerContainer.className = "captcha-answer";
    answerContainer.innerHTML = `
      <input type="number" id="captchaInput" placeholder="Ihre Antwort" />
    `;

    // Replace images with input field
    this.elements.images.parentNode.replaceChild(
      answerContainer,
      this.elements.images
    );
  }

  updateActions(type = "image") {
    if (!this.elements.actions) return;

    if (type === "image") {
      this.elements.actions.innerHTML = `
        <button id="captchaSubmit" class="btn btn-captcha">Verifizieren</button>
        <button id="captchaRefresh" class="btn btn-captcha-refresh">🔄 Neue Aufgabe</button>
      `;
    } else if (type === "math") {
      this.elements.actions.innerHTML = `
        <button id="captchaSubmit" class="btn btn-captcha">Verifizieren</button>
        <button id="captchaRefresh" class="btn btn-captcha-refresh">🔄 Neue Aufgabe</button>
      `;
    }
  }

  restoreImagesContainer() {
    const answerContainer = document.querySelector(".captcha-answer");
    if (answerContainer) {
      // Create new images container
      const newImagesContainer = document.createElement("div");
      newImagesContainer.className = "captcha-images";
      newImagesContainer.id = "captchaImages";

      // Replace input field with images container
      answerContainer.parentNode.replaceChild(
        newImagesContainer,
        answerContainer
      );

      // Update reference
      this.elements.images = newImagesContainer;
    }
  }

  clearImages() {
    if (this.elements.images) {
      this.elements.images.innerHTML = "";
    }
  }

  markImageAsSelected(imgElement) {
    imgElement.classList.add("selected");
  }

  markImageAsUnselected(imgElement) {
    imgElement.classList.remove("selected");
  }

  markImageAsWrong(imgElement) {
    imgElement.classList.add("wrong");
    setTimeout(
      () => imgElement.classList.remove("wrong"),
      CAPTCHA_CONFIG.ERROR_DISPLAY_DURATION
    );
  }

  clearInput() {
    const inputField = document.getElementById("captchaInput");
    if (inputField) {
      inputField.value = "";
    }
  }

  getInputValue() {
    const inputField = document.getElementById("captchaInput");
    return inputField ? inputField.value.trim() : "";
  }

  setupEventListeners(handlers) {
    // Clean up existing listeners
    this.cleanupEventListeners();

    // Create new abort controller
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    // Set up event listeners with abort signal
    if (this.elements.close) {
      this.elements.close.addEventListener("click", handlers.onClose, {
        signal,
      });
    }

    if (this.elements.modal) {
      this.elements.modal.addEventListener("click", handlers.onModalClick, {
        signal,
      });
    }

    // Set up dynamic event listeners after a short delay
    setTimeout(() => {
      this.setupDynamicEventListeners(handlers, signal);
    }, CAPTCHA_CONFIG.EVENT_LISTENER_DELAY);
  }

  setupDynamicEventListeners(handlers, signal) {
    const submitBtn = document.getElementById("captchaSubmit");
    const refreshBtn = document.getElementById("captchaRefresh");
    const inputField = document.getElementById("captchaInput");

    if (submitBtn) {
      submitBtn.addEventListener("click", handlers.onSubmit, { signal });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", handlers.onRefresh, { signal });
    }

    if (inputField) {
      inputField.addEventListener("keypress", handlers.onKeyPress, { signal });
    }
  }

  cleanupEventListeners() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  updateButtonState(isInCooldown, countdown = 0) {
    const contactBtn = document.querySelector(".btn-contact");
    if (!contactBtn) return;

    if (isInCooldown) {
      contactBtn.style.backgroundColor = "#78716c";
      contactBtn.style.cursor = "not-allowed";
      contactBtn.disabled = true;
      contactBtn.textContent = `Warten... ${countdown}s`;
    } else {
      contactBtn.style.backgroundColor = "";
      contactBtn.style.cursor = "";
      contactBtn.disabled = false;
      contactBtn.textContent = "Mein Kontakt";
    }
  }

  reset() {
    this.hide();
    this.hideLoading();
    this.hideChallenge();
    this.clearError();
    this.clearImages();
    this.updateActions("image");
    this.restoreImagesContainer();
    this.cleanupEventListeners();
  }
}

// CAPTCHA Controller - Main orchestrator
import { CaptchaState } from "./state-manager.js";
import { MathGenerator } from "./math-generator.js";
import { ImageCaptcha } from "./image-captcha.js";
import { CaptchaUI } from "./ui-manager.js";
import { CAPTCHA_CONFIG, ERROR_MESSAGES } from "./config.js";

export class CaptchaController {
  constructor() {
    this.state = new CaptchaState();
    this.mathGenerator = new MathGenerator();
    this.imageCaptcha = new ImageCaptcha();
    this.ui = new CaptchaUI();

    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    this.setupEventHandlers();
    this.isInitialized = true;
  }

  setupEventHandlers() {
    const handlers = {
      onClose: () => this.hide(),
      onModalClick: (e) => {
        if (e.target === this.ui.elements.modal) {
          this.hide();
        }
      },
      onSubmit: () => this.handleSubmit(),
      onRefresh: () => this.handleRefresh(),
      onKeyPress: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSubmit();
        }
      },
    };

    this.ui.setupEventListeners(handlers);
  }

  async show() {
    if (this.state.isInCooldownState()) {
      return;
    }

    this.state.reset();
    this.ui.show();
    this.ui.showLoading();
    this.ui.clearError();

    try {
      await this.generateImageCaptcha();
    } catch (error) {
      console.log("Image CAPTCHA failed, switching to math:", error.message);
      this.switchToMathCaptcha();
    }
  }

  hide() {
    this.ui.hide();
    this.state.reset();
  }

  async generateImageCaptcha() {
    const captchaData = await this.imageCaptcha.generate();

    this.state.setCorrectAnswers(captchaData.correctAnswers);
    this.state.setSelectedImages([]);

    const preloadedImages = await this.imageCaptcha.preloadWithTimeout(
      captchaData.allImages
    );
    this.state.setPreloadedImages(preloadedImages);

    this.showImageCaptcha(captchaData.category);
  }

  showImageCaptcha(category) {
    this.ui.hideLoading();
    this.ui.showChallenge();
    this.ui.setQuestion(this.imageCaptcha.getQuestionText(category));
    this.ui.renderImages(this.state.preloadedImages, (e) =>
      this.toggleImageSelection(e.target)
    );
    this.ui.updateActions("image");
  }

  toggleImageSelection(imgElement) {
    const imageSrc = imgElement.dataset.src;
    const isSelected = this.state.selectedImages.includes(imageSrc);

    if (isSelected) {
      this.state.removeSelectedImage(imageSrc);
      this.ui.markImageAsUnselected(imgElement);
    } else {
      this.state.addSelectedImage(imageSrc);
      this.ui.markImageAsSelected(imgElement);
    }
  }

  switchToMathCaptcha() {
    console.log("Wechsle zu mathematischem CAPTCHA");

    this.ui.hideLoading();
    this.ui.renderMathInput();
    this.ui.updateActions("math");
    this.ui.showChallenge();

    const mathResult = this.mathGenerator.generateRandomQuestion();
    this.state.setCurrentAnswer(mathResult.answer);
    this.ui.setQuestion(mathResult.question);
  }

  handleSubmit() {
    if (this.isImageCaptchaMode()) {
      this.verifyImageCaptcha();
    } else {
      this.verifyMathCaptcha();
    }
  }

  handleRefresh() {
    if (this.isImageCaptchaMode()) {
      this.generateImageCaptcha();
    } else {
      this.switchToMathCaptcha();
    }
  }

  isImageCaptchaMode() {
    return this.state.preloadedImages.length > 0;
  }

  verifyImageCaptcha() {
    const verification = this.imageCaptcha.verifySelection(
      this.state.selectedImages,
      this.state.correctAnswers
    );

    if (verification.isValid) {
      this.handleSuccess();
    } else {
      this.handleImageCaptchaFailure(verification.message);
    }
  }

  verifyMathCaptcha() {
    const userInput = this.ui.getInputValue();
    const errorDiv = this.ui.elements.error;

    // Check for empty input
    if (userInput === "") {
      this.ui.showError(ERROR_MESSAGES.EMPTY_INPUT);
      return;
    }

    // Check for valid number
    const userAnswer = parseInt(userInput);
    if (isNaN(userAnswer)) {
      this.ui.showError(ERROR_MESSAGES.INVALID_NUMBER);
      return;
    }

    if (userAnswer === this.state.getCurrentAnswer()) {
      this.handleSuccess();
    } else {
      this.handleMathCaptchaFailure();
    }
  }

  handleSuccess() {
    this.state.resetFailures();
    this.hide();
    window.location.href = "profil-page.html";
  }

  handleImageCaptchaFailure(message) {
    this.state.incrementFailures();
    this.ui.showError(message);

    if (this.state.isMaxFailuresReached(CAPTCHA_CONFIG.MAX_FAILURES)) {
      this.activateCooldown();
    } else {
      // Mark wrong selections
      this.markWrongSelections();

      setTimeout(() => {
        this.generateImageCaptcha();
      }, CAPTCHA_CONFIG.ERROR_DISPLAY_DURATION);
    }
  }

  handleMathCaptchaFailure() {
    this.state.incrementFailures();
    this.ui.showError(ERROR_MESSAGES.WRONG_ANSWER);

    if (this.state.isMaxFailuresReached(CAPTCHA_CONFIG.MAX_FAILURES)) {
      this.activateCooldown();
    } else {
      this.switchToMathCaptcha();
      this.ui.clearInput();
    }
  }

  markWrongSelections() {
    document.querySelectorAll(".captcha-image").forEach((img) => {
      const src = img.dataset.src;
      if (
        this.state.selectedImages.includes(src) &&
        !this.state.correctAnswers.includes(src)
      ) {
        this.ui.markImageAsWrong(img);
      }
    });
  }

  activateCooldown() {
    this.state.startCooldown();
    this.hide();

    // Start countdown
    let countdown = CAPTCHA_CONFIG.COOLDOWN_DURATION;
    this.ui.updateButtonState(true, countdown);

    const timer = setInterval(() => {
      countdown--;
      this.ui.updateButtonState(true, countdown);

      if (countdown <= 0) {
        clearInterval(timer);
        this.resetCooldown();
      }
    }, 1000);

    this.state.setCooldownTimer(timer);
  }

  resetCooldown() {
    this.state.stopCooldown();
    this.ui.updateButtonState(false);
  }
}

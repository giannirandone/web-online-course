// CAPTCHA State Management
export class CaptchaState {
  constructor() {
    this.reset();
  }

  reset() {
    this.correctAnswers = [];
    this.selectedImages = [];
    this.preloadedImages = [];
    this.failureCount = 0;
    this.isInCooldown = false;
    this.cooldownTimer = null;
    this.currentAnswer = 0;
  }

  incrementFailures() {
    this.failureCount++;
    return this.failureCount;
  }

  resetFailures() {
    this.failureCount = 0;
  }

  startCooldown() {
    this.isInCooldown = true;
  }

  stopCooldown() {
    this.isInCooldown = false;
    this.failureCount = 0;
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }

  setCooldownTimer(timer) {
    this.cooldownTimer = timer;
  }

  setCorrectAnswers(answers) {
    this.correctAnswers = [...answers];
  }

  setSelectedImages(images) {
    this.selectedImages = [...images];
  }

  addSelectedImage(imageSrc) {
    if (!this.selectedImages.includes(imageSrc)) {
      this.selectedImages.push(imageSrc);
    }
  }

  removeSelectedImage(imageSrc) {
    this.selectedImages = this.selectedImages.filter((src) => src !== imageSrc);
  }

  setPreloadedImages(images) {
    this.preloadedImages = [...images];
  }

  setCurrentAnswer(answer) {
    this.currentAnswer = answer;
  }

  getCurrentAnswer() {
    return this.currentAnswer;
  }

  isMaxFailuresReached(maxFailures) {
    return this.failureCount >= maxFailures;
  }

  isInCooldownState() {
    return this.isInCooldown;
  }
}

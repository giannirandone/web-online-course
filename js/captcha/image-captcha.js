// Image CAPTCHA Logic
import {
  imageDatabase,
  categoryNames,
  CAPTCHA_CONFIG,
  FALLBACK_IMAGE,
} from "./config.js";

export class ImageCaptcha {
  constructor() {
    this.categories = Object.keys(imageDatabase);
  }

  async generate() {
    const randomCategory = this.selectRandomCategory();
    const selectedImages = this.selectTargetImages(randomCategory);
    const disturbanceImages = this.selectDisturbanceImages(randomCategory);
    const allImages = this.shuffleImages([
      ...selectedImages,
      ...disturbanceImages,
    ]);

    return {
      category: randomCategory,
      correctAnswers: selectedImages.map((img) => img.src),
      allImages,
    };
  }

  selectRandomCategory() {
    return this.categories[Math.floor(Math.random() * this.categories.length)];
  }

  selectTargetImages(category) {
    const categoryImages = imageDatabase[category];
    const shuffledImages = [...categoryImages].sort(() => Math.random() - 0.5);
    return shuffledImages.slice(0, CAPTCHA_CONFIG.TARGET_IMAGES_COUNT);
  }

  selectDisturbanceImages(targetCategory) {
    const otherCategories = this.categories.filter(
      (cat) => cat !== targetCategory
    );
    const disturbanceImages = [];

    // Distribute disturbance images across other categories
    otherCategories.forEach((category) => {
      const categoryImages = imageDatabase[category];
      const shuffled = [...categoryImages].sort(() => Math.random() - 0.5);
      disturbanceImages.push(...shuffled.slice(0, 2));
    });

    // Fill remaining slots if needed
    while (disturbanceImages.length < CAPTCHA_CONFIG.DISTURBANCE_IMAGES_COUNT) {
      const randomCategory =
        otherCategories[Math.floor(Math.random() * otherCategories.length)];
      const categoryImages = imageDatabase[randomCategory];
      const shuffled = [...categoryImages].sort(() => Math.random() - 0.5);
      disturbanceImages.push(...shuffled.slice(0, 1));
    }

    return disturbanceImages.slice(0, CAPTCHA_CONFIG.DISTURBANCE_IMAGES_COUNT);
  }

  shuffleImages(images) {
    return [...images].sort(() => Math.random() - 0.5);
  }

  async preloadImages(images) {
    return new Promise((resolve, reject) => {
      let loadedCount = 0;
      const totalImages = images.length;
      const loadedImages = [];

      if (totalImages === 0) {
        resolve([]);
        return;
      }

      images.forEach((imageData, index) => {
        const img = new Image();

        img.onload = function () {
          loadedImages[index] = {
            ...imageData,
            element: img,
          };
          loadedCount++;

          if (loadedCount === totalImages) {
            resolve(loadedImages);
          }
        };

        img.onerror = function () {
          console.log("Bild konnte nicht geladen werden:", imageData.src);
          // Use fallback image
          loadedImages[index] = {
            ...imageData,
            element: img,
            src: FALLBACK_IMAGE,
            alt: "Bild nicht verfügbar",
          };
          loadedCount++;

          if (loadedCount === totalImages) {
            resolve(loadedImages);
          }
        };

        img.src = imageData.src;
      });
    });
  }

  async preloadWithTimeout(images) {
    try {
      console.log("Starte Bild-Preloading mit", images.length, "Bildern");
      const preloadPromise = this.preloadImages(images);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Preload timeout")),
          CAPTCHA_CONFIG.IMAGE_PRELOAD_TIMEOUT
        )
      );

      const preloadedImages = await Promise.race([
        preloadPromise,
        timeoutPromise,
      ]);
      console.log(
        "Preloading erfolgreich:",
        preloadedImages.length,
        "Bilder geladen"
      );

      // Check if all slots have images (including fallback images)
      if (preloadedImages.length !== CAPTCHA_CONFIG.TOTAL_IMAGES_COUNT) {
        throw new Error(
          `${CAPTCHA_CONFIG.INSUFFICIENT_IMAGES}: ${preloadedImages.length}/${CAPTCHA_CONFIG.TOTAL_IMAGES_COUNT}`
        );
      }

      return preloadedImages;
    } catch (error) {
      console.log("Preloading fehlgeschlagen:", error.message);
      throw error;
    }
  }

  verifySelection(selectedImages, correctAnswers) {
    // Check if any images were selected
    if (selectedImages.length === 0) {
      return {
        isValid: false,
        message: "Bitte wählen Sie mindestens ein Bild aus!",
      };
    }

    // Check if all correct images were selected
    const correctSelected = correctAnswers.every((src) =>
      selectedImages.includes(src)
    );

    // Check if no wrong images were selected
    const noWrongSelected = selectedImages.every((src) =>
      correctAnswers.includes(src)
    );

    if (correctSelected && noWrongSelected) {
      return { isValid: true, message: "" };
    } else {
      let message = "";
      if (!correctSelected && !noWrongSelected) {
        message =
          "Falsche Auswahl! Bitte wählen Sie nur die richtigen Bilder aus.";
      } else if (!correctSelected) {
        message = "Sie haben nicht alle richtigen Bilder ausgewählt!";
      } else if (!noWrongSelected) {
        message = "Sie haben falsche Bilder ausgewählt!";
      }
      return { isValid: false, message };
    }
  }

  getCategoryName(category) {
    return categoryNames[category];
  }

  getQuestionText(category) {
    return `Klicken Sie auf alle Bilder mit ${this.getCategoryName(category)}:`;
  }
}

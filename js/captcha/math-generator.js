// Math Question Generator - Simplified from 500+ lines to ~100 lines
import { CAPTCHA_CONFIG } from "./config.js";

export class MathGenerator {
  constructor() {
    this.operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
    };

    this.operationSymbols = {
      "+": "+",
      "-": "-",
      "*": "×",
    };
  }

  generateRandomQuestion() {
    const nums = this.generateRandomNumbers();
    const ops = this.generateRandomOperations();
    const useBrackets = Math.random() < CAPTCHA_CONFIG.MATH_BRACKET_PROBABILITY;

    if (useBrackets) {
      return this.generateBracketedQuestion(nums, ops);
    } else {
      return this.generateUnbracketedQuestion(nums, ops);
    }
  }

  generateRandomNumbers() {
    const { min, max } = CAPTCHA_CONFIG.MATH_NUMBER_RANGE;
    return [
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
    ];
  }

  generateRandomOperations() {
    const opKeys = Object.keys(this.operations);
    return [
      opKeys[Math.floor(Math.random() * opKeys.length)],
      opKeys[Math.floor(Math.random() * opKeys.length)],
    ];
  }

  generateBracketedQuestion(nums, ops) {
    const patterns = [
      () => this.createPattern(nums, ops, "bracket-first"),
      () => this.createPattern(nums, ops, "bracket-second"),
    ];

    const selectedPattern =
      patterns[Math.floor(Math.random() * patterns.length)];
    return selectedPattern();
  }

  generateUnbracketedQuestion(nums, ops) {
    const patterns = [
      () => this.createPattern(nums, ops, "standard"),
      () => this.createPattern(nums, ops, "reverse"),
      () => this.createPattern(nums, ops, "mixed"),
    ];

    const selectedPattern =
      patterns[Math.floor(Math.random() * patterns.length)];
    return selectedPattern();
  }

  createPattern(nums, ops, type) {
    const [num1, num2, num3] = nums;
    const [op1, op2] = ops;

    switch (type) {
      case "bracket-first":
        return this.createBracketFirstPattern(num1, num2, num3, op1, op2);
      case "bracket-second":
        return this.createBracketSecondPattern(num1, num2, num3, op1, op2);
      case "standard":
        return this.createStandardPattern(num1, num2, num3, op1, op2);
      case "reverse":
        return this.createReversePattern(num1, num2, num3, op1, op2);
      case "mixed":
        return this.createMixedPattern(num1, num2, num3, op1, op2);
      default:
        return this.createStandardPattern(num1, num2, num3, op1, op2);
    }
  }

  createBracketFirstPattern(num1, num2, num3, op1, op2) {
    const firstResult = this.calculateOperation(op1, num1, num2);
    const question = `(${num1} ${this.operationSymbols[op1]} ${num2}) ${this.operationSymbols[op2]} ${num3} = ?`;
    const answer = this.calculateOperation(op2, firstResult, num3);
    return { question, answer };
  }

  createBracketSecondPattern(num1, num2, num3, op1, op2) {
    const secondResult = this.calculateOperation(op2, num2, num3);
    const question = `${num1} ${this.operationSymbols[op1]} (${num2} ${this.operationSymbols[op2]} ${num3}) = ?`;
    const answer = this.calculateOperation(op1, num1, secondResult);
    return { question, answer };
  }

  createStandardPattern(num1, num2, num3, op1, op2) {
    const firstResult = this.calculateOperation(op1, num1, num2);
    const question = `${num1} ${this.operationSymbols[op1]} ${num2} ${this.operationSymbols[op2]} ${num3} = ?`;
    const answer = this.calculateOperation(op2, firstResult, num3);
    return { question, answer };
  }

  createReversePattern(num1, num2, num3, op1, op2) {
    const firstResult = this.calculateOperation(op1, num3, num1);
    const question = `${num3} ${this.operationSymbols[op1]} ${num1} ${this.operationSymbols[op2]} ${num2} = ?`;
    const answer = this.calculateOperation(op2, firstResult, num2);
    return { question, answer };
  }

  createMixedPattern(num1, num2, num3, op1, op2) {
    const firstResult = this.calculateOperation(op1, num2, num3);
    const question = `${num2} ${this.operationSymbols[op1]} ${num3} ${this.operationSymbols[op2]} ${num1} = ?`;
    const answer = this.calculateOperation(op2, firstResult, num1);
    return { question, answer };
  }

  calculateOperation(operation, a, b) {
    // Handle subtraction to ensure positive results
    if (operation === "-") {
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      return larger - smaller;
    }

    return this.operations[operation](a, b);
  }
}

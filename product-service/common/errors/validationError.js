export class ValidationError extends Error {
  constructor(message = "Validation failed") {
    super(message);
  }
}

export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  constructor() {
    super();
    // Because we extend built-in class:
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

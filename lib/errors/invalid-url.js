class InvalidUrl extends Error {
  constructor(message, data) {
    super();
    this.name = 'InvalidUrl';
    this.message = message;
    this.data = data;
    Error.captureStackTrace(this, InvalidUrl);
  }
}

exports.InvalidUrl = InvalidUrl;

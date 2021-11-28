class ValidationBodyError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ValidationBodyError';
    this.statusCode = statusCode;
    this.isUserError = true;
  };
};

class IdError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'IdError';
    this.isUserError = true;
  };
};

class UrlError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'UrlError';
    this.isUserError = true;
  };
};

class PersonError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'PersonError';
    this.isUserError = true;
  };
};

class MethodError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'MethodError';
    this.isUserError = true;
  };
};


export {
  ValidationBodyError,
  IdError,
  UrlError,
  PersonError,
  MethodError
};
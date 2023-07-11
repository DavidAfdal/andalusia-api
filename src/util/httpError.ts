class HttpError extends Error {
  public errorCode: number | undefined;
  constructor(message: string, code?: number) {
    super(message);
    this.errorCode = code;
  }
}

export default HttpError;

class HttpException extends Error {
  status: number;

  from: string | undefined;

  constructor(status: number, message: string, from?: string) {
    super(message);
    this.status = status;
    this.from = from;
  }
}

export default HttpException;

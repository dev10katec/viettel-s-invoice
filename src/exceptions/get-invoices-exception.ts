class GetInvoicesException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GetInvoicesException";
  }
}

export default GetInvoicesException;

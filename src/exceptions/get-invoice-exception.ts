class GetInvoiceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GetInvoiceException";
  }
}

export default GetInvoiceException;

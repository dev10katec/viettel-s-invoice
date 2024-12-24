class GetInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GetInvoiceException'
    this.message = message
  }
}

export default GetInvoiceException

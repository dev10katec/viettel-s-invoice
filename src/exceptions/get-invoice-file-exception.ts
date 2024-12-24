class GetInvoiceFileException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GetInvoiceFileException'
    this.message = message
  }
}

export default GetInvoiceFileException

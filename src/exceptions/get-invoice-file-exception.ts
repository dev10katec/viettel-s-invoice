class GetInvoiceFileException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GetInvoiceFileException'
  }
}

export default GetInvoiceFileException

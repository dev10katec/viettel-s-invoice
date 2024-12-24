class CreateInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CreateInvoiceException'
    this.message = message
  }
}

export default CreateInvoiceException

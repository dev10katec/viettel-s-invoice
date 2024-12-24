class CreateInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CreateInvoiceException'
  }
}

export default CreateInvoiceException
